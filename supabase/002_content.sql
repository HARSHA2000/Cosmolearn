-- Run this in your Supabase SQL editor (Dashboard → SQL Editor → New query)

-- Programs table
create table if not exists programs (
  id            uuid        primary key default gen_random_uuid(),
  title         text        not null,
  slug          text        not null unique,
  audience      text        not null default '',
  duration      text        not null default '',
  format        text        not null default '',
  tools         text[]      not null default '{}',
  outcomes      text[]      not null default '{}',
  aicte         boolean     not null default false,
  "order"       integer     not null default 99,
  excerpt       text        not null default '',
  content       text        not null default '',
  published     boolean     not null default true,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- Blog posts table
create table if not exists blog_posts (
  id            uuid        primary key default gen_random_uuid(),
  title         text        not null,
  slug          text        not null unique,
  date          date        not null default now(),
  excerpt       text        not null default '',
  tags          text[]      not null default '{}',
  author        text        not null default 'Harshith',
  content       text        not null default '',
  published     boolean     not null default true,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- RLS
alter table programs   enable row level security;
alter table blog_posts enable row level security;

-- Public: read published content only
create policy "Public read published programs"
  on programs for select using (published = true);

create policy "Public read published blog posts"
  on blog_posts for select using (published = true);

-- Service role: full access (used by API routes)
create policy "Service role full access programs"
  on programs for all using (auth.role() = 'service_role');

create policy "Service role full access blog_posts"
  on blog_posts for all using (auth.role() = 'service_role');

-- Auto-update updated_at on row change
create or replace function update_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger programs_updated_at
  before update on programs
  for each row execute function update_updated_at();

create trigger blog_posts_updated_at
  before update on blog_posts
  for each row execute function update_updated_at();
