-- ═══════════════════════════════════════════════════════════
-- LEVA — Tabelle benchmark ISTAT
-- Esegui nel SQL Editor di Supabase:
-- https://supabase.com/dashboard/project/glxwvvtdybzkxtobsiin/sql
-- ═══════════════════════════════════════════════════════════

-- ─── benchmark_imprese ───────────────────────────────────────
CREATE TABLE IF NOT EXISTS benchmark_imprese (
  id                              uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  codice_ateco                    text        NOT NULL,
  descrizione_settore             text,
  regione                         text,
  classe_addetti                  text,
  anno                            integer,
  numero_imprese                  integer,
  fatturato_migliaia_euro         numeric,
  valore_aggiunto_migliaia_euro   numeric,
  margine_operativo_migliaia_euro numeric,
  created_at                      timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_bench_imp_ateco_reg_anno
  ON benchmark_imprese (codice_ateco, regione, anno);

CREATE INDEX IF NOT EXISTS idx_bench_imp_ateco_add_anno
  ON benchmark_imprese (codice_ateco, classe_addetti, anno);

ALTER TABLE benchmark_imprese ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS select_bench_imp ON benchmark_imprese;
CREATE POLICY select_bench_imp ON benchmark_imprese
  FOR SELECT TO anon, authenticated USING (true);

-- ─── benchmark_agricoltura ───────────────────────────────────
CREATE TABLE IF NOT EXISTS benchmark_agricoltura (
  id                              uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  fonte                           text,
  categoria                       text,
  codice                          text,
  descrizione                     text,
  territorio                      text,
  livello_territorio              text,
  anno                            integer,
  superficie_ettari               numeric,
  superficie_raccolta_ettari      numeric,
  produzione_quintali             numeric,
  capi_macellati_annui            numeric,
  indice_prezzo_vendita_base2020  numeric,
  indice_prezzo_acquisto_base2020 numeric,
  created_at                      timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_bench_agr_codice_terr_anno
  ON benchmark_agricoltura (codice, territorio, anno);

CREATE INDEX IF NOT EXISTS idx_bench_agr_cat_liv_anno
  ON benchmark_agricoltura (categoria, livello_territorio, anno);

ALTER TABLE benchmark_agricoltura ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS select_bench_agr ON benchmark_agricoltura;
CREATE POLICY select_bench_agr ON benchmark_agricoltura
  FOR SELECT TO anon, authenticated USING (true);
