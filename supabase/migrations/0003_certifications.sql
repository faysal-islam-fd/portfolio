-- =====================================================================
-- Certifications table
-- =====================================================================

create table if not exists public.certifications (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  issuer text not null,
  issue_date date,
  expiry_date date,
  credential_id text,
  credential_url text,
  image_url text,
  description text,
  display_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists certifications_order_idx on public.certifications(display_order);

-- updated_at trigger
drop trigger if exists set_updated_at on public.certifications;
create trigger set_updated_at before update on public.certifications
  for each row execute function public.tg_set_updated_at();

-- RLS: public read, admin full control
alter table public.certifications enable row level security;

drop policy if exists certifications_public_read on public.certifications;
create policy certifications_public_read on public.certifications
  for select using (true);

drop policy if exists certifications_admin_all on public.certifications;
create policy certifications_admin_all on public.certifications
  for all using (public.is_admin()) with check (public.is_admin());
