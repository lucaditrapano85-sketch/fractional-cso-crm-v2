// api/diagnosi-shock.js
// FAST endpoint — genera SOLO shock/collegamento/aggancio + benchmark
// Target: risposta in 15-20s

const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);
const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY;

module.exports = async function handler(req, res) {
  console.log('DIAGNOSI-SHOCK RICEVUTA:', new Date().toISOString());
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const { settore, regione, user_id } = req.body;
    if (!settore) return res.status(400).json({ error: 'Missing settore' });
    const regioneEffettiva = regione || 'Italia';
    const codiceCalcolato  = settore.toLowerCase().replace(/[^a-z0-9]/g, '_');

    // ── Cache check ───────────────────────────────────────────────
    const { data: existing } = await supabase
      .from('settori_custom')
      .select('id, nome, macro_settore, shock_data, n_diagnosi')
      .or(`nome.ilike.%${settore}%,nome_display.ilike.%${settore}%,codice.ilike.%${codiceCalcolato}%`)
      .limit(1);

    let settoreData = existing && existing.length > 0 ? existing[0] : null;

    if (settoreData && settoreData.shock_data && settoreData.shock_data['default']) {
      const benchmarkIstat = await fetchBenchmarkISTAT(settore, regioneEffettiva);

      // Incrementa contatore in background (non blocca la risposta)
      supabase.from('settori_custom')
        .update({ n_diagnosi: (settoreData.n_diagnosi || 0) + 1, updated_at: new Date().toISOString() })
        .eq('id', settoreData.id)
        .then(() => {});

      return res.status(200).json({
        ok: true,
        cached: true,
        settore_id: settoreData.id,
        shock:       settoreData.shock_data['default'].shock,
        collegamento: settoreData.shock_data['default'].collegamento,
        aggancio:    settoreData.shock_data['default'].aggancio,
        benchmark_istat: benchmarkIstat
      });
    }

    // ── Benchmark (fast, ~50ms) poi Opus SHORT ────────────────────
    const benchmarkIstat = await fetchBenchmarkISTAT(settore, regioneEffettiva);
    const opusResult     = await callOpusShock(settore, benchmarkIstat);

    // ── Salva shock in settori_custom ─────────────────────────────
    const shockData = { 'default': {
      shock:       opusResult.shock,
      collegamento: opusResult.collegamento,
      aggancio:    opusResult.aggancio
    }};

    const now = new Date().toISOString();

    if (settoreData) {
      const merged = { ...(settoreData.shock_data || {}), ...shockData };
      const { data: updated } = await supabase
        .from('settori_custom')
        .update({ shock_data: merged, nome: settoreData.nome || opusResult.nome_settore || settore, n_diagnosi: (settoreData.n_diagnosi || 0) + 1, updated_at: now })
        .eq('id', settoreData.id)
        .select('id').single();
      if (updated) settoreData = { ...settoreData, ...updated };
    } else {
      const { data: upserted } = await supabase
        .from('settori_custom')
        .upsert({
          codice:       codiceCalcolato,
          nome:         opusResult.nome_settore || settore,
          macro_settore: opusResult.macro_settore || 'altro',
          shock_data:   shockData,
          n_diagnosi:   1,
          created_by:   user_id || null,
          created_at:   now,
          updated_at:   now
        }, { onConflict: 'codice' })
        .select('id').single();
      settoreData = upserted;
    }

    console.log('DIAGNOSI-SHOCK COMPLETATA:', new Date().toISOString());
    return res.status(200).json({
      ok: true,
      cached: false,
      settore_id:      settoreData ? settoreData.id : null,
      shock:           opusResult.shock,
      collegamento:    opusResult.collegamento,
      aggancio:        opusResult.aggancio,
      benchmark_istat: benchmarkIstat
    });

  } catch (err) {
    console.error('DIAGNOSI-SHOCK ERRORE:', err.message);
    return res.status(500).json({ error: err.message });
  }
};

// ── Opus SHORT: solo shock/collegamento/aggancio (~200 token output) ──────────
async function callOpusShock(settore, benchmark) {
  const istatSection = buildIstatSection(benchmark, settore);

  const prompt = `RUOLO:
Sei il direttore commerciale più esperto d'Italia. Hai 7 secondi per colpire un titolare di "${settore}" che non si fida.
${istatSection}
OBIETTIVO: Un'affermazione che dimostra che conosci il suo business meglio di lui. AFFERMA — non fare domande. Usa un dato reale e specifico.

Rispondi SOLO in JSON valido:
{
    "nome_settore": "Nome pulito del settore (es: Produzione ghiaccio alimentare)",
    "macro_settore": "uno tra: alimentare, servizi, manifatturiero, commercio, edilizia, tech",
    "shock": "Una frase secca con un dato reale del settore italiano. Specifica — numeri, percentuali, comportamenti reali. Il titolare deve pensare: è vero, succede anche a me. Max 2 righe.",
    "collegamento": "Collega il dato shock alla realtà operativa di una PMI tipica. Quantifica l'impatto in euro o %. Max 2 righe.",
    "aggancio": "Proponi — non chiedere. Max 1 riga."
}

REGOLE:
1. I dati devono essere REALISTICI per il mercato italiano.
2. Usa il linguaggio del titolare, non termini da MBA.
3. NON citare fonti, NON dire "ISTAT" o "secondo i dati" — parla come se conoscessi il mercato direttamente.`;

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-api-key': ANTHROPIC_KEY, 'anthropic-version': '2023-06-01' },
    body: JSON.stringify({ model: 'claude-opus-4-20250514', max_tokens: 600, messages: [{ role: 'user', content: prompt }] })
  });
  const data = await response.json();
  const text = data.content[0].text.replace(/```json|```/g, '').trim();
  return JSON.parse(text);
}

// ── Helpers (duplicati da diagnosi-start per indipendenza del modulo) ─────────
function buildIstatSection(benchmark, settore) {
  if (!benchmark) return '';
  const fmt    = n => n ? '\u20ac\u00a0' + Number(n).toLocaleString('it-IT') : 'N/D';
  const fmtPct = n => (n !== null && n !== undefined) ? n + '%' : 'N/D';
  const trend  = benchmark.trend !== null && benchmark.trend !== undefined
    ? `\n- Tendenza vs anno precedente: ${benchmark.trend > 0 ? '+' : ''}${benchmark.trend}%` : '';
  return `
DATI DI MERCATO REALI — ${settore} (${benchmark.regione_usata}):
- Settore: ${benchmark.settore_trovato}
- Numero di aziende nel settore: ${Number(benchmark.numero_imprese).toLocaleString('it-IT')}
- Fatturato medio per azienda: ${fmt(benchmark.fatturato_medio)}
- Margine operativo medio: ${fmtPct(benchmark.margine_operativo_pct)}
- Valore aggiunto medio per azienda: ${fmt(benchmark.valore_aggiunto_medio)}${trend}

Hai accesso a dati di mercato reali. Usali come se fossero la tua conoscenza diretta del settore. NON citare fonti, NON dire "ISTAT" o "secondo i dati". Parla come un direttore commerciale esperto che CONOSCE il mercato.

CORRETTO: 'Le aziende del tuo settore in ${benchmark.regione_usata} fatturano in media ${fmt(benchmark.fatturato_medio)}.'
CORRETTO: 'Nella tua regione ci sono ${Number(benchmark.numero_imprese).toLocaleString('it-IT')} aziende come la tua.'
SBAGLIATO: 'Secondo dati ISTAT 2023...' / 'Da fonti ufficiali...' / 'I dati di mercato indicano...'

Parla in prima persona come se conoscessi il mercato per esperienza diretta. I numeri sono reali — usali con sicurezza.`;
}

async function fetchBenchmarkISTAT(settore, regione) {
  if (!settore) return null;
  try {
    const anno       = 2023;
    const regioneUsa = regione && regione !== '' ? regione : 'Italia';
    const searchTerm = settore.replace(/[%_]/g, '').substring(0, 40);

    let rows = null;

    if (regioneUsa !== 'Italia') {
      const { data } = await supabase
        .from('benchmark_imprese')
        .select('*')
        .ilike('descrizione_settore', `%${searchTerm}%`)
        .eq('regione', regioneUsa)
        .eq('anno', anno)
        .limit(30);
      if (data && data.length > 0) rows = data;
    }

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

    const totFatturato = rows.reduce((s, r) => s + (Number(r.fatturato_migliaia_euro) || 0), 0);
    const totMargine   = rows.reduce((s, r) => s + (Number(r.margine_operativo_migliaia_euro) || 0), 0);
    const totVA        = rows.reduce((s, r) => s + (Number(r.valore_aggiunto_migliaia_euro) || 0), 0);
    const totImprese   = rows.reduce((s, r) => s + (Number(r.numero_imprese) || 0), 0);

    if (totImprese === 0) return null;

    const fatturatoMedio = Math.round((totFatturato / totImprese) * 1000);
    const marginePct     = totFatturato > 0 ? Math.round((totMargine / totFatturato) * 1000) / 10 : null;
    const vaMedio        = Math.round((totVA / totImprese) * 1000);

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
      const totFP = rowsPrev.reduce((s, r) => s + (Number(r.fatturato_migliaia_euro) || 0), 0);
      const totIP = rowsPrev.reduce((s, r) => s + (Number(r.numero_imprese) || 0), 0);
      if (totIP > 0 && fatturatoMedio > 0) {
        const fp = Math.round((totFP / totIP) * 1000);
        if (fp > 0) trend = Math.round(((fatturatoMedio - fp) / fp) * 1000) / 10;
      }
    }

    return {
      numero_imprese:        totImprese,
      fatturato_medio:       fatturatoMedio,
      margine_operativo_pct: marginePct,
      valore_aggiunto_medio: vaMedio,
      trend,
      regione_usata:         regioneRows,
      settore_trovato:       rows[0].descrizione_settore,
      fonte:                 'ISTAT 2023'
    };
  } catch (err) {
    console.error('fetchBenchmarkISTAT error:', err.message);
    return null;
  }
}
