# 변경 기록 (CHANGELOG)

버전은 작업 단계마다 올리고, Git 태그(예: v0.1.0)로도 남깁니다.

## v0.3.0 - 로그인 (3단계, 웹)
- 로그인 화면 추가 (/login): 카카오, 구글 로그인 버튼
- 로그인 상태 관리 추가 (src/features/auth): 앱 시작 시 확인, 로그인·로그아웃 자동 반영
- 마이 화면: 로그인 전에는 로그인 안내, 로그인 후에는 프로필 카드(닉네임, 로그인 방식)와 로그아웃 버튼
- 카카오 로그인은 비즈앱이 아니어도 되도록 닉네임·프로필 사진만 요청 (이메일 미요청)

## v0.2.0 - Supabase 연결 준비 (2단계)
- Supabase 연결 코드 추가 (src/lib/supabase.ts), 연결 정보가 없으면 앱이 멈추지 않고 안내만 표시
- 환경변수 이름을 publishable 키 방식으로 변경: VITE_SUPABASE_URL, VITE_SUPABASE_PUBLISHABLE_KEY
- 마이 화면에 "연결 테스트" 버튼 추가 (개발용, 로그인 단계 완료 후 제거 예정)
- DB 설계 추가 (supabase/migrations/0001_init.sql): 회원, 카테고리, 지역, 광고, 광고 사진, 포인트 내역, 친구 추천, 신고, 차단 표 및 RLS 보안 규칙
- DB 확인용 SQL 추가 (supabase/checks/rls_check.sql)
- README 를 Cloudflare + Supabase 작업 방식에 맞게 정리

## v0.1.1 - Cloudflare 배포 설정
- wrangler.jsonc 추가 (정적 파일 배포 위치, 앱 내 주소 새로고침 대응)

## v0.1.0 - 기본 프로젝트 구성
- React + TypeScript + Vite 기본 프로젝트 추가
- 모바일 우선 레이아웃(가운데 정렬 480px 화면) 및 하단 메뉴(홈·지역·광고 등록·알림·마이)
- 홈 화면: 지역 헤더, 종류 탭(전체/개인/소상공인/기업), 배너, 카테고리 8개, 샘플 광고 목록
- 지역·광고 등록·알림·마이 화면은 "준비 중" 안내 화면
- 환경변수 견본(.env.example) 및 읽기 코드(src/lib/env.ts), Supabase 연결은 아직 하지 않음
- Cloudflare Pages 배포용 보안 헤더(public/_headers)
