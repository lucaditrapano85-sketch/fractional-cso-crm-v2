-- ============================================================================
-- SETUP RLS (Row Level Security) per Leva CRM
-- Eseguire nel Supabase SQL Editor (Dashboard > SQL Editor)
-- ============================================================================

-- STEP 1: Prima crea il tuo utente in Supabase Dashboard > Authentication > Users > Add User
-- Poi copia il suo UUID e sostituiscilo sotto in STEP 3

-- STEP 2: Aggiungi colonna user_id a tutte le tabelle
ALTER TABLE prospects ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id);
ALTER TABLE calls ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id);
ALTER TABLE eventi ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id);
ALTER TABLE preventivi ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id);
ALTER TABLE benchmark_custom ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id);

-- STEP 3: Backfill dati esistenti con il tuo user_id
-- SOSTITUISCI 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' con il tuo UUID utente!
-- UPDATE prospects SET user_id = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' WHERE user_id IS NULL;
-- UPDATE calls SET user_id = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' WHERE user_id IS NULL;
-- UPDATE eventi SET user_id = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' WHERE user_id IS NULL;
-- UPDATE preventivi SET user_id = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' WHERE user_id IS NULL;
-- UPDATE benchmark_custom SET user_id = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' WHERE user_id IS NULL;

-- STEP 4: Trigger per auto-impostare user_id su ogni INSERT
CREATE OR REPLACE FUNCTION set_user_id()
RETURNS TRIGGER AS $$
BEGIN
  NEW.user_id := auth.uid();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS set_prospects_user_id ON prospects;
CREATE TRIGGER set_prospects_user_id BEFORE INSERT ON prospects
  FOR EACH ROW EXECUTE FUNCTION set_user_id();

DROP TRIGGER IF EXISTS set_calls_user_id ON calls;
CREATE TRIGGER set_calls_user_id BEFORE INSERT ON calls
  FOR EACH ROW EXECUTE FUNCTION set_user_id();

DROP TRIGGER IF EXISTS set_eventi_user_id ON eventi;
CREATE TRIGGER set_eventi_user_id BEFORE INSERT ON eventi
  FOR EACH ROW EXECUTE FUNCTION set_user_id();

DROP TRIGGER IF EXISTS set_preventivi_user_id ON preventivi;
CREATE TRIGGER set_preventivi_user_id BEFORE INSERT ON preventivi
  FOR EACH ROW EXECUTE FUNCTION set_user_id();

DROP TRIGGER IF EXISTS set_benchmark_custom_user_id ON benchmark_custom;
CREATE TRIGGER set_benchmark_custom_user_id BEFORE INSERT ON benchmark_custom
  FOR EACH ROW EXECUTE FUNCTION set_user_id();

-- STEP 5: Default su colonna (fallback al trigger)
ALTER TABLE prospects ALTER COLUMN user_id SET DEFAULT auth.uid();
ALTER TABLE calls ALTER COLUMN user_id SET DEFAULT auth.uid();
ALTER TABLE eventi ALTER COLUMN user_id SET DEFAULT auth.uid();
ALTER TABLE preventivi ALTER COLUMN user_id SET DEFAULT auth.uid();
ALTER TABLE benchmark_custom ALTER COLUMN user_id SET DEFAULT auth.uid();

-- STEP 6: Abilita RLS
ALTER TABLE prospects ENABLE ROW LEVEL SECURITY;
ALTER TABLE calls ENABLE ROW LEVEL SECURITY;
ALTER TABLE eventi ENABLE ROW LEVEL SECURITY;
ALTER TABLE preventivi ENABLE ROW LEVEL SECURITY;
ALTER TABLE benchmark_custom ENABLE ROW LEVEL SECURITY;

-- STEP 7: Policy — ogni utente vede/modifica solo i suoi dati

-- PROSPECTS
CREATE POLICY "Users see own prospects" ON prospects FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own prospects" ON prospects FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own prospects" ON prospects FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users delete own prospects" ON prospects FOR DELETE USING (auth.uid() = user_id);

-- CALLS
CREATE POLICY "Users see own calls" ON calls FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own calls" ON calls FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own calls" ON calls FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users delete own calls" ON calls FOR DELETE USING (auth.uid() = user_id);

-- EVENTI
CREATE POLICY "Users see own eventi" ON eventi FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own eventi" ON eventi FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own eventi" ON eventi FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users delete own eventi" ON eventi FOR DELETE USING (auth.uid() = user_id);

-- PREVENTIVI
CREATE POLICY "Users see own preventivi" ON preventivi FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own preventivi" ON preventivi FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own preventivi" ON preventivi FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users delete own preventivi" ON preventivi FOR DELETE USING (auth.uid() = user_id);

-- BENCHMARK_CUSTOM
CREATE POLICY "Users see own benchmark" ON benchmark_custom FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own benchmark" ON benchmark_custom FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own benchmark" ON benchmark_custom FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users delete own benchmark" ON benchmark_custom FOR DELETE USING (auth.uid() = user_id);

-- STEP 8: Indici per performance
CREATE INDEX IF NOT EXISTS idx_prospects_user_id ON prospects(user_id);
CREATE INDEX IF NOT EXISTS idx_calls_user_id ON calls(user_id);
CREATE INDEX IF NOT EXISTS idx_eventi_user_id ON eventi(user_id);
CREATE INDEX IF NOT EXISTS idx_preventivi_user_id ON preventivi(user_id);
CREATE INDEX IF NOT EXISTS idx_benchmark_custom_user_id ON benchmark_custom(user_id);

-- STEP 9: Dopo il backfill (STEP 3), rendi user_id NOT NULL:
-- ALTER TABLE prospects ALTER COLUMN user_id SET NOT NULL;
-- ALTER TABLE calls ALTER COLUMN user_id SET NOT NULL;
-- ALTER TABLE eventi ALTER COLUMN user_id SET NOT NULL;
-- ALTER TABLE preventivi ALTER COLUMN user_id SET NOT NULL;
-- ALTER TABLE benchmark_custom ALTER COLUMN user_id SET NOT NULL;
