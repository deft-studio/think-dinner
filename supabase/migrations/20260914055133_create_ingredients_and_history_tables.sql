-- ingredients: 「ある食材」「苦手な食材」を type 列で区別する
create table public.ingredients (
  id bigint generated always as identity primary key,
  name text not null,
  type text not null check (type in ('have', 'ng')),
  created_at timestamptz not null default now()
);

-- ログイン機能が無く、自分と彼女が同じデータを共有するため、anonロールに直接権限を与える
grant select, insert, delete on public.ingredients to anon;
alter table public.ingredients enable row level security;
create policy "anon can manage ingredients"
  on public.ingredients
  for all
  to anon
  using (true)
  with check (true);

-- history: 実際に作ったメニューの記録（日付・メニュー名のみ）
create table public.history (
  id bigint generated always as identity primary key,
  date date not null,
  menu_name text not null,
  created_at timestamptz not null default now()
);

grant select, insert on public.history to anon;
alter table public.history enable row level security;
create policy "anon can manage history"
  on public.history
  for all
  to anon
  using (true)
  with check (true);
