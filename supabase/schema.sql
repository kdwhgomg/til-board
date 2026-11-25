-- TIL Board 스키마. Supabase SQL Editor에서 한 번 실행한다.
create table if not exists til_posts (
  id uuid primary key default gen_random_uuid(),
  nickname text not null check (char_length(nickname) between 1 and 20),
  content  text not null check (char_length(content)  between 1 and 140),
  created_at timestamptz not null default now()
);

-- 최신순 목록 조회용
create index if not exists til_posts_created_at_idx on til_posts (created_at desc);

-- 최근 Supabase 프로젝트는 새 테이블 권한을 anon에 자동 부여하지 않는다.
-- RLS 정책보다 먼저 테이블 권한이 있어야 하므로 읽기/쓰기만 명시적으로 허용한다.
grant select, insert on table til_posts to anon;

-- 익명 서비스: 누구나 읽기/쓰기만 가능. update/delete 정책이 없으므로 수정·삭제는 막힌다.
alter table til_posts enable row level security;

drop policy if exists "anyone can read" on til_posts;
create policy "anyone can read" on til_posts for select using (true);

drop policy if exists "anyone can insert" on til_posts;
create policy "anyone can insert" on til_posts for insert with check (true);
