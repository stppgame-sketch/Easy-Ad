-- =====================================================================
-- 0001_init.sql : 모두의 광고 데이터베이스 1차 (표 + 보안 규칙 RLS)
-- 실행 위치 : Supabase 대시보드 > SQL Editor
-- 여러 번 실행해도 안전하도록 작성했습니다.
-- 이 파일은 "DB 변경 기록"이므로 수정하지 말고, 바꿀 때는 0002_... 파일을 새로 만듭니다.
-- =====================================================================

-- 1) 공용 함수 ---------------------------------------------------------
-- 글을 수정하면 updated_at(수정 시각)을 자동으로 갱신합니다.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- 2) 표(테이블) 만들기 --------------------------------------------------

-- 회원 정보. 로그인 계정(auth.users)과 1:1 로 연결됩니다.
create table if not exists public.profiles (
  id            uuid primary key references auth.users (id) on delete cascade,
  nickname      text not null check (char_length(nickname) between 2 and 20),
  name          text check (char_length(name) <= 30),
  avatar_config jsonb not null default '{}'::jsonb,
  interests     text[] not null default '{}',
  role          text not null default 'user' check (role in ('user', 'admin')),
  is_banned     boolean not null default false,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);
create unique index if not exists profiles_nickname_unique
  on public.profiles (lower(nickname));

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- 카테고리 (맛집, 생활·중고 ...)
create table if not exists public.categories (
  id         smallint primary key,
  slug       text not null unique,
  label      text not null,
  sort_order smallint not null
);

-- 지역 (시도 / 시군구 / 읍면동). 실제 데이터는 4단계에서 채웁니다.
create table if not exists public.regions (
  code        text primary key,
  level       smallint not null check (level in (1, 2, 3)),
  name        text not null,
  parent_code text references public.regions (code)
);
create index if not exists regions_parent_idx on public.regions (parent_code);

-- 광고
create table if not exists public.ads (
  id           uuid primary key default gen_random_uuid(),
  author_id    uuid not null references public.profiles (id) on delete cascade,
  type         text not null check (type in ('personal', 'business', 'company')),
  category_id  smallint not null references public.categories (id),
  region_code  text references public.regions (code),
  title        text not null check (char_length(title) between 2 and 100),
  body         text not null check (char_length(body) between 1 and 3000),
  lat          double precision check (lat between -90 and 90),
  lng          double precision check (lng between -180 and 180),
  address_text text check (char_length(address_text) <= 200),
  status       text not null default 'active' check (status in ('active', 'hidden')),
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

drop trigger if exists ads_set_updated_at on public.ads;
create trigger ads_set_updated_at
  before update on public.ads
  for each row execute function public.set_updated_at();

-- 목록을 빠르게 불러오기 위한 색인(인덱스)
create index if not exists ads_region_created_idx
  on public.ads (region_code, created_at desc, id desc) where status = 'active';
create index if not exists ads_type_category_created_idx
  on public.ads (type, category_id, created_at desc, id desc) where status = 'active';
create index if not exists ads_author_idx
  on public.ads (author_id, created_at desc);

-- 광고 사진 (광고 1개당 최대 5장: sort_order 는 0~4 만 가능, 같은 번호 중복 불가)
create table if not exists public.ad_images (
  id         uuid primary key default gen_random_uuid(),
  ad_id      uuid not null references public.ads (id) on delete cascade,
  path       text not null,
  thumb_path text,
  sort_order smallint not null check (sort_order between 0 and 4),
  created_at timestamptz not null default now(),
  unique (ad_id, sort_order)
);

-- 포인트 내역 (기록만 추가. 지급은 서버만 가능)
-- 회원 탈퇴 시 기록은 남기되 회원 연결만 끊습니다(user_id 가 비워짐).
create table if not exists public.point_ledger (
  id         bigint generated always as identity primary key,
  user_id    uuid references public.profiles (id) on delete set null,
  amount     integer not null check (amount <> 0),
  reason     text not null,
  ref_id     text,
  created_at timestamptz not null default now()
);
create index if not exists point_ledger_user_idx
  on public.point_ledger (user_id, created_at desc);

-- 친구 추천 (초대받은 사람은 1번만 등록 가능)
create table if not exists public.referrals (
  id          bigint generated always as identity primary key,
  referrer_id uuid not null references public.profiles (id) on delete cascade,
  invitee_id  uuid not null unique references public.profiles (id) on delete cascade,
  created_at  timestamptz not null default now(),
  rewarded_at timestamptz,
  check (referrer_id <> invitee_id)
);
create index if not exists referrals_referrer_idx
  on public.referrals (referrer_id);

-- 신고 (같은 사람이 같은 광고를 중복 신고할 수 없음)
create table if not exists public.reports (
  id          bigint generated always as identity primary key,
  reporter_id uuid not null references public.profiles (id) on delete cascade,
  ad_id       uuid not null references public.ads (id) on delete cascade,
  reason      text not null check (char_length(reason) between 2 and 500),
  status      text not null default 'open' check (status in ('open', 'resolved', 'dismissed')),
  created_at  timestamptz not null default now(),
  unique (reporter_id, ad_id)
);
create index if not exists reports_ad_idx on public.reports (ad_id);

-- 차단
create table if not exists public.blocks (
  blocker_id uuid not null references public.profiles (id) on delete cascade,
  blocked_id uuid not null references public.profiles (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (blocker_id, blocked_id),
  check (blocker_id <> blocked_id)
);

-- 3) 기본 데이터: 카테고리 8개 -----------------------------------------
insert into public.categories (id, slug, label, sort_order) values
  (1, 'food',   '맛집',     1),
  (2, 'market', '생활·중고', 2),
  (3, 'travel', '여행',     3),
  (4, 'realty', '부동산',   4),
  (5, 'job',    '알바',     5),
  (6, 'edu',    '교육',     6),
  (7, 'hobby',  '취미',     7),
  (8, 'etc',    '기타',     8)
on conflict (id) do nothing;

-- 4) 도우미 함수 : 로그인한 사람이 관리자인지 / 정지되지 않았는지 확인 ------
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.profiles p
    where p.id = (select auth.uid()) and p.role = 'admin' and not p.is_banned
  );
$$;

create or replace function public.is_active_user()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.profiles p
    where p.id = (select auth.uid()) and not p.is_banned
  );
$$;

revoke all on function public.is_admin() from public, anon, authenticated;
revoke all on function public.is_active_user() from public, anon, authenticated;
grant execute on function public.is_admin() to authenticated;
grant execute on function public.is_active_user() to authenticated;

-- 5) 회원가입 시 profiles 자동 생성 -------------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, nickname)
  values (new.id, '이웃' || substr(replace(new.id::text, '-', ''), 1, 6))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 6) 보안 규칙 RLS ------------------------------------------------------
-- 원칙: 먼저 모든 접근을 막고, 필요한 것만 하나씩 허용합니다.

alter table public.profiles     enable row level security;
alter table public.categories   enable row level security;
alter table public.regions      enable row level security;
alter table public.ads          enable row level security;
alter table public.ad_images    enable row level security;
alter table public.point_ledger enable row level security;
alter table public.referrals    enable row level security;
alter table public.reports      enable row level security;
alter table public.blocks       enable row level security;

-- 6-1) profiles : 본인 정보만 보고, 일부 항목만 수정 (role, is_banned 는 수정 불가)
revoke all on table public.profiles from anon, authenticated;
grant select on public.profiles to authenticated;
grant update (nickname, name, avatar_config, interests) on public.profiles to authenticated;

drop policy if exists profiles_select_own on public.profiles;
create policy profiles_select_own on public.profiles
  for select to authenticated
  using (id = (select auth.uid()));

drop policy if exists profiles_update_own on public.profiles;
create policy profiles_update_own on public.profiles
  for update to authenticated
  using (id = (select auth.uid()))
  with check (id = (select auth.uid()));

-- 다른 사람에게 보여도 되는 정보(닉네임, 아바타)만 모은 공개용 보기.
-- 광고 작성자 표시에 사용합니다. 이름·역할·정지 여부는 포함하지 않습니다.
create or replace view public.public_profiles as
  select id, nickname, avatar_config from public.profiles;
revoke all on table public.public_profiles from anon, authenticated;
grant select on public.public_profiles to anon, authenticated;

-- 6-2) categories, regions : 누구나 읽기만 가능
revoke all on table public.categories from anon, authenticated;
grant select on public.categories to anon, authenticated;
drop policy if exists categories_select_all on public.categories;
create policy categories_select_all on public.categories
  for select to anon, authenticated using (true);

revoke all on table public.regions from anon, authenticated;
grant select on public.regions to anon, authenticated;
drop policy if exists regions_select_all on public.regions;
create policy regions_select_all on public.regions
  for select to anon, authenticated using (true);

-- 6-3) ads : 공개 광고는 누구나 읽기, 쓰기·수정·삭제는 작성자 본인만
revoke all on table public.ads from anon, authenticated;
grant select on public.ads to anon, authenticated;
grant insert (author_id, type, category_id, region_code, title, body, lat, lng, address_text)
  on public.ads to authenticated;
grant update (type, category_id, region_code, title, body, lat, lng, address_text)
  on public.ads to authenticated;
grant delete on public.ads to authenticated;

drop policy if exists ads_select_active_or_own on public.ads;
create policy ads_select_active_or_own on public.ads
  for select to anon, authenticated
  using (status = 'active' or author_id = (select auth.uid()));

drop policy if exists ads_insert_own on public.ads;
create policy ads_insert_own on public.ads
  for insert to authenticated
  with check (author_id = (select auth.uid()) and (select public.is_active_user()));

drop policy if exists ads_update_own on public.ads;
create policy ads_update_own on public.ads
  for update to authenticated
  using (author_id = (select auth.uid()) and (select public.is_active_user()))
  with check (author_id = (select auth.uid()));

drop policy if exists ads_delete_own on public.ads;
create policy ads_delete_own on public.ads
  for delete to authenticated
  using (author_id = (select auth.uid()));

-- 6-4) ad_images : 보이는 광고의 사진만 읽기, 쓰기는 광고 작성자 본인만
revoke all on table public.ad_images from anon, authenticated;
grant select on public.ad_images to anon, authenticated;
grant insert (ad_id, path, thumb_path, sort_order) on public.ad_images to authenticated;
grant update (path, thumb_path, sort_order) on public.ad_images to authenticated;
grant delete on public.ad_images to authenticated;

drop policy if exists ad_images_select_visible on public.ad_images;
create policy ad_images_select_visible on public.ad_images
  for select to anon, authenticated
  using (exists (select 1 from public.ads a where a.id = ad_images.ad_id));

drop policy if exists ad_images_insert_own on public.ad_images;
create policy ad_images_insert_own on public.ad_images
  for insert to authenticated
  with check (exists (
    select 1 from public.ads a
    where a.id = ad_images.ad_id and a.author_id = (select auth.uid())
  ));

drop policy if exists ad_images_update_own on public.ad_images;
create policy ad_images_update_own on public.ad_images
  for update to authenticated
  using (exists (
    select 1 from public.ads a
    where a.id = ad_images.ad_id and a.author_id = (select auth.uid())
  ))
  with check (exists (
    select 1 from public.ads a
    where a.id = ad_images.ad_id and a.author_id = (select auth.uid())
  ));

drop policy if exists ad_images_delete_own on public.ad_images;
create policy ad_images_delete_own on public.ad_images
  for delete to authenticated
  using (exists (
    select 1 from public.ads a
    where a.id = ad_images.ad_id and a.author_id = (select auth.uid())
  ));

-- 6-5) point_ledger, referrals : 본인 것만 "읽기"만 가능. 쓰기는 서버(관리자 키)만 가능
revoke all on table public.point_ledger from anon, authenticated;
grant select on public.point_ledger to authenticated;
drop policy if exists point_ledger_select_own on public.point_ledger;
create policy point_ledger_select_own on public.point_ledger
  for select to authenticated
  using (user_id = (select auth.uid()));

revoke all on table public.referrals from anon, authenticated;
grant select on public.referrals to authenticated;
drop policy if exists referrals_select_own on public.referrals;
create policy referrals_select_own on public.referrals
  for select to authenticated
  using (referrer_id = (select auth.uid()) or invitee_id = (select auth.uid()));

-- 6-6) reports : 본인이 한 신고만 보고, 새 신고만 작성 가능 (처리 상태는 관리자만 변경)
revoke all on table public.reports from anon, authenticated;
grant select on public.reports to authenticated;
grant insert (reporter_id, ad_id, reason) on public.reports to authenticated;

drop policy if exists reports_select_own on public.reports;
create policy reports_select_own on public.reports
  for select to authenticated
  using (reporter_id = (select auth.uid()));

drop policy if exists reports_insert_own on public.reports;
create policy reports_insert_own on public.reports
  for insert to authenticated
  with check (reporter_id = (select auth.uid()) and (select public.is_active_user()));

-- 6-7) blocks : 본인의 차단 목록만 조회·추가·삭제
revoke all on table public.blocks from anon, authenticated;
grant select, insert, delete on public.blocks to authenticated;

drop policy if exists blocks_select_own on public.blocks;
create policy blocks_select_own on public.blocks
  for select to authenticated
  using (blocker_id = (select auth.uid()));

drop policy if exists blocks_insert_own on public.blocks;
create policy blocks_insert_own on public.blocks
  for insert to authenticated
  with check (blocker_id = (select auth.uid()));

drop policy if exists blocks_delete_own on public.blocks;
create policy blocks_delete_own on public.blocks
  for delete to authenticated
  using (blocker_id = (select auth.uid()));

-- 끝. 다음 파일: supabase/checks/rls_check.sql 로 결과를 확인합니다.
