-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New query)

create table if not exists college_engagements (
  id          uuid        primary key default gen_random_uuid(),
  name        text        not null,
  "order"     integer     not null default 99,
  published   boolean     not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

alter table college_engagements enable row level security;

create policy "Public read published engagements"
  on college_engagements for select using (published = true);

create policy "Service role full access engagements"
  on college_engagements for all using (auth.role() = 'service_role');

create trigger college_engagements_updated_at
  before update on college_engagements
  for each row execute function update_updated_at();
