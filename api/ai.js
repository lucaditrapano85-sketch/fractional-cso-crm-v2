// api/ai.js — Vercel serverless function
// Proxy sicuro verso Anthropic API (la chiave non è mai esposta al frontend)

const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages';
const MODEL             = 'claude-sonnet-4-20250514';
const MAX_TOKENS        = 4000;

// ── Prompt builder ────────────────────────────────────────────────────────────

function buildMessages(type, data) {
  switch (type) {

    case 'genera_settore': {
      const input = (data.input || '').trim();
      if (!input) throw new Error('Campo "input" obbligatorio per genera_settore');

      return {
        system: 'Sei un esperto di PMI italiane. Genera la struttura commerciale per un micro-settore specifico. Rispondi SOLO in JSON valido, nessun testo aggiuntivo.',
        user: `Micro-settore: ${input}. Genera un JSON con questa struttura esatta:
{
  "codice": "macro_micro",
  "nome_display": "Nome leggibile",
  "macro_settore": "uno tra: Manifatturiero, Servizi, Edilizia, Commercio, Alimentare, Tech",
  "dimensioni": {
    "Vendite": { "1": "descrizione step 1", "2": "descrizione step 2", "3": "...", "4": "...", "5": "..." },
    "Pipeline & CRM": { "1": "...", "2": "...", "3": "...", "4": "...", "5": "..." },
    "Organizzazione": { "1": "...", "2": "...", "3": "...", "4": "...", "5": "..." },
    "Processi": { "1": "...", "2": "...", "3": "...", "4": "...", "5": "..." },
    "Ricavi": { "1": "...", "2": "...", "3": "...", "4": "...", "5": "..." },
    "Marketing": { "1": "...", "2": "...", "3": "...", "4": "...", "5": "..." },
    "Sito Web": { "1": "...", "2": "...", "3": "...", "4": "...", "5": "..." },
    "Post-vendita": { "1": "...", "2": "...", "3": "...", "4": "...", "5": "..." }
  },
  "moduli": {
    "Vendite": {
      "1_2": [{"titolo": "...", "descrizione": "..."}],
      "2_3": [{"titolo": "...", "descrizione": "..."}],
      "3_4": [{"titolo": "...", "descrizione": "..."}],
      "4_5": [{"titolo": "...", "descrizione": "..."}]
    },
    "Pipeline & CRM": { "1_2": [], "2_3": [], "3_4": [], "4_5": [] },
    "Organizzazione":  { "1_2": [], "2_3": [], "3_4": [], "4_5": [] },
    "Processi":        { "1_2": [], "2_3": [], "3_4": [], "4_5": [] },
    "Ricavi":          { "1_2": [], "2_3": [], "3_4": [], "4_5": [] },
    "Marketing":       { "1_2": [], "2_3": [], "3_4": [], "4_5": [] },
    "Sito Web":        { "1_2": [], "2_3": [], "3_4": [], "4_5": [] },
    "Post-vendita":    { "1_2": [], "2_3": [], "3_4": [], "4_5": [] }
  },
  "benchmark_media": {
    "Vendite": 2.8,
    "Pipeline & CRM": 2.5,
    "Organizzazione": 2.6,
    "Processi": 2.7,
    "Ricavi": 2.9,
    "Marketing": 2.4,
    "Sito Web": 2.3,
    "Post-vendita": 2.5
  }
}
Le descrizioni degli step devono essere specifiche per il settore, in italiano, con azioni concrete, costi indicativi e tempi. I moduli devono contenere 2-3 azioni operative per ogni transizione di step.`,
      };
    }

    // Placeholder per i tipi futuri
    case 'prescrizione':
    case 'interpretazione':
      throw new Error(`Tipo "${type}" non ancora implementato`);

    default:
      throw new Error(`Tipo non riconosciuto: ${type}`);
  }
}

// ── Handler principale ────────────────────────────────────────────────────────

export default async function handler(req, res) {
  // CORS — solo dalla stessa origine in produzione
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Verifica API key
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error('[ai.js] ANTHROPIC_API_KEY non impostata');
    return res.status(500).json({ error: 'Configurazione server mancante' });
  }

  // Parse body
  let type, data;
  try {
    ({ type, data = {} } = req.body || {});
    if (!type) throw new Error('Campo "type" obbligatorio');
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }

  // Costruisci messaggi
  let messages;
  try {
    messages = buildMessages(type, data);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }

  // Chiama Anthropic
  let anthropicRes;
  try {
    anthropicRes = await fetch(ANTHROPIC_API_URL, {
      method: 'POST',
      headers: {
        'x-api-key':         apiKey,
        'anthropic-version': '2023-06-01',
        'content-type':      'application/json',
      },
      body: JSON.stringify({
        model:      MODEL,
        max_tokens: MAX_TOKENS,
        system:     messages.system,
        messages:   [{ role: 'user', content: messages.user }],
      }),
    });
  } catch (err) {
    console.error('[ai.js] Fetch error:', err.message);
    return res.status(502).json({ error: 'Errore di rete verso Anthropic' });
  }

  // Gestione errori HTTP Anthropic
  if (!anthropicRes.ok) {
    const errBody = await anthropicRes.json().catch(() => ({}));
    console.error('[ai.js] Anthropic error:', anthropicRes.status, errBody);

    if (anthropicRes.status === 429) {
      const retryAfter = anthropicRes.headers.get('retry-after') || '60';
      res.setHeader('Retry-After', retryAfter);
      return res.status(429).json({ error: 'Rate limit raggiunto', retryAfter: Number(retryAfter) });
    }

    return res.status(anthropicRes.status).json({
      error: errBody?.error?.message || 'Errore Anthropic',
    });
  }

  const result = await anthropicRes.json();
  const text   = result?.content?.[0]?.text || '';

  // Per genera_settore: verifica che sia JSON valido prima di rispondere
  if (type === 'genera_settore') {
    try {
      // Rimuovi eventuali code block markdown (```json ... ```)
      const clean = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/i, '').trim();
      const parsed = JSON.parse(clean);
      return res.status(200).json({ ok: true, data: parsed });
    } catch {
      console.error('[ai.js] Risposta non JSON:', text.slice(0, 200));
      return res.status(502).json({ error: 'Risposta AI non valida', raw: text.slice(0, 500) });
    }
  }

  return res.status(200).json({ ok: true, text });
}
