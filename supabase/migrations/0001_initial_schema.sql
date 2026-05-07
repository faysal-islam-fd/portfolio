-- =====================================================================
-- AI Researcher Portfolio - Initial Database Schema
-- =====================================================================
-- This migration provisions every table, RLS policy and storage bucket
-- the platform needs. Run inside the Supabase SQL editor or via the
-- Supabase CLI: `supabase db push`.
-- =====================================================================

-- Required extensions
create extension if not exists "pgcrypto";
create extension if not exists "uuid-ossp";

-- =====================================================================
-- 1. Helper: detect if the current request is from an admin user.
-- Admin emails are stored on the auth.users table (raw_user_meta_data
-- → role = 'admin') OR present in the public.admins table.
-- =====================================================================

create table if not exists public.admins (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  created_at timestamptz default now()
);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admins a
    where a.email = (auth.jwt() ->> 'email')
  )
  or coalesce(
    (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin',
    false
  );
$$;

grant execute on function public.is_admin() to anon, authenticated;

-- =====================================================================
-- 2. Site configuration (single-row, key/value flexible)
-- =====================================================================

create table if not exists public.site_config (
  id uuid primary key default gen_random_uuid(),
  key text unique not null,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz default now()
);

-- =====================================================================
-- 3. Hero / About content (single rows)
-- =====================================================================

create table if not exists public.hero (
  id uuid primary key default gen_random_uuid(),
  eyebrow text,
  headline text not null,
  subheadline text,
  rotating_titles text[] default '{}',
  cta_primary_label text,
  cta_primary_href text,
  cta_secondary_label text,
  cta_secondary_href text,
  metrics jsonb default '[]'::jsonb,
  updated_at timestamptz default now()
);

create table if not exists public.about (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  short_bio text,
  long_bio text,
  research_focus text,
  current_role text,
  location text,
  profile_image_url text,
  resume_url text,
  highlights jsonb default '[]'::jsonb,
  updated_at timestamptz default now()
);

-- =====================================================================
-- 4. Skills
-- =====================================================================

create type public.skill_category as enum (
  'deep_learning',
  'computer_vision',
  'nlp',
  'ml_frameworks',
  'languages',
  'tools',
  'cloud',
  'web'
);

create table if not exists public.skills (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category public.skill_category not null,
  proficiency int check (proficiency between 0 and 100) default 80,
  icon text,
  display_order int default 0,
  is_featured boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists skills_category_idx on public.skills(category);
create index if not exists skills_order_idx on public.skills(display_order);

-- =====================================================================
-- 5. Projects (AI / DL focused case studies)
-- =====================================================================

create type public.project_status as enum ('draft', 'published', 'archived');
create type public.project_type as enum (
  'research', 'computer_vision', 'nlp',
  'multimodal', 'reinforcement_learning', 'web', 'tool'
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  tagline text,
  description text,
  problem text,
  approach text,
  results text,
  content_mdx text,
  cover_image_url text,
  architecture_image_url text,
  gallery_urls text[] default '{}',
  tags text[] default '{}',
  datasets text[] default '{}',
  models text[] default '{}',
  metrics jsonb default '[]'::jsonb,
  github_url text,
  demo_url text,
  paper_url text,
  project_type public.project_type default 'research',
  status public.project_status default 'draft',
  is_featured boolean default false,
  display_order int default 0,
  published_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists projects_status_idx on public.projects(status);
create index if not exists projects_featured_idx on public.projects(is_featured);
create index if not exists projects_slug_idx on public.projects(slug);
create index if not exists projects_published_idx on public.projects(published_at desc);

-- =====================================================================
-- 6. Research entries (thesis / ongoing investigations)
-- =====================================================================

create type public.research_status as enum (
  'in_progress', 'under_review', 'accepted', 'published', 'completed'
);

create table if not exists public.research (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  abstract text,
  problem_statement text,
  methodology text,
  results text,
  content_mdx text,
  thumbnail_url text,
  diagram_url text,
  collaborators text[] default '{}',
  keywords text[] default '{}',
  status public.research_status default 'in_progress',
  start_date date,
  end_date date,
  external_url text,
  is_featured boolean default false,
  display_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists research_status_idx on public.research(status);
create index if not exists research_slug_idx on public.research(slug);

-- =====================================================================
-- 7. Publications
-- =====================================================================

create type public.publication_type as enum (
  'conference', 'journal', 'workshop', 'preprint', 'thesis', 'book_chapter'
);

create table if not exists public.publications (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  authors text not null,
  venue text,
  publication_type public.publication_type default 'conference',
  year int not null,
  abstract text,
  pdf_url text,
  arxiv_url text,
  doi text,
  bibtex text,
  citation_count int default 0,
  is_featured boolean default false,
  display_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists publications_year_idx on public.publications(year desc);

-- =====================================================================
-- 8. Experience timeline
-- =====================================================================

create type public.experience_type as enum (
  'work', 'research', 'education', 'fellowship', 'volunteer'
);

create table if not exists public.experience (
  id uuid primary key default gen_random_uuid(),
  organization text not null,
  role text not null,
  experience_type public.experience_type default 'work',
  location text,
  start_date date not null,
  end_date date,
  is_current boolean default false,
  description text,
  highlights text[] default '{}',
  technologies text[] default '{}',
  logo_url text,
  display_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists experience_start_idx on public.experience(start_date desc);

-- =====================================================================
-- 9. Achievements / awards
-- =====================================================================

create table if not exists public.achievements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  organization text,
  date date,
  description text,
  url text,
  icon text,
  display_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- =====================================================================
-- 10. Blog posts (MDX-powered)
-- =====================================================================

create type public.post_status as enum ('draft', 'published', 'archived');

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text,
  content_mdx text not null,
  cover_image_url text,
  tags text[] default '{}',
  reading_minutes int default 5,
  status public.post_status default 'draft',
  is_featured boolean default false,
  views int default 0,
  published_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists posts_status_idx on public.posts(status);
create index if not exists posts_published_idx on public.posts(published_at desc);

-- =====================================================================
-- 11. Contact links (social, email, scholar etc)
-- =====================================================================

create table if not exists public.contact_links (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  href text not null,
  icon text,
  display_order int default 0,
  created_at timestamptz default now()
);

-- =====================================================================
-- 12. Contact submissions (from public form)
-- =====================================================================

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text,
  message text not null,
  is_read boolean default false,
  created_at timestamptz default now()
);

create index if not exists contact_messages_created_idx
  on public.contact_messages(created_at desc);

-- =====================================================================
-- 13. updated_at triggers
-- =====================================================================

create or replace function public.tg_set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

do $$
declare t text;
begin
  for t in
    select unnest(array[
      'site_config','hero','about','skills','projects',
      'research','publications','experience','achievements','posts'
    ])
  loop
    execute format(
      'drop trigger if exists set_updated_at on public.%I; ' ||
      'create trigger set_updated_at before update on public.%I ' ||
      'for each row execute function public.tg_set_updated_at();',
      t, t
    );
  end loop;
end$$;

-- =====================================================================
-- 14. Row Level Security
-- =====================================================================
-- Strategy:
--   • Public (anon) can SELECT only published / non-sensitive rows.
--   • Admins (is_admin() = true) can do everything.
--   • Contact submissions: anonymous can INSERT, only admin can SELECT.
-- =====================================================================

alter table public.admins           enable row level security;
alter table public.site_config      enable row level security;
alter table public.hero             enable row level security;
alter table public.about            enable row level security;
alter table public.skills           enable row level security;
alter table public.projects         enable row level security;
alter table public.research         enable row level security;
alter table public.publications     enable row level security;
alter table public.experience       enable row level security;
alter table public.achievements     enable row level security;
alter table public.posts            enable row level security;
alter table public.contact_links    enable row level security;
alter table public.contact_messages enable row level security;

-- ---- admins (only admins read, only service role manages) ----
drop policy if exists admins_admin_all on public.admins;
create policy admins_admin_all on public.admins
  for all using (public.is_admin()) with check (public.is_admin());

-- Generic helper: 4 standard policies in one block per table.
-- Public read, admin full control.
do $$
declare t text;
begin
  for t in
    select unnest(array[
      'site_config','hero','about','skills','contact_links',
      'experience','achievements','publications'
    ])
  loop
    execute format($f$
      drop policy if exists %1$s_public_read on public.%1$s;
      create policy %1$s_public_read on public.%1$s
        for select using (true);

      drop policy if exists %1$s_admin_all on public.%1$s;
      create policy %1$s_admin_all on public.%1$s
        for all using (public.is_admin()) with check (public.is_admin());
    $f$, t);
  end loop;
end$$;

-- Projects: public can only read published rows.
drop policy if exists projects_public_read on public.projects;
create policy projects_public_read on public.projects
  for select using (status = 'published' or public.is_admin());
drop policy if exists projects_admin_all on public.projects;
create policy projects_admin_all on public.projects
  for all using (public.is_admin()) with check (public.is_admin());

-- Research: public can read published or completed entries.
drop policy if exists research_public_read on public.research;
create policy research_public_read on public.research
  for select using (
    status in ('published','completed','accepted') or public.is_admin()
  );
drop policy if exists research_admin_all on public.research;
create policy research_admin_all on public.research
  for all using (public.is_admin()) with check (public.is_admin());

-- Posts: only published visible.
drop policy if exists posts_public_read on public.posts;
create policy posts_public_read on public.posts
  for select using (status = 'published' or public.is_admin());
drop policy if exists posts_admin_all on public.posts;
create policy posts_admin_all on public.posts
  for all using (public.is_admin()) with check (public.is_admin());

-- Contact messages: anon can INSERT. Only admin can SELECT/UPDATE/DELETE.
drop policy if exists contact_messages_anon_insert on public.contact_messages;
create policy contact_messages_anon_insert on public.contact_messages
  for insert with check (true);
drop policy if exists contact_messages_admin_all on public.contact_messages;
create policy contact_messages_admin_all on public.contact_messages
  for all using (public.is_admin()) with check (public.is_admin());

-- =====================================================================
-- 15. Storage buckets (created via SQL when possible).
-- These commands are idempotent thanks to "on conflict".
-- =====================================================================

insert into storage.buckets (id, name, public)
  values
    ('avatars',     'avatars',     true),
    ('projects',    'projects',    true),
    ('research',    'research',    true),
    ('posts',       'posts',       true),
    ('resumes',     'resumes',     true),
    ('site',        'site',        true)
  on conflict (id) do nothing;

-- Public read for these buckets, admin write.
do $$
declare b text;
begin
  for b in
    select unnest(array['avatars','projects','research','posts','resumes','site'])
  loop
    execute format($f$
      drop policy if exists %1$s_public_read on storage.objects;
    $f$, b);
  end loop;
end$$;

drop policy if exists storage_public_read on storage.objects;
create policy storage_public_read on storage.objects
  for select using (
    bucket_id in ('avatars','projects','research','posts','resumes','site')
  );

drop policy if exists storage_admin_write on storage.objects;
create policy storage_admin_write on storage.objects
  for all using (public.is_admin()) with check (public.is_admin());

-- =====================================================================
-- Done. Run 0002_seed.sql for example data.
-- =====================================================================
