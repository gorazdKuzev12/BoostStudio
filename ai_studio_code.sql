-- 1. Enable UUID extension (Required for IDs)
create extension if not exists "pgcrypto";

-- 2. SALONS (The Businesses)
-- Stores branding, Stripe ID, and settings
create table public.salons (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null, -- e.g., "Luxe Lashes"
  slug text unique,   -- e.g., "luxe-lashes" (for your internal use)
  logo_url text,
  brand_color text default '#ec4899', -- Pink default
  
  -- 💰 MONEY & TECH
  stripe_account_id text, -- Connect ID (acct_...)
  cal_api_key text,       -- Optional: If you manage a central key
  custom_domain text unique, -- "sarahsalon.com"
  
  -- 📈 SUBSCRIPTION STATUS
  plan text default 'free_trial', -- 'essential', 'pro', 'vip'
  status text default 'active'
);

-- 3. PROFILES (The Users/Owners)
-- This links Supabase Auth to a specific Salon
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  salon_id uuid references public.salons(id),
  full_name text,
  phone text,
  role text default 'owner', -- 'owner' or 'staff'
  
  -- 📅 Individual Calendar Keys (For Multi-User salons)
  cal_api_key text, 
  cal_user_id decimal, 
  
  created_at timestamp with time zone default now()
);

-- 4. CLIENTS (The CRM)
-- The people booking the appointments
create table public.clients (
  id uuid default gen_random_uuid() primary key,
  salon_id uuid references public.salons(id) not null,
  
  full_name text not null,
  phone text, -- Important for SMS matching
  email text,
  birthday date, -- For that "Birthday Campaign"
  
  -- 📊 Stats
  total_spent decimal(10,2) default 0,
  total_visits int default 0,
  notes text, 
  
  created_at timestamp with time zone default now(),
  -- Ensure one salon can't have duplicate profiles for the same phone number
  unique(salon_id, phone)
);

-- 5. BOOKINGS (The Appointments)
-- Synced from Cal.com
create table public.bookings (
  id uuid default gen_random_uuid() primary key,
  salon_id uuid references public.salons(id) not null,
  client_id uuid references public.clients(id),
  
  -- 🔗 External IDs
  cal_booking_id decimal, -- ID from Cal
  cal_uid text,           -- UID string from Cal
  stripe_payment_id text, -- "pi_12345"
  
  -- 📝 Details
  service_name text,
  start_time timestamp with time zone not null,
  end_time timestamp with time zone not null,
  price decimal(10,2) default 0,
  status text default 'confirmed', -- pending, confirmed, cancelled
  
  created_at timestamp with time zone default now()
);

-- 6. CLIENT PHOTOS (For Before/After)
create table public.client_photos (
  id uuid default gen_random_uuid() primary key,
  salon_id uuid references public.salons(id) not null,
  client_id uuid references public.clients(id) not null,
  booking_id uuid references public.bookings(id),
  
  photo_url text not null,
  type text default 'after', -- 'before' or 'after'
  created_at timestamp with time zone default now()
);

-- ==========================================
-- 🔒 SECURITY POLICIES (RLS)
-- This ensures Sarah can't see Mike's salon data
-- ==========================================

-- Enable RLS
alter table salons enable row level security;
alter table profiles enable row level security;
alter table clients enable row level security;
alter table bookings enable row level security;
alter table client_photos enable row level security;

-- Policy 1: Profiles can read/edit their own data
create policy "Users can see own profile" 
on profiles for select using ( auth.uid() = id );

create policy "Users can update own profile" 
on profiles for update using ( auth.uid() = id );

-- Policy 2: Users can ONLY see data belonging to their Salon ID
-- This is the magic "Multi-Tenant" logic

create policy "Access own Salon" on salons
for all using ( id in (select salon_id from profiles where id = auth.uid()) );

create policy "Access Salon Clients" on clients
for all using ( salon_id in (select salon_id from profiles where id = auth.uid()) );

create policy "Access Salon Bookings" on bookings
for all using ( salon_id in (select salon_id from profiles where id = auth.uid()) );

create policy "Access Salon Photos" on client_photos
for all using ( salon_id in (select salon_id from profiles where id = auth.uid()) );

-- ==========================================
-- 🤖 AUTOMATION
-- Auto-create a profile when a user signs up
-- ==========================================

create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.profiles (id, full_name, role)
  values (new.id, new.raw_user_meta_data->>'full_name', 'owner');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();