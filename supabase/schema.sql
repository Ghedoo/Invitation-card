create extension if not exists pgcrypto;

create table if not exists public.rsvps (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(trim(name)) between 2 and 100),
  attendance text not null check (attendance in ('attending', 'not_attending')),
  message text not null check (char_length(trim(message)) between 1 and 1000),
  created_at timestamptz not null default now()
);

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade
);

alter table public.rsvps enable row level security;
alter table public.admin_users enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admin_users where user_id = auth.uid()
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

drop policy if exists "Anyone can submit an RSVP" on public.rsvps;
create policy "Anyone can submit an RSVP"
on public.rsvps for insert
to anon, authenticated
with check (true);

drop policy if exists "Admins can read RSVPs" on public.rsvps;
create policy "Admins can read RSVPs"
on public.rsvps for select
to authenticated
using (public.is_admin());

drop policy if exists "Admins can delete RSVPs" on public.rsvps;
create policy "Admins can delete RSVPs"
on public.rsvps for delete
to authenticated
using (public.is_admin());

drop policy if exists "Admins can read their role" on public.admin_users;
create policy "Admins can read their role"
on public.admin_users for select
to authenticated
using (user_id = auth.uid());

revoke all on table public.rsvps from anon;
grant insert on table public.rsvps to anon;
grant select, insert, delete on table public.rsvps to authenticated;

create or replace view public.public_rsvp_messages as
select id, name, message, created_at
from public.rsvps
where attendance = 'attending';

grant select on public.public_rsvp_messages to anon, authenticated;

-- After creating the admin user in Supabase Auth, run:
-- insert into public.admin_users (user_id) values ('AUTH_USER_UUID');
