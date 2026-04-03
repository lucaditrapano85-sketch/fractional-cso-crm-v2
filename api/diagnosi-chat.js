// api/diagnosi-chat.js
// Gestisce Fase 1 conversazionale: il titolare risponde, Opus reagisce e guida

const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY;

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const {
      step,
      risposta_titolare,
      domande_fase1,
      conversazione,
      settore,
      fascia_fatturato,
      shock,
      contesto_titolare
    } = req.body;

    if (step === undefined || !risposta_titolare || !domande_fase1) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const domandaCorrente = domande_fase1[step];
    if (!domandaCorrente) return res.status(400).json({ error: 'Invalid step index' });

    const isUltima = step >= domande_fase1.length - 1;

    const storicoFormattato = (conversazione || []).map(m =>
      `${m.ruolo === 'ai' ? 'CONSULENTE' : 'TITOLARE'}: ${m.testo}`
    ).join('\n');

    const prompt = buildPrompt({
      settore,
      fascia_fatturato,
      shock,
      storicoFormattato,
      domandaCorrente,
      risposta_titolare,
      isUltima,
      domandeProssime: isUltima ? [] : domande_fase1.slice(step + 1),
      domande_fase1,
      contesto_titolare: contesto_titolare || {}
    });

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
        messages: [{ role: 'user', content: prompt }]
      })
    });

    const data = await response.json();

    if (!data.content || !data.content[0]) {
      return res.status(500).json({ error: 'Empty Opus response', raw: data });
    }

    const text = data.content[0].text.replace(/```json|```/g, '').trim();
    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch (e) {
      return res.status(500).json({ error: 'JSON parse error', raw: text });
    }

    return res.status(200).json({
      ok: true,
      step: step,
      is_ultima: isUltima,
      reazione: parsed.reazione,
      transizione: parsed.transizione || null,
      prossima_domanda: isUltima ? null : domande_fase1[step + 1].domanda,
      dimensioni_critiche: parsed.dimensioni_critiche || null,
      sintesi_fase1: parsed.sintesi_fase1 || null
    });

  } catch (err) {
    return res.status(500).json({ error: err.message, stack: err.stack });
  }
};

function buildPrompt({ settore, fascia_fatturato, shock, storicoFormattato, domandaCorrente, risposta_titolare, isUltima, domandeProssime, domande_fase1, contesto_titolare }) {

  const ctx = contesto_titolare || {};
  const nomeCtx = ctx.nome ? `Nome: ${ctx.nome}` : '';
  const contesLines = [
    nomeCtx,
    ctx.soddisfazione ? `Soddisfazione fatturato: ${ctx.soddisfazione}` : '',
    ctx.aree_deboli && ctx.aree_deboli.length ? `Aree deboli dichiarate: ${ctx.aree_deboli.join(', ')}` : '',
    ctx.fatturato_anno_scorso ? `Fatturato anno scorso: €${ctx.fatturato_anno_scorso.toLocaleString('it-IT')}` : '',
    ctx.n_persone ? `Dimensione team: ${ctx.n_persone}` : '',
    ctx.anni_attivita ? `Anni di attività: ${ctx.anni_attivita}` : ''
  ].filter(Boolean).join('\n');

  const base = `RUOLO:
Sei il direttore commerciale che sta conducendo una diagnosi con un titolare di "${settore}" (fatturato ${fascia_fatturato}).

TONO:
Parli come uno che ha visto centinaia di aziende come la sua. Diretto, concreto, mai accademico. Usi il linguaggio del settore. Frasi corte. Quando dai un numero, è specifico. Quando fai un'osservazione, è tagliente ma rispettosa.${ctx.nome ? ` Usa il nome "${ctx.nome.split(' ')[0]}" solo se è naturale farlo, non in modo forzato.` : ''}

PROFILO TITOLARE (raccolto prima della conversazione):
${contesLines || 'Non disponibile'}

CONTESTO CONVERSAZIONE:
L'apertura shock era: "${shock}"

${storicoFormattato ? `STORICO CONVERSAZIONE:\n${storicoFormattato}\n` : ''}
DOMANDA CHE HAI APPENA FATTO:
"${domandaCorrente.domanda}" (dimensione: ${domandaCorrente.dimensione})

GUIDA PER LA TUA REAZIONE:
- Se la risposta è positiva, la direzione è: ${domandaCorrente.se_positivo}
- Se la risposta è negativa, la direzione è: ${domandaCorrente.se_negativo}
(ATTENZIONE: queste sono GUIDE, non frasi da copiare. Riformula con le tue parole basandoti sulla risposta specifica del titolare.)

RISPOSTA DEL TITOLARE:
"${risposta_titolare}"`;

  if (isUltima) {
    const tutteLeD = domande_fase1.map(d => d.dimensione);
    return `${base}

QUESTA È L'ULTIMA DOMANDA DELLA FASE 1.

Rispondi SOLO in JSON valido:
{
    "reazione": "La tua reazione alla risposta del titolare. 2-3 frasi. Concreta, con un insight che lo colpisce. Chiudi con una frase di transizione tipo 'Ho un quadro chiaro. Ora ti faccio qualche domanda rapida per quantificare.'",

    "dimensioni_critiche": ["dim1", "dim2", "dim3"],

    "sintesi_fase1": "3-4 frasi che riassumono cosa hai capito dell'azienda — i punti di forza e le debolezze emerse. Scrivi come se parlassi al titolare: 'Da quello che mi racconti, la tua azienda è forte su X ma sta perdendo Y. Il problema vero è Z.'"
}

REGOLE:
- dimensioni_critiche: le 3 dimensioni su cui il titolare è più debole, basandoti sulle sue risposte. Scegli tra: ${[...new Set(tutteLeD)].join(', ')}.
- La reazione deve essere una CHIUSURA naturale — il titolare deve sentire che la conversazione è stata utile.
- La sintesi è per il titolare, non per un report. Linguaggio diretto.`;

  } else {
    const prossima = domandeProssime[0];
    return `${base}

Rispondi SOLO in JSON valido:
{
    "reazione": "La tua reazione alla risposta. 2-3 frasi max. Concreta. Se il titolare ha detto qualcosa di buono, riconoscilo brevemente e poi fai un'osservazione che aggiunge valore. Se ha detto qualcosa di preoccupante, spiega l'impatto con un dato reale. Non fare la predica.",

    "transizione": "Una frase che collega la risposta alla prossima domanda. Naturale, non forzata. Esempio: 'Questo mi fa venire in mente una cosa...' oppure 'Su questo punto c'è un aspetto che pochi considerano...'"
}

REGOLE:
- La prossima domanda sarà su "${prossima.dimensione}": "${prossima.domanda}" — la transizione deve portarci lì in modo naturale.
- Non anticipare la domanda successiva nella transizione. Preparare il terreno, non spoilerare.
- La reazione DEVE riferirsi a qualcosa di specifico che il titolare ha detto, non essere generica.
- Max 4 frasi totali tra reazione e transizione.`;
  }
}
