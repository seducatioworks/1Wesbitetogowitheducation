-- Spectre Tutors Network: Supabase Database Schema
-- Run this in the Supabase SQL Editor (https://app.supabase.com)

create table if not exists public.tutor_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  parent_name text not null,
  phone text not null,
  email text,
  student_class text not null,
  board text,
  subjects text[] not null,
  help_needed text[] not null,
  area text not null,
  landmark text,
  preferred_days text[] not null,
  preferred_time text not null,
  frequency text,
  additional_message text,
  status text default 'new' not null
);

-- Enable Row Level Security (RLS)
alter table public.tutor_requests enable row level security;

-- Allow anonymous visitors (parents) to insert tutor requests
create policy "Allow public insert to tutor_requests"
  on public.tutor_requests
  for insert
  to anon
  with check (true);

-- Allow reading requests (for admin view)
create policy "Allow read tutor_requests"
  on public.tutor_requests
  for select
  to anon
  using (true);

-- Allow status updates (for admin view)
create policy "Allow update tutor_requests"
  on public.tutor_requests
  for update
  to anon
  using (true);
