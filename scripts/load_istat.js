/**
 * scripts/load_istat.js
 * Carica i CSV ISTAT nelle tabelle benchmark_imprese e benchmark_agricoltura
 *
 * Uso:
 *   node scripts/load_istat.js
 *
 * I CSV devono essere in scripts/data/
 *   - istat_benchmark_leva.csv      → benchmark_imprese
 *   - istat_agricoltura_leva.csv    → benchmark_agricoltura
 */

const { createClient } = require('@supabase/supabase-js');
const fs   = require('fs');
const path = require('path');

// ── Config ────────────────────────────────────────────────────
const SUPABASE_URL      = process.env.SUPABASE_URL      || 'https://glxwvvtdybzkxtobsiin.supabase.co';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY || '';
const BATCH_SIZE        = 500;
const DATA_DIR          = path.join(__dirname, 'data');

if (!SUPABASE_SERVICE_KEY) {
  console.error('Manca SUPABASE_SERVICE_KEY. Esegui: SUPABASE_SERVICE_KEY=xxx node scripts/load_istat.js');
  process.exit(1);
}

const sb = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// ── CSV Parser (senza dipendenze esterne) ─────────────────────
function parseCSV(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines   = content.split('\n').filter(l => l.trim());
  const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));

  return lines.slice(1).map(line => {
    // Gestisce campi con virgole tra virgolette
    const values = [];
    let cur = '', inQuote = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') { inQuote = !inQuote; }
      else if (ch === ',' && !inQuote) { values.push(cur.trim()); cur = ''; }
      else { cur += ch; }
    }
    values.push(cur.trim());

    const row = {};
    headers.forEach((h, i) => {
      const v = (values[i] || '').replace(/^"|"$/g, '').trim();
      row[h] = v === '' || v === 'NA' || v === 'NULL' ? null : v;
    });
    return row;
  });
}

// ── Inserimento batch ─────────────────────────────────────────
async function insertBatch(table, rows) {
  const { error } = await sb.from(table).insert(rows);
  if (error) throw new Error(`${table}: ${error.message}`);
}

async function loadTable(table, filePath, transformFn) {
  const filename = path.basename(filePath);

  if (!fs.existsSync(filePath)) {
    console.warn(`⚠  File non trovato: ${filePath} — skip`);
    return;
  }

  console.log(`\n── ${table} ──────────────────────────`);
  console.log(`   File: ${filename}`);

  const rows = parseCSV(filePath).map(transformFn).filter(Boolean);
  console.log(`   Righe parsate: ${rows.length.toLocaleString()}`);

  let inserted = 0;
  for (let i = 0; i < rows.length; i += BATCH_SIZE) {
    const batch = rows.slice(i, i + BATCH_SIZE);
    await insertBatch(table, batch);
    inserted += batch.length;
    const pct = ((inserted / rows.length) * 100).toFixed(1);
    process.stdout.write(`\r   Inseriti: ${inserted.toLocaleString()}/${rows.length.toLocaleString()} (${pct}%)`);
  }
  console.log(`\n   ✓ Completato`);
}

// ── Trasformazioni colonne CSV → DB ───────────────────────────
function toNum(v) {
  if (v === null || v === undefined) return null;
  const n = parseFloat(String(v).replace(',', '.'));
  return isNaN(n) ? null : n;
}
function toInt(v) {
  if (v === null || v === undefined) return null;
  const n = parseInt(v, 10);
  return isNaN(n) ? null : n;
}

function transformImprese(r) {
  return {
    codice_ateco:                    r.codice_ateco                    || r.ATECO || null,
    descrizione_settore:             r.descrizione_settore             || r.DESCRIZIONE || null,
    regione:                         r.regione                         || r.REGIONE || null,
    classe_addetti:                  r.classe_addetti                  || r.ADDETTI || null,
    anno:                            toInt(r.anno                      || r.ANNO),
    numero_imprese:                  toInt(r.numero_imprese            || r.N_IMPRESE),
    fatturato_migliaia_euro:         toNum(r.fatturato_migliaia_euro   || r.FATTURATO),
    valore_aggiunto_migliaia_euro:   toNum(r.valore_aggiunto_migliaia_euro || r.VALORE_AGGIUNTO),
    margine_operativo_migliaia_euro: toNum(r.margine_operativo_migliaia_euro || r.MARGINE_OPERATIVO),
  };
}

function transformAgricoltura(r) {
  return {
    fonte:                           r.fonte                           || null,
    categoria:                       r.categoria                       || null,
    codice:                          r.codice                          || null,
    descrizione:                     r.descrizione                     || null,
    territorio:                      r.territorio                      || null,
    livello_territorio:              r.livello_territorio              || null,
    anno:                            toInt(r.anno                      || r.ANNO),
    superficie_ettari:               toNum(r.superficie_ettari),
    superficie_raccolta_ettari:      toNum(r.superficie_raccolta_ettari),
    produzione_quintali:             toNum(r.produzione_quintali),
    capi_macellati_annui:            toNum(r.capi_macellati_annui),
    indice_prezzo_vendita_base2020:  toNum(r.indice_prezzo_vendita_base2020),
    indice_prezzo_acquisto_base2020: toNum(r.indice_prezzo_acquisto_base2020),
  };
}

// ── Main ──────────────────────────────────────────────────────
(async () => {
  console.log('LEVA — Caricamento dati ISTAT');
  console.log('Supabase:', SUPABASE_URL);
  console.log('Batch size:', BATCH_SIZE);

  try {
    await loadTable(
      'benchmark_imprese',
      path.join(DATA_DIR, 'istat_benchmark_leva.csv'),
      transformImprese
    );

    await loadTable(
      'benchmark_agricoltura',
      path.join(DATA_DIR, 'istat_agricoltura_leva.csv'),
      transformAgricoltura
    );

    console.log('\n✓ Tutto completato.');
  } catch (err) {
    console.error('\n✗ Errore:', err.message);
    process.exit(1);
  }
})();
