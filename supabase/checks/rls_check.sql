-- 0001_init.sql 실행 후 결과 확인용 (읽기만 하므로 안전합니다)
--
-- 정상 결과: 표 9개 모두 "RLS 켜짐"이 true 이고, 정책 개수가 아래와 같아야 합니다.
--   ad_images 4 / ads 4 / blocks 3 / categories 1 / point_ledger 1
--   profiles 2 / referrals 1 / regions 1 / reports 2
select c.relname as "표 이름",
       c.relrowsecurity as "RLS 켜짐(true여야 정상)",
       (select count(*) from pg_policies p
         where p.schemaname = 'public' and p.tablename = c.relname) as "정책 개수"
from pg_class c
join pg_namespace n on n.oid = c.relnamespace
where n.nspname = 'public' and c.relkind = 'r'
order by c.relname;
