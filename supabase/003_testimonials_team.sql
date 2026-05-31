-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New query)

-- Testimonials table
create table if not exists testimonials (
  id            uuid        primary key default gen_random_uuid(),
  quote         text        not null,
  name          text        not null,
  designation   text        not null default '',
  college       text        not null default '',
  initials      text        not null default '',
  "order"       integer     not null default 99,
  published     boolean     not null default true,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- Team members table (instructors on About page)
create table if not exists team_members (
  id              uuid        primary key default gen_random_uuid(),
  name            text        not null,
  specialization  text        not null,
  bio             text        not null default '',
  tags            text[]      not null default '{}',
  photo_url       text        not null default '',
  "order"         integer     not null default 99,
  published       boolean     not null default true,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- RLS
alter table testimonials  enable row level security;
alter table team_members  enable row level security;

-- Public: read published only
create policy "Public read published testimonials"
  on testimonials for select using (published = true);

create policy "Public read published team members"
  on team_members for select using (published = true);

-- Service role: full access
create policy "Service role full access testimonials"
  on testimonials for all using (auth.role() = 'service_role');

create policy "Service role full access team_members"
  on team_members for all using (auth.role() = 'service_role');

-- Auto-update updated_at
create trigger testimonials_updated_at
  before update on testimonials
  for each row execute function update_updated_at();

create trigger team_members_updated_at
  before update on team_members
  for each row execute function update_updated_at();
