-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New query)

alter table team_members
  add column if not exists role text not null default 'instructor';
