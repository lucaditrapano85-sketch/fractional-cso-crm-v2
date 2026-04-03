-- ============================================================================
-- SETUP ADMIN: profili utenti + accesso admin
-- Eseguire nel Supabase SQL Editor
-- ============================================================================

-- STEP 1: Tabella profili utenti
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  nome TEXT,
  cognome TEXT,
  telefono TEXT,
  is_admin BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- STEP 2: Trigger che crea il profilo automaticamente alla registrazione
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, nome, cognome, telefono)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'nome',
    NEW.raw_user_meta_data->>'cognome',
    NEW.raw_user_meta_data->>'telefono'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- STEP 3: Inserisci il profilo per il tuo utente gia esistente
INSERT INTO profiles (id, email, nome, cognome, is_admin)
VALUES ('2b75f0e3-2678-4e80-929c-cffddd9a5a91', 'lucaditrapano85@gmail.com', 'Luca', 'Di Trapano', true)
ON CONFLICT (id) DO UPDATE SET is_admin = true;

-- STEP 4: RLS su profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Ogni utente vede il proprio profilo
CREATE POLICY "Users see own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

-- Admin vede tutti i profili
CREATE POLICY "Admin sees all profiles" ON profiles
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true)
  );

-- Ogni utente puo aggiornare il proprio profilo
CREATE POLICY "Users update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- STEP 5: Admin puo vedere i dati di TUTTI gli utenti (prospects, calls, ecc.)
-- Aggiungiamo policy admin a ogni tabella

CREATE POLICY "Admin sees all prospects" ON prospects
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true)
  );

CREATE POLICY "Admin sees all calls" ON calls
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true)
  );

CREATE POLICY "Admin sees all eventi" ON eventi
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true)
  );

CREATE POLICY "Admin sees all preventivi" ON preventivi
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true)
  );

CREATE POLICY "Admin sees all benchmark" ON benchmark_custom
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true)
  );

-- STEP 6: Indice per performance
CREATE INDEX IF NOT EXISTS idx_profiles_is_admin ON profiles(is_admin) WHERE is_admin = true;

-- Colonne aggiuntive per CSO Piano Sections (eseguire una volta)
-- ALTER TABLE prospects ADD COLUMN IF NOT EXISTS notes_cso jsonb DEFAULT '[]';
-- ALTER TABLE prospects ADD COLUMN IF NOT EXISTS piano_azioni_cso jsonb DEFAULT '[]';

-- Colonne per il flusso "Nuovo cliente" (eseguire una volta)
-- ALTER TABLE prospects ADD COLUMN IF NOT EXISTS cognome text;
-- ALTER TABLE prospects ADD COLUMN IF NOT EXISTS azienda text;
-- ALTER TABLE prospects ADD COLUMN IF NOT EXISTS piva text;
-- ALTER TABLE prospects ADD COLUMN IF NOT EXISTS piano text DEFAULT 'self';
-- ALTER TABLE prospects ADD COLUMN IF NOT EXISTS cso_id uuid;
-- ALTER TABLE prospects ADD COLUMN IF NOT EXISTS invite_token text;
-- ALTER TABLE prospects ADD COLUMN IF NOT EXISTS invite_sent_at timestamptz;

-- Colonne per attivazione piano (invite.html — bottone test)
-- ALTER TABLE prospects ADD COLUMN IF NOT EXISTS user_id uuid;
-- ALTER TABLE prospects ADD COLUMN IF NOT EXISTS activated_at timestamptz;

-- Colonne per tab scheda cliente e piano condiviso
-- ALTER TABLE prospects ADD COLUMN IF NOT EXISTS shared_plan text;

-- Colonne aggiuntive per tabella calls
-- ALTER TABLE calls ADD COLUMN IF NOT EXISTS durata_min integer;
-- ALTER TABLE calls ADD COLUMN IF NOT EXISTS tipo text DEFAULT 'follow_up';
-- ALTER TABLE calls ADD COLUMN IF NOT EXISTS appunti text;
-- ALTER TABLE calls ADD COLUMN IF NOT EXISTS prossimi_passi text;
-- ALTER TABLE calls ADD COLUMN IF NOT EXISTS cso_id uuid;

-- ============================================================
-- TABELLA settori_custom (usata da api/diagnosi-start.js)
-- ============================================================
-- Crea la tabella se non esiste:
CREATE TABLE IF NOT EXISTS settori_custom (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  codice          TEXT,
  nome            TEXT,
  macro_settore   TEXT,
  shock_data      JSONB DEFAULT '{}',
  domande_fase1   JSONB DEFAULT '[]',
  domande_fase2   JSONB DEFAULT '[]',
  benchmark       JSONB DEFAULT '{}',
  diagnosi_template TEXT,
  n_diagnosi      INTEGER DEFAULT 0,
  created_by      UUID,
  created_at      TIMESTAMPTZ DEFAULT now(),
  updated_at      TIMESTAMPTZ DEFAULT now()
);

-- Se la tabella esisteva già senza alcune colonne, aggiungile:
ALTER TABLE settori_custom ADD COLUMN IF NOT EXISTS shock_data       JSONB DEFAULT '{}';
ALTER TABLE settori_custom ADD COLUMN IF NOT EXISTS domande_fase1    JSONB DEFAULT '[]';
ALTER TABLE settori_custom ADD COLUMN IF NOT EXISTS domande_fase2    JSONB DEFAULT '[]';
ALTER TABLE settori_custom ADD COLUMN IF NOT EXISTS benchmark        JSONB DEFAULT '{}';
ALTER TABLE settori_custom ADD COLUMN IF NOT EXISTS diagnosi_template TEXT;
ALTER TABLE settori_custom ADD COLUMN IF NOT EXISTS n_diagnosi       INTEGER DEFAULT 0;
ALTER TABLE settori_custom ADD COLUMN IF NOT EXISTS updated_at       TIMESTAMPTZ DEFAULT now();

-- Nessuna RLS necessaria su settori_custom (dati pubblici di settore, non dati utente)
-- L'endpoint usa SUPABASE_SERVICE_KEY che bypassa RLS comunque.
