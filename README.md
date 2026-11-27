# 모두의 광고 (Easy-Ad)

누구나 무료로 올리는 지역 기반 광고 앱. 현재 버전: **v0.2.0**

## 작업 방식 (코드를 직접 만지지 않는 방식)

1. Claude 가 만든 파일(ZIP)을 받는다.
2. GitHub 저장소에 업로드한다. (한 번에 모아서 커밋 1번)
3. Cloudflare 가 자동으로 앱을 만들어 인터넷에 올린다.
4. 인터넷 주소에서 화면을 확인한다.

## 서비스 역할

| 서비스 | 역할 |
|---|---|
| GitHub | 소스코드 보관, 버전 기록 |
| Cloudflare (Workers) | 웹사이트 자동 빌드·배포 |
| Supabase | 회원, 게시글, 사진 저장 |

## 폴더 구조

```
index.html            앱이 시작되는 HTML
package.json          필요한 프로그램 목록과 버전
wrangler.jsonc        Cloudflare 배포 설정
vite.config.ts        빌드 설정
public/               그대로 배포되는 파일 (아이콘, 보안 헤더)
supabase/             DB 변경 기록(SQL)과 확인용 SQL
src/
  main.tsx            앱 시작점
  App.tsx             화면 주소 연결
  styles/             색 등 디자인 기준 (tokens.css)
  components/         여러 화면에서 같이 쓰는 부품 (ui, layout)
  features/           기능별 폴더 (home, ads, region, notifications, profile)
  lib/                환경변수, Supabase 연결 등 공용 도구
  types/              공용 타입
```

## Cloudflare 설정값

- 설정 위치: Workers & Pages > easy-ad > Settings > Build
- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Build variables and secrets (빌드 변수):

| 이름 | 값 |
|---|---|
| `VITE_SUPABASE_URL` | Supabase 프로젝트 주소 (Project URL) |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Supabase publishable(공개용) 키 (`sb_publishable_...`) |

## 비밀정보 규칙

- `VITE_` 로 시작하는 값은 브라우저에 공개됩니다. **publishable 키만** 넣습니다.
- **secret 키, service_role 키는 어디에도 올리지 않습니다.** (GitHub, Cloudflare 빌드 변수 모두 금지)
- `.env` 파일은 GitHub 에 올리지 않습니다. (.gitignore 에 등록됨)

## 무료 운영 주의

- Cloudflare 무료: 빌드 월 500회 → 파일은 모아서 한 번에 업로드
- Supabase 무료: DB 500MB, 파일 1GB, 전송량 월 5GB, 1주일간 사용이 없으면 프로젝트 일시정지, 자동 백업 없음
- 위 수치는 바뀔 수 있어 각 서비스 요금 페이지에서 주기적으로 확인

## 롤백 (이전 상태로 되돌리기)

버전마다 CHANGELOG 에 기록합니다. 문제가 생기면 이전 버전 ZIP 의 파일로 다시 업로드하면 이전 상태로 돌아갑니다. (DB 는 번호별 SQL 파일로 관리하며, 되돌리는 SQL 이 필요하면 단계별로 따로 제공)
