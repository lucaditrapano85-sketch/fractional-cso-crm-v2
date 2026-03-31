-- ============================================================================
-- Tabella user_profiles — ruolo utente (cso | titolare)
-- Eseguire nel Supabase SQL Editor (Dashboard > SQL Editor > New query)
-- ============================================================================

-- 1. Crea la tabella
create table if not exists public.user_profiles (
  user_id          uuid primary key references auth.users(id) on delete cascade,
  role             text not null default 'cso' check (role in ('cso', 'titolare')),
  company_name     text,
  sector           text,
  fascia_fatturato text,
  created_at       timestamptz default now()
);

-- 2. Abilita RLS
alter table public.user_profiles enable row level security;

-- 3. Policy — ogni utente legge e scrive solo il proprio profilo
create policy "user_profiles_select_own" on public.user_profiles
  for select using (auth.uid() = user_id);

create policy "user_profiles_insert_own" on public.user_profiles
  for insert with check (auth.uid() = user_id);

create policy "user_profiles_update_own" on public.user_profiles
  for update using (auth.uid() = user_id);

-- 4. Colonna owner_user_id su prospects (lega titolare al suo record)
alter table public.prospects
  add column if not exists owner_user_id uuid references auth.users(id);

create index if not exists idx_prospects_owner_user_id
  on public.prospects(owner_user_id);

-- 5. Policy aggiuntiva prospects: titolare vede solo il suo record
--    (aggiuntiva alle policy user_id già esistenti)
create policy "titolare_sees_own_prospect" on public.prospects
  for select using (
    auth.uid() = user_id
    or auth.uid() = owner_user_id
  );

-- Nota: se la policy "Users see own prospects" già copre auth.uid() = user_id,
-- questa policy aggiunge il caso owner_user_id per i titolari.
-- Se ottieni errore "policy already exists", esegui solo la parte dopo "-- 4."
