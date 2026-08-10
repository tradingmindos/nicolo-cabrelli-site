-- Waitlist Trading Mind OS — da eseguire a mano nel SQL Editor di Supabase.
-- Tabella separata da contacts: semantica diversa, unicità su (email, source).
-- Nessuna policy di select: la chiave anon esposta nel browser può solo inserire.

create table public.waitlist (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  email      text not null,
  source     text not null default 'tmo',
  locale     text not null default 'it',
  created_at timestamptz not null default now()
);

create unique index waitlist_email_source_key
  on public.waitlist (lower(email), source);

alter table public.waitlist enable row level security;

create policy "inserimento anonimo waitlist"
  on public.waitlist
  for insert to anon
  with check (
    char_length(name) between 1 and 80
    and char_length(email) between 5 and 254
    and email like '%_@_%.__%'
    and source = 'tmo'
  );
