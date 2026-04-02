// api/ai.js — Vercel serverless function
// Proxy sicuro verso Anthropic API (la chiave non è mai esposta al frontend)

const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages';
const MODEL             = 'claude-sonnet-4-20250514';
const MAX_TOKENS        = 8000;

// ── Prompt builder ────────────────────────────────────────────────────────────

function buildMessages(type, data) {
  switch (type) {

    case 'genera_settore': {
      const input = (data.input || '').trim();
      if (!input) throw new Error('Campo "input" obbligatorio per genera_settore');

      return {
        system: `Sei un esperto di PMI italiane con 20 anni di esperienza nella consulenza commerciale. Generi strutture diagnostiche per micro-settori specifici. Le domande devono essere CONCRETE e SPECIFICHE per il settore — mai generiche. Ogni domanda deve descrivere situazioni reali che il titolare riconosce immediatamente.

ESEMPIO DI QUALITÀ RICHIESTA — domande per 'commercio auto usate':
Dimensione Vendite:
1: 'Solo il titolare vende — nessun venditore dedicato, trattative gestite tra una cosa e l'altra'
2: 'Titolare + 1 venditore (esperto o junior) — il titolare segue ancora le trattative importanti'
3: '2+ venditori con incentivi strutturati — bonus per auto venduta, per margine, per finanziamento piazzato'
4: 'Team vendita con ruoli definiti (nuovo, usato, fleet) — KPI individuali tracciati settimanalmente'
5: 'Reparto commerciale autonomo con responsabile vendite — il titolare interviene solo sulle eccezioni'

Dimensione Pipeline & CRM:
1: 'Nessun tracciamento — i contatti sono nella testa del titolare o su biglietti da visita'
2: 'Excel o Google Sheet per tracciare lead e follow-up — aggiornato quando ci si ricorda'
3: 'CRM base (es. HubSpot free) — ogni trattativa ha uno stato e una data di follow-up'
4: 'CRM configurato con pipeline per tipo veicolo — report settimanali su conversion rate e tempi medi'
5: 'CRM integrato con marketing automation — lead scoring, nurturing automatico, dashboard real-time'

ESEMPIO per 'edilizia serramenti':
Dimensione Vendite:
1: 'Solo il titolare fa preventivi — va ai sopralluoghi e gestisce tutto da solo'
2: 'Kit sopralluogo strutturato + rendering 3D infissi — il titolare presenta meglio ma è ancora solo'
3: 'Venditore showroom dedicato — gestisce i clienti walk-in e i preventivi standard'
4: 'Team vendita con venditore showroom + venditore esterno per cantieri/architetti'
5: 'Rete vendita con agenti per zona — il titolare gestisce solo i clienti strategici'

REGOLE:
- Ogni livello 1 descrive la situazione più basica possibile per quel settore specifico
- Ogni livello deve essere IMMEDIATAMENTE riconoscibile dal titolare ('sì, sono esattamente qui')
- Mai usare termini generici come 'processo strutturato' — descrivi COSA fa concretamente
- Includi strumenti, ruoli, costi indicativi dove rilevante
- Il linguaggio deve essere quello del settore (un pescivendolo dice 'banco', non 'punto vendita')

Rispondi SOLO in JSON valido, nessun testo aggiuntivo.`,
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
  },
  "tips": [
    {"tipo": "lo_sapevi", "testo": "dato statistico specifico per questo settore"},
    {"tipo": "azione_rapida", "testo": "consiglio operativo immediato specifico per questo settore"},
    {"tipo": "lo_sapevi", "testo": "dato statistico specifico per questo settore"},
    {"tipo": "azione_rapida", "testo": "consiglio operativo immediato specifico per questo settore"},
    {"tipo": "lo_sapevi", "testo": "dato statistico specifico per questo settore"},
    {"tipo": "azione_rapida", "testo": "consiglio operativo immediato specifico per questo settore"}
  ]
}
Le descrizioni degli step devono essere specifiche per il settore, in italiano, con azioni concrete, costi indicativi e tempi. I moduli devono contenere 2-3 azioni operative per ogni transizione di step. I tips devono essere 6 totali (3 lo_sapevi con dati statistici reali specifici per il settore, 3 azione_rapida con consigli operativi immediati specifici per il settore), in italiano, mai generici.`,
      };
    }

    case 'suggerisci_settori': {
      const input = (data.input || '').trim();
      if (!input) throw new Error('Campo "input" obbligatorio per suggerisci_settori');

      return {
        system: 'Sei un esperto di classificazione settoriale PMI italiane. L\'utente descrive la sua attività. Suggerisci 3-4 micro-settori specifici e distinti. Rispondi SOLO in JSON valido.',
        user: `L'utente ha scritto: "${input}". Genera un JSON array con 3-4 opzioni:
[
  { "codice": "commercio_pesca_sportiva", "nome": "Negozio pesca sportiva", "descrizione": "Vendita esche, canne, mulinelli, abbigliamento tecnico" },
  ...
]
Ogni opzione deve essere un settore SPECIFICO e DISTINTO dagli altri. Non accorpare settori diversi. Ogni codice deve seguire il formato macro_micro (es. commercio_pesca_sportiva, alimentare_acquacoltura).`,
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

  // max_tokens per-type
  const maxTokens = type === 'suggerisci_settori' ? 500 : MAX_TOKENS;

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
        model:       MODEL,
        max_tokens:  maxTokens,
        temperature: 0,
        system:      messages.system,
        messages:    [{ role: 'user', content: messages.user }],
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

  // Per genera_settore: estrai il blocco JSON dalla risposta (gestisce markdown wrapper)
  if (type === 'genera_settore') {
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error('Nessun oggetto JSON trovato');
      const parsed = JSON.parse(jsonMatch[0]);
      return res.status(200).json({ ok: true, data: parsed });
    } catch {
      console.error('[ai.js] Risposta non JSON:', text.slice(0, 300));
      return res.status(502).json({ error: 'Risposta AI non valida', raw: text.slice(0, 500) });
    }
  }

  // Per suggerisci_settori: estrai array JSON
  if (type === 'suggerisci_settori') {
    try {
      const jsonMatch = text.match(/\[[\s\S]*\]/);
      if (!jsonMatch) throw new Error('Nessun array JSON trovato');
      const parsed = JSON.parse(jsonMatch[0]);
      return res.status(200).json({ ok: true, data: parsed });
    } catch {
      console.error('[ai.js] suggerisci_settori non JSON:', text.slice(0, 300));
      return res.status(502).json({ error: 'Risposta AI non valida', raw: text.slice(0, 500) });
    }
  }

  return res.status(200).json({ ok: true, text });
}
