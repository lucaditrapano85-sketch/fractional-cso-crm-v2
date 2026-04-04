// api/diagnosi-domande.js
// BACKGROUND endpoint — genera domande_fase1 (5) + domande_fase2 (8) + Sonnet tips
// Chiamato in parallelo a diagnosi-shock, può metterci 40-60s

const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);
const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY;

module.exports = async function handler(req, res) {
  console.log('DIAGNOSI-DOMANDE RICEVUTA:', new Date().toISOString());
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const { settore, settore_id, benchmark_istat, user_id } = req.body;
    if (!settore) return res.status(400).json({ error: 'Missing settore' });
    const codiceCalcolato = settore.toLowerCase().replace(/[^a-z0-9]/g, '_');

    // ── Cache check ───────────────────────────────────────────────
    let settoreData = null;

    if (settore_id) {
      const { data } = await supabase
        .from('settori_custom')
        .select('*')
        .eq('id', settore_id)
        .single();
      settoreData = data || null;
    }

    if (!settoreData) {
      const { data } = await supabase
        .from('settori_custom')
        .select('*')
        .or(`nome.ilike.%${settore}%,nome_display.ilike.%${settore}%,codice.ilike.%${codiceCalcolato}%`)
        .limit(1);
      settoreData = data && data.length > 0 ? data[0] : null;
    }

    if (settoreData && settoreData.domande_fase1 && settoreData.domande_fase1.length >= 5) {
      // Domande già in cache — genera solo tips freschi (Sonnet, veloce)
      const tips = await callSonnet(settore);
      return res.status(200).json({
        ok: true,
        cached: true,
        settore_id:    settoreData.id,
        tips,
        domande_fase1: settoreData.domande_fase1,
        domande_fase2: settoreData.domande_fase2 || []
      });
    }

    // ── Genera: Sonnet tips + Opus domande in parallelo ───────────
    const [tips, opusResult] = await Promise.all([
      callSonnet(settore),
      callOpusDomande(settore, benchmark_istat)
    ]);

    // ── Salva in settori_custom ───────────────────────────────────
    const now = new Date().toISOString();

    if (settoreData) {
      const { data: updated } = await supabase
        .from('settori_custom')
        .update({
          nome:                    settoreData.nome || opusResult.nome_settore || settore,
          macro_settore:           settoreData.macro_settore || opusResult.macro_settore || 'altro',
          domande_fase1:           opusResult.domande_fase1,
          domande_fase2:           opusResult.domande_fase2,
          benchmark:               opusResult.benchmark,
          diagnosi_template:       opusResult.diagnosi_narrativa_template,
          updated_at:              now
        })
        .eq('id', settoreData.id)
        .select('id').single();
      if (updated) settoreData = { ...settoreData, ...updated };
    } else {
      const { data: upserted } = await supabase
        .from('settori_custom')
        .upsert({
          codice:             codiceCalcolato,
          nome:               opusResult.nome_settore || settore,
          macro_settore:      opusResult.macro_settore || 'altro',
          domande_fase1:      opusResult.domande_fase1,
          domande_fase2:      opusResult.domande_fase2,
          benchmark:          opusResult.benchmark,
          diagnosi_template:  opusResult.diagnosi_narrativa_template,
          n_diagnosi:         1,
          created_by:         user_id || null,
          created_at:         now,
          updated_at:         now
        }, { onConflict: 'codice' })
        .select('id').single();
      settoreData = upserted;
    }

    console.log('DIAGNOSI-DOMANDE COMPLETATA:', new Date().toISOString());
    return res.status(200).json({
      ok: true,
      cached: false,
      settore_id:    settoreData ? settoreData.id : null,
      tips,
      domande_fase1: opusResult.domande_fase1,
      domande_fase2: opusResult.domande_fase2
    });

  } catch (err) {
    console.error('DIAGNOSI-DOMANDE ERRORE:', err.message);
    return res.status(500).json({ error: err.message });
  }
};

// ── Sonnet — Tips (veloce, ~5s) ───────────────────────────────────────────────
async function callSonnet(settore) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-api-key': ANTHROPIC_KEY, 'anthropic-version': '2023-06-01' },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1200,
      messages: [{ role: 'user', content: `Genera 10 tips per un titolare di "${settore}".

5 tips "Lo sapevi?" con un dato reale e specifico del settore nel mercato italiano.
5 tips "Azione rapida" con un consiglio concreto che può applicare oggi.

REGOLA IMPORTANTE: ogni tip deve essere MASSIMO una frase (max 15 parole). Niente paragrafi.

Rispondi SOLO in JSON:
{
    "tips": [
        {"tipo": "sapevi", "testo": "..."},
        {"tipo": "sapevi", "testo": "..."},
        {"tipo": "sapevi", "testo": "..."},
        {"tipo": "sapevi", "testo": "..."},
        {"tipo": "sapevi", "testo": "..."},
        {"tipo": "azione", "testo": "..."},
        {"tipo": "azione", "testo": "..."},
        {"tipo": "azione", "testo": "..."},
        {"tipo": "azione", "testo": "..."},
        {"tipo": "azione", "testo": "..."}
    ]
}` }]
    })
  });
  const data = await response.json();
  const text = data.content[0].text.replace(/```json|```/g, '').trim();
  return JSON.parse(text).tips;
}

// ── Opus — Solo domande (pesante, ~40-60s) ────────────────────────────────────
async function callOpusDomande(settore, benchmark) {
  const istatSection = benchmark ? buildIstatSectionDomande(benchmark, settore) : '';

  const prompt = `RUOLO:
Sei il direttore commerciale più esperto d'Italia. Stai costruendo la batteria di domande diagnostiche per un titolare di "${settore}".
${istatSection}
Rispondi SOLO in JSON valido:
{
    "nome_settore": "Nome pulito del settore",
    "macro_settore": "uno tra: alimentare, servizi, manifatturiero, commercio, edilizia, tech",

    "domande_fase1": [
        {
            "domanda": "Domanda da direttore commerciale. Linguaggio del settore. Concreta.",
            "opzioni": [
                {"testo": "Risposta negativa — situazione critica, linguaggio del titolare", "sentiment": "negativo"},
                {"testo": "Risposta media — ci si prova ma senza metodo", "sentiment": "medio"},
                {"testo": "Risposta positiva — situazione sotto controllo", "sentiment": "positivo"}
            ],
            "se_positivo": "Reazione se la risposta è buona — riconosci e approfondisci",
            "se_negativo": "Reazione se la risposta è negativa — spiega l'impatto con numeri",
            "dimensione": "Una tra: Vendite, Marketing, Pipeline, Processi, Clienti, Pricing, Team, Digitale"
        }
    ],

    "domande_fase2": [
        {
            "domanda": "Domanda rapida strutturata per lo score",
            "opzioni": ["Opzione 1 (score 1)", "Opzione 2 (score 2)", "Opzione 3 (score 3)", "Opzione 4 (score 4)", "Opzione 5 (score 5)"],
            "dimensione": "Una delle 8 dimensioni"
        }
    ],

    "benchmark": {
        "fatturato_medio": "€XXK",
        "n_aziende_italia": "circa XXX",
        "problema_principale": "descrizione breve",
        "opportunita_media": "€XXK/anno"
    },

    "diagnosi_narrativa_template": "Template diagnosi con variabili {fatturato}, {problema_principale}, {opportunita_euro}, {azione_immediata}"
}

REGOLE:
1. domande_fase1: esattamente 5 domande. Linguaggio del settore, non da consulente.
2. domande_fase2: esattamente 8 domande (1 per ognuna delle 8 dimensioni). Ogni domanda ha 5 opzioni ordinate dal peggiore al migliore.
3. Le dimensioni DEVONO essere esattamente queste 8: Vendite, Marketing, Clienti, Pipeline, Pricing, Processi, Team, Digitale. Nessun'altra variante.
4. Ogni opzione di domande_fase1 è una frase che il titolare direbbe davvero — linguaggio suo, non da consulente.
5. Usa il linguaggio che usa il titolare di quel settore, non termini da MBA.`;

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-api-key': ANTHROPIC_KEY, 'anthropic-version': '2023-06-01' },
    body: JSON.stringify({ model: 'claude-opus-4-20250514', max_tokens: 3500, messages: [{ role: 'user', content: prompt }] })
  });
  const data = await response.json();
  const text = data.content[0].text.replace(/```json|```/g, '').trim();
  return JSON.parse(text);
}

function buildIstatSectionDomande(benchmark, settore) {
  if (!benchmark) return '';
  const fmt    = n => n ? '\u20ac\u00a0' + Number(n).toLocaleString('it-IT') : 'N/D';
  const fmtPct = n => (n !== null && n !== undefined) ? n + '%' : 'N/D';
  return `
DATI DI MERCATO REALI — ${settore} (${benchmark.regione_usata}):
- Numero di aziende nel settore: ${Number(benchmark.numero_imprese).toLocaleString('it-IT')}
- Fatturato medio per azienda: ${fmt(benchmark.fatturato_medio)}
- Margine operativo medio: ${fmtPct(benchmark.margine_operativo_pct)}

Hai accesso a dati di mercato reali. Usali nelle domande e nelle reazioni. NON citare fonti o ISTAT. Parla come esperto del settore.`;
}
