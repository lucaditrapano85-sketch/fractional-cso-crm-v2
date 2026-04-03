// api/diagnosi-end.js
// Step finale: risposte Fase 2 → Sonnet (score) + Opus (diagnosi narrativa) → salva

const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);
const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY;

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const {
      prospect_id,
      settore,
      fascia_fatturato,
      risposte_fase1,
      risposte_fase2,
      domande_fase1,
      domande_fase2,
      sintesi_fase1,
      dimensioni_critiche,
      shock
    } = req.body;

    if (!risposte_fase2 || !domande_fase2) {
      return res.status(400).json({ error: 'Missing risposte_fase2 or domande_fase2' });
    }

    // STEP 1: Calcola score per dimensione dalle risposte Fase 2
    // Ogni risposta è un indice 0-4 → score 1-5. null = "Non saprei" → esclusa dalla media
    const dims = {};
    domande_fase2.forEach((d, i) => {
      const risposta = risposte_fase2[i];
      if (risposta === null || risposta === undefined) return; // Non saprei: escludi
      const score = (typeof risposta === 'number') ? risposta + 1 : 1;
      dims[d.dimensione] = Math.min(5, Math.max(1, score));
    });

    // STEP 2: Opus genera diagnosi narrativa (in parallelo con il salvataggio score)
    const [diagnosiNarrativa] = await Promise.all([
      callOpusDiagnosi({
        settore,
        fascia_fatturato,
        dims,
        risposte_fase1,
        sintesi_fase1,
        dimensioni_critiche,
        shock
      })
    ]);

    // STEP 3: Calcola score globale su scala 0-100 (media dims 1-5 × 20)
    const dimValues = Object.values(dims);
    const scoreGlobale = dimValues.length > 0
      ? Math.round((dimValues.reduce((a, b) => a + b, 0) / dimValues.length) * 20)
      : 0;

    // Dims su scala 0-100 per la risposta al frontend (Supabase mantiene 1-5)
    const dims100 = {};
    Object.entries(dims).forEach(([k, v]) => { dims100[k] = Math.round(v * 20); });

    // STEP 4: Salva su Supabase se c'è un prospect_id
    if (prospect_id) {
      const now = new Date().toISOString();

      // Aggiorna dims (1-5) e diagnosi sul prospect
      const { error: updateError } = await supabase
        .from('prospects')
        .update({
          dims: dims,
          dims_answers: risposte_fase2,
          score_globale: scoreGlobale,
          diagnosi_narrativa: diagnosiNarrativa.diagnosi,
          diagnosi_priorita: diagnosiNarrativa.priorita,
          diagnosi_data: now,
          diagnosi_completata: true,
          updated_at: now
        })
        .eq('id', prospect_id);

      if (updateError) console.error('UPDATE PROSPECT ERROR:', JSON.stringify(updateError));

      // Salva nella storia score
      const { error: histError } = await supabase
        .from('score_history')
        .insert({
          prospect_id: prospect_id,
          dims: dims,
          score_globale: scoreGlobale,
          created_at: now
        });

      if (histError) console.error('SCORE HISTORY ERROR:', JSON.stringify(histError));

      // Avanza pipeline a 'diagnosi' se lo stato è inferiore
      const { data: prospect } = await supabase
        .from('prospects')
        .select('stato')
        .eq('id', prospect_id)
        .single();

      if (prospect) {
        const stati = ['in_attesa', 'ingaggiato', 'in_diagnosi', 'attivo', 'archiviato'];
        const statoCorrente = stati.indexOf(prospect.stato);
        const statoDiagnosi = stati.indexOf('in_diagnosi');
        if (statoCorrente < statoDiagnosi) {
          await supabase
            .from('prospects')
            .update({ stato: 'in_diagnosi', updated_at: now })
            .eq('id', prospect_id);
        }
      }
    }

    return res.status(200).json({
      ok: true,
      score_globale: scoreGlobale,
      dims: dims100,
      diagnosi: diagnosiNarrativa.diagnosi,
      priorita: diagnosiNarrativa.priorita,
      azioni_immediate: diagnosiNarrativa.azioni_immediate
    });

  } catch (err) {
    return res.status(500).json({ error: err.message, stack: err.stack });
  }
};

async function callOpusDiagnosi({ settore, fascia_fatturato, dims, risposte_fase1, sintesi_fase1, dimensioni_critiche, shock }) {

  const dimReport = Object.entries(dims)
    .map(([dim, score]) => `- ${dim}: ${score}/5`)
    .join('\n');

  const prompt = `RUOLO:
Sei il direttore commerciale che ha appena completato la diagnosi di un'azienda nel settore "${settore}" (fatturato ${fascia_fatturato}).

DATI RACCOLTI:

Score per dimensione:
${dimReport}

Dimensioni critiche emerse dalla conversazione: ${(dimensioni_critiche || []).join(', ') || 'non disponibili'}

Sintesi conversazione Fase 1: ${sintesi_fase1 || 'non disponibile'}

Shock iniziale: ${shock || 'non disponibile'}

Risposte conversazionali del titolare: ${risposte_fase1 ? JSON.stringify(risposte_fase1) : 'non disponibili'}

COMPITO:
Genera la diagnosi finale. Non è un report — è un messaggio diretto al titolare. Deve sentirsi capito, non giudicato. E deve capire esattamente cosa fare.

Rispondi SOLO in JSON valido:
{
    "diagnosi": "Diagnosi narrativa in 6-8 frasi. Parti da quello che funziona (breve). Poi vai dritto ai problemi — con numeri specifici. Chiudi con l'opportunità concreta in euro. Linguaggio diretto, specifico per il settore.",

    "priorita": [
        {
            "dimensione": "nome dimensione",
            "score": 1-5,
            "problema": "1 frase — cosa non va, con impatto in euro o %",
            "azione": "1 frase — cosa fare concretamente nei prossimi 30 giorni"
        }
    ],

    "azioni_immediate": [
        "Azione 1 — specifica, eseguibile questa settimana",
        "Azione 2 — specifica, eseguibile questa settimana",
        "Azione 3 — specifica, eseguibile questa settimana"
    ]
}

REGOLE:
- priorita: le 3 dimensioni con score più basso. Ordinate dalla peggiore alla migliore.
- azioni_immediate: 3 azioni che il titolare può fare QUESTA SETTIMANA senza investimento.
- La diagnosi NON deve sembrare generata da un'AI. Deve sembrare scritta da un direttore commerciale che ha passato 2 ore con il titolare.
- Usa il linguaggio del settore "${settore}", non termini generici.`;

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': ANTHROPIC_KEY,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-opus-4-20250514',
      max_tokens: 2000,
      messages: [{ role: 'user', content: prompt }]
    })
  });

  const data = await response.json();
  const text = data.content[0].text.replace(/```json|```/g, '').trim();
  return JSON.parse(text);
}
