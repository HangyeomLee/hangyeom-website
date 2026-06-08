-- Run this once in the Supabase SQL editor (Project → SQL Editor → New query)
-- Adds a categories table and links posts to a category.

create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  color text not null default '#7C3AED',
  created_at timestamptz not null default now()
);

alter table posts
  add column if not exists category_id uuid references categories(id) on delete set null;
