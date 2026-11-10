-- ==============================================================================
-- Spectre Education: Supabase Database Schema (OPTIONAL / LEGACY INFRASTRUCTURE)
-- ==============================================================================
-- IMPORTANT ARCHITECTURAL NOTE:
-- Spectre Education operates primarily on a WhatsApp-first, human-curated intake
-- model. This Supabase database schema is NOT required for production launch.
--
-- If you choose to configure Supabase for secondary asynchronous lead archiving:
-- 1. Run this script in the Supabase SQL Editor (https://app.supabase.com).
-- 2. Public anonymous users (anon) are strictly restricted to INSERT-only.
-- 3. Anonymous SELECT, UPDATE, and DELETE are strictly disallowed to prevent
--    data exfiltration of parent, student, and educator personal records.
-- ==============================================================================

create table if not exists public.tutor_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_type text default 'parent' not null,
  parent_name text not null,
  phone text not null,
  email text,
  student_class text not null,
  board text,
  subjects text[] not null,
  help_needed text[] not null,
  area text not null,
  house_address text,
  landmark text,
  preferred_days text[] not null,
  preferred_time text not null,
  frequency text,
  additional_message text,
  status text default 'new' not null
);

-- Enable Row Level Security (RLS)
alter table public.tutor_requests enable row level security;

-- 1. Allow public write-only insert from frontend intake forms
create policy "Allow anonymous insert to tutor_requests"
  on public.tutor_requests
  for insert
  to anon
  with check (true);

-- 2. Restrict reading records strictly to authenticated administrative users
create policy "Allow authenticated select to tutor_requests"
  on public.tutor_requests
  for select
  to authenticated
  using (true);

-- 3. Restrict updating records strictly to authenticated administrative users
create policy "Allow authenticated update to tutor_requests"
  on public.tutor_requests
  for update
  to authenticated
  using (true);

-- 4. Restrict deletion strictly to authenticated administrative users
create policy "Allow authenticated delete to tutor_requests"
  on public.tutor_requests
  for delete
  to authenticated
  using (true);
