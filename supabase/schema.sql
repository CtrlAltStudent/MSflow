-- Uruchom w Supabase SQL Editor (Dashboard → SQL Editor).
-- Tabela content (key-value dla treści strony)
create table if not exists public.content (
  key text primary key,
  value jsonb not null default '{}'
);

-- Odczyt dla wszystkich (strona publiczna)
alter table public.content enable row level security;

create policy "Odczyt content dla wszystkich"
  on public.content for select
  using (true);

-- Zapis tylko dla zalogowanych (admin)
create policy "Zapis content tylko dla zalogowanych"
  on public.content for all
  using (auth.uid() is not null)
  with check (auth.uid() is not null);

-- Bucket na pliki do pobrania (Storage)
insert into storage.buckets (id, name, public)
values ('downloads', 'downloads', true)
on conflict (id) do nothing;

-- Polityka: odczyt plików dla wszystkich
create policy "Odczyt plików downloads"
  on storage.objects for select
  using (bucket_id = 'downloads');

-- Polityka: upload/update/delete tylko dla zalogowanych
create policy "Zapis plików downloads tylko dla zalogowanych"
  on storage.objects for all
  using (bucket_id = 'downloads' and auth.uid() is not null)
  with check (bucket_id = 'downloads' and auth.uid() is not null);

-- Opcjonalnie: wstaw domyślne wpisy (można pominąć i dodać z panelu admina)
-- insert into public.content (key, value) values
--   ('about', '{"bio":"","bioShort":"","avatarUrl":"","email":"","githubUrl":"","linkedinUrl":""}'::jsonb),
--   ('home', '{"tagline":"msflow.pl","subtitle":"Strona wizytówkowa i portfolio."}'::jsonb),
--   ('projects', '[]'::jsonb),
--   ('downloads', '[]'::jsonb)
-- on conflict (key) do nothing;
