// api/diagnosi-start.js
// Primo step diagnosi: settore + fascia → Sonnet (tips) + Opus (apertura killer) in parallelo

const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);
const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY;

module.exports = async function handler(req, res) {
  console.log('DIAGNOSI-START RICEVUTA:', new Date().toISOString());
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const { settore, fascia_fatturato, user_id, regione } = req.body;
    if (!settore) return res.status(400).json({ error: 'Missing settore' });
    const regioneEffettiva = regione || 'Italia';
    const fasciaEffettiva = fascia_fatturato || 'nd';

    // STEP 1: Cerca se il settore esiste già nel database
    // Cerca per nome, nome_display e codice per coprire entrambi gli schemi
    const codiceCalcolato = settore.toLowerCase().replace(/[^a-z0-9]/g, '_');
    const { data: existing, error: searchError } = await supabase
      .from('settori_custom')
      .select('*')
      .or(`nome.ilike.%${settore}%,nome_display.ilike.%${settore}%,codice.ilike.%${codiceCalcolato}%`)
      .limit(1);

    if (searchError) console.error('SEARCH ERROR:', JSON.stringify(searchError));
    let settoreData = existing && existing.length > 0 ? existing[0] : null;

    // STEP 2: Se il settore esiste E ha già shock per questa fascia, usa il cached
    if (settoreData && settoreData.shock_data && settoreData.shock_data[fasciaEffettiva]) {
      // Genera tips e benchmark in parallelo
      const [tips, benchmarkIstat] = await Promise.all([
        callSonnet(settore, fasciaEffettiva),
        fetchBenchmarkISTAT(settore, regioneEffettiva)
      ]);

      // Incrementa contatore diagnosi
      await supabase
        .from('settori_custom')
        .update({ n_diagnosi: (settoreData.n_diagnosi || 0) + 1, updated_at: new Date().toISOString() })
        .eq('id', settoreData.id);

      return res.status(200).json({
        ok: true,
        cached: true,
        settore_id: settoreData.id,
        tips: tips,
        shock: settoreData.shock_data[fasciaEffettiva].shock,
        collegamento: settoreData.shock_data[fasciaEffettiva].collegamento,
        aggancio: settoreData.shock_data[fasciaEffettiva].aggancio,
        domande_fase1: settoreData.domande_fase1,
        domande_fase2: settoreData.domande_fase2,
        benchmark_istat: benchmarkIstat
      });
    }

    // STEP 3: Settore nuovo — fetch benchmark + Sonnet in parallelo, poi Opus con benchmark
    const [tips, benchmarkIstat] = await Promise.all([
      callSonnet(settore, fasciaEffettiva),
      fetchBenchmarkISTAT(settore, regioneEffettiva)
    ]);
    const opusResult = await callOpus(settore, fasciaEffettiva, benchmarkIstat);

    // STEP 4: Salva il settore nel database
    const shockData = {};
    shockData[fasciaEffettiva] = {
      shock: opusResult.shock,
      collegamento: opusResult.collegamento,
      aggancio: opusResult.aggancio
    };

    if (settoreData) {
      // Settore esiste ma non per questa fascia — aggiorna
      const merged = { ...(settoreData.shock_data || {}), ...shockData };
      const { data: updated, error: updateError } = await supabase
        .from('settori_custom')
        .update({
          nome: settoreData.nome || opusResult.nome_settore || settore,
          shock_data: merged,
          domande_fase1: opusResult.domande_fase1,
          domande_fase2: opusResult.domande_fase2,
          benchmark: opusResult.benchmark,
          n_diagnosi: (settoreData.n_diagnosi || 0) + 1,
          updated_at: new Date().toISOString()
        })
        .eq('id', settoreData.id)
        .select()
        .single();

      if (updateError) console.error('UPDATE ERROR:', JSON.stringify(updateError));
      else settoreData = updated;
    } else {
      // Settore completamente nuovo — upsert su codice per evitare duplicati
      const { data: upserted, error: upsertError } = await supabase
        .from('settori_custom')
        .upsert({
          codice: codiceCalcolato,
          nome: opusResult.nome_settore || settore,
          macro_settore: opusResult.macro_settore || 'altro',
          shock_data: shockData,
          domande_fase1: opusResult.domande_fase1,
          domande_fase2: opusResult.domande_fase2,
          benchmark: opusResult.benchmark,
          diagnosi_template: opusResult.diagnosi_narrativa_template,
          n_diagnosi: 1,
          created_by: user_id || null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }, { onConflict: 'codice' })
        .select()
        .single();

      if (upsertError) console.error('UPSERT ERROR:', JSON.stringify(upsertError));
      else settoreData = upserted;
    }

    return res.status(200).json({
      ok: true,
      cached: false,
      settore_id: settoreData ? settoreData.id : null,
      tips: tips,
      shock: opusResult.shock,
      collegamento: opusResult.collegamento,
      aggancio: opusResult.aggancio,
      domande_fase1: opusResult.domande_fase1,
      domande_fase2: opusResult.domande_fase2,
      benchmark_istat: benchmarkIstat
    });

  } catch (err) {
    return res.status(500).json({ error: err.message, stack: err.stack });
  }
};

// ============ SONNET — Tips di attesa (veloce) ============
async function callSonnet(settore, fascia) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': ANTHROPIC_KEY,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1200,
      messages: [{
        role: 'user',
        content: `Genera 10 tips per un titolare di "${settore}"${fascia !== 'nd' ? ` con fatturato ${fascia}` : ''}.

5 tips "Lo sapevi?" con un dato reale e specifico del settore nel mercato italiano.
5 tips "Azione rapida" con un consiglio concreto che può applicare oggi.

REGOLA IMPORTANTE: ogni tip deve essere MASSIMO una frase (max 15 parole). Niente paragrafi, niente elenchi di percentuali multiple. Una frase secca con un dato specifico.

Rispondi SOLO in JSON, niente altro:
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
}`
      }]
    })
  });
  const data = await response.json();
  const text = data.content[0].text.replace(/```json|```/g, '').trim();
  return JSON.parse(text).tips;
}

// ============ OPUS — Apertura killer + domande (profondo) ============
async function callOpus(settore, fascia, benchmark) {
  const istatSection = buildIstatSection(benchmark, settore);

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': ANTHROPIC_KEY,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-opus-4-20250514',
      max_tokens: 4000,
      messages: [{
        role: 'user',
        content: `RUOLO:
Sei il direttore commerciale più esperto d'Italia. 20 anni di esperienza trasversale su ogni settore. Hai analizzato migliaia di PMI italiane. Parli come un professionista che è stato dentro le aziende, non come un consulente che legge slide.

CONTESTO:
Un titolare di "${settore}" sta per fare una diagnosi commerciale. Non ti conosce. Non si fida. Ha 7 secondi prima di chiudere tutto.
${istatSection}
IL TUO OBIETTIVO:
Colpirlo con un'affermazione che dimostra che conosci il suo business meglio di lui. Non fare domande. AFFERMA. Usa un dato reale, specifico, verificabile sul suo settore nel mercato italiano.

Rispondi SOLO in JSON valido, niente altro testo prima o dopo:
{
    "nome_settore": "Nome pulito del settore (es: Produzione ghiaccio alimentare)",
    "macro_settore": "uno tra: alimentare, servizi, manifatturiero, commercio, edilizia, tech",

    "shock": "Una frase secca con un dato reale del settore italiano. Specifica — numeri, percentuali, comportamenti reali. Il titolare deve pensare: è vero, succede anche a me. Massimo 2 righe.",

    "collegamento": "Colleghi il dato shock alla realtà operativa di una PMI tipica del settore. Quantifichi l'impatto concreto in euro o percentuale. Massimo 2 righe.",

    "aggancio": "Proponi — non chiedere. Massimo 1 riga.",

    "domande_fase1": [
        {
            "domanda": "Domanda da direttore commerciale. Linguaggio del settore. Concreta.",
            "opzioni": [
                {"testo": "Risposta negativa — situazione critica, descritta con il linguaggio del titolare", "sentiment": "negativo"},
                {"testo": "Risposta media — ci si prova ma senza metodo, descritta concretamente", "sentiment": "medio"},
                {"testo": "Risposta positiva — situazione sotto controllo, descritta con dettagli reali", "sentiment": "positivo"}
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

    "diagnosi_narrativa_template": "Template diagnosi finale con variabili {fatturato}, {problema_principale}, {opportunita_euro}, {azione_immediata}"
}

REGOLE:
1. domande_fase1: esattamente 5 domande. Linguaggio del settore, non da consulente.
2. domande_fase2: esattamente 8 domande (1 per dimensione). Ogni domanda ha 5 opzioni ordinate dal peggiore al migliore.
3. I dati nello shock devono essere REALISTICI per il mercato italiano.
4. Usa il linguaggio che usa il titolare di quel settore, non termini da MBA.
5. benchmark deve avere numeri realistici.
    6. Ogni domanda di Fase 1 ha 3 opzioni. Le opzioni sono frasi che il titolare direbbe davvero — linguaggio suo, non da consulente. Ordinate: negativo, medio, positivo. Ogni opzione deve essere specifica per il settore e la domanda, non generica.
    7. Le dimensioni usate in domande_fase1 e domande_fase2 DEVONO essere esattamente queste 8, scritte esattamente così: Vendite, Marketing, Clienti, Pipeline, Pricing, Processi, Team, Digitale. Nessun'altra variante è accettata (no "Organizzazione", no "Ricavi", no "Sito Web", no "Post-vendita", no "Pipeline & CRM", no "E-commerce").`
      }]
    })
  });
  const data = await response.json();
  const text = data.content[0].text.replace(/```json|```/g, '').trim();
  return JSON.parse(text);
}

// ============ ISTAT Benchmark ============
function buildIstatSection(benchmark, settore) {
  if (!benchmark) return '';
  const fmt = n => n ? '€\u00a0' + Number(n).toLocaleString('it-IT') : 'N/D';
  const fmtPct = n => (n !== null && n !== undefined) ? n + '%' : 'N/D';
  const trendStr = benchmark.trend !== null && benchmark.trend !== undefined
    ? `\n- Trend fatturato vs anno precedente: ${benchmark.trend > 0 ? '+' : ''}${benchmark.trend}%`
    : '';
  return `
DATI ISTAT REALI — ${settore} (${benchmark.regione_usata}):
- Settore ISTAT trovato: ${benchmark.settore_trovato}
- Numero imprese nel settore: ${Number(benchmark.numero_imprese).toLocaleString('it-IT')}
- Fatturato medio per azienda: ${fmt(benchmark.fatturato_medio)}
- Margine operativo medio: ${fmtPct(benchmark.margine_operativo_pct)}
- Valore aggiunto medio per azienda: ${fmt(benchmark.valore_aggiunto_medio)}${trendStr}
- Fonte: ISTAT 2023

REGOLA ISTAT: USA questi dati nello shock e nel collegamento. Non inventare numeri — cita ISTAT.
Esempio shock: 'Le ${Number(benchmark.numero_imprese).toLocaleString('it-IT')} aziende del tuo settore fatturano in media ${fmt(benchmark.fatturato_medio)}.'
NON inventare percentuali o numeri che non derivano dai dati ISTAT forniti sopra.`;
}

async function fetchBenchmarkISTAT(settore, regione) {
  if (!settore) return null;
  try {
    const anno = 2023;
    const regioneUsata = regione && regione !== '' ? regione : 'Italia';
    const searchTerm = settore.replace(/[%_]/g, '').substring(0, 40);

    let rows = null;

    // Step 1: cerca per regione specifica + anno 2023
    if (regioneUsata !== 'Italia') {
      const { data } = await supabase
        .from('benchmark_imprese')
        .select('*')
        .ilike('descrizione_settore', `%${searchTerm}%`)
        .eq('regione', regioneUsata)
        .eq('anno', anno)
        .limit(30);
      if (data && data.length > 0) rows = data;
    }

    // Step 2: fallback Italia
    if (!rows || rows.length === 0) {
      const { data } = await supabase
        .from('benchmark_imprese')
        .select('*')
        .ilike('descrizione_settore', `%${searchTerm}%`)
        .eq('anno', anno)
        .limit(30);
      if (data && data.length > 0) rows = data;
    }

    if (!rows || rows.length === 0) return null;

    // Aggrega tutte le classi di addetti
    const totFatturato = rows.reduce((s, r) => s + (Number(r.fatturato_migliaia_euro) || 0), 0);
    const totMargine   = rows.reduce((s, r) => s + (Number(r.margine_operativo_migliaia_euro) || 0), 0);
    const totVA        = rows.reduce((s, r) => s + (Number(r.valore_aggiunto_migliaia_euro) || 0), 0);
    const totImprese   = rows.reduce((s, r) => s + (Number(r.numero_imprese) || 0), 0);

    if (totImprese === 0) return null;

    const fatturatoMedio = Math.round((totFatturato / totImprese) * 1000);
    const marginePct     = totFatturato > 0
      ? Math.round((totMargine / totFatturato) * 1000) / 10
      : null;
    const vaMedio        = Math.round((totVA / totImprese) * 1000);

    // Trend: confronto anno precedente
    let trend = null;
    const regioneRows = rows[0].regione;
    const { data: rowsPrev } = await supabase
      .from('benchmark_imprese')
      .select('fatturato_migliaia_euro, numero_imprese')
      .ilike('descrizione_settore', `%${searchTerm}%`)
      .eq('regione', regioneRows)
      .eq('anno', 2022)
      .limit(30);

    if (rowsPrev && rowsPrev.length > 0) {
      const totFatPrev = rowsPrev.reduce((s, r) => s + (Number(r.fatturato_migliaia_euro) || 0), 0);
      const totImpPrev = rowsPrev.reduce((s, r) => s + (Number(r.numero_imprese) || 0), 0);
      if (totImpPrev > 0 && fatturatoMedio > 0) {
        const fattPrev = Math.round((totFatPrev / totImpPrev) * 1000);
        if (fattPrev > 0) trend = Math.round(((fatturatoMedio - fattPrev) / fattPrev) * 1000) / 10;
      }
    }

    return {
      numero_imprese:        totImprese,
      fatturato_medio:       fatturatoMedio,
      margine_operativo_pct: marginePct,
      valore_aggiunto_medio: vaMedio,
      trend:                 trend,
      regione_usata:         regioneRows,
      settore_trovato:       rows[0].descrizione_settore,
      fonte:                 'ISTAT 2023'
    };
  } catch (err) {
    console.error('fetchBenchmarkISTAT error:', err.message);
    return null;
  }
}
