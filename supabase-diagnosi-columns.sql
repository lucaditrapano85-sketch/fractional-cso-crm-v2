-- ============================================================================
-- MIGRAZIONE: colonne diagnosi su prospects
-- Eseguire nel Supabase SQL Editor (Dashboard > SQL Editor)
-- Aggiunge le colonne necessarie per salvare l'output di diagnosi-end.js
-- ============================================================================

-- Score globale (0-100)
ALTER TABLE prospects ADD COLUMN IF NOT EXISTS score_globale INTEGER DEFAULT 0;

-- Dims score per dimensione (scala 1-5, JSONB)
-- (la colonna dims potrebbe già esistere — se esiste, questo è no-op)
-- ALTER TABLE prospects ADD COLUMN IF NOT EXISTS dims JSONB DEFAULT '{}';

-- Risposte Fase 2 (array di indici 0-4)
ALTER TABLE prospects ADD COLUMN IF NOT EXISTS dims_answers JSONB DEFAULT '{}';

-- Output diagnosi AI
ALTER TABLE prospects ADD COLUMN IF NOT EXISTS diagnosi_narrativa TEXT;
ALTER TABLE prospects ADD COLUMN IF NOT EXISTS diagnosi_priorita JSONB DEFAULT '[]';
ALTER TABLE prospects ADD COLUMN IF NOT EXISTS diagnosi_data TIMESTAMPTZ;

-- updated_at (per tracking modifiche)
ALTER TABLE prospects ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT now();

-- Tabella score_history (storico punteggi nel tempo)
CREATE TABLE IF NOT EXISTS score_history (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prospect_id  UUID REFERENCES prospects(id) ON DELETE CASCADE,
  dims         JSONB DEFAULT '{}',
  score_globale INTEGER DEFAULT 0,
  created_at   TIMESTAMPTZ DEFAULT now()
);

-- RLS su score_history
ALTER TABLE score_history ENABLE ROW LEVEL SECURITY;
CREATE POLICY IF NOT EXISTS "Users see own score_history" ON score_history
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM prospects WHERE prospects.id = score_history.prospect_id AND prospects.user_id = auth.uid())
  );
CREATE POLICY IF NOT EXISTS "Service key can insert score_history" ON score_history
  FOR INSERT WITH CHECK (true);
