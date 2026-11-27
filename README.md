# 모두의 광고 (Easy-Ad)

누구나 무료로 올리는 지역 기반 광고 앱. 현재 버전: **v0.1.0** (기본 프로젝트)

## 폴더 구조

```
index.html            앱이 시작되는 HTML
package.json          필요한 프로그램 목록과 실행 명령
vite.config.ts        빌드 설정
public/               그대로 배포되는 파일 (아이콘, 보안 헤더)
src/
  main.tsx            앱 시작점
  App.tsx             화면 주소 연결
  styles/             색, 글꼴 등 디자인 기준 (tokens.css)
  components/         여러 화면에서 같이 쓰는 부품 (ui, layout)
  features/           기능별 폴더 (home, ads, region, notifications, profile)
  lib/                환경변수 등 공용 도구
  types/              공용 타입
```

## 실행 방법 (GitHub Codespaces, 내 컴퓨터에 설치 불필요)

1. GitHub 저장소 페이지에서 초록색 **Code** 버튼 → **Codespaces** 탭 → **Create codespace on main**
2. 아래쪽 터미널에 입력하고 Enter
   ```
   npm install
   npm run dev
   ```
3. 오른쪽 아래에 뜨는 **Open in Browser** 를 누르면 앱이 열립니다.

## 확인 명령어

| 명령어 | 하는 일 |
|---|---|
| `npm run dev` | 개발용 실행 |
| `npm run typecheck` | 코드 오류 검사 |
| `npm run build` | 배포용 파일 생성 (dist 폴더) |

## 비밀정보 규칙

- `.env` 파일은 GitHub 에 올리지 않습니다. (.gitignore 에 등록됨)
- `VITE_` 로 시작하는 값은 브라우저에 공개됩니다. Supabase 의 **anon 키만** 넣고, **service_role 키는 절대 넣지 않습니다.**

## Cloudflare Pages 배포 준비

Cloudflare Pages 에서 GitHub 저장소를 연결할 때 아래 값을 입력합니다. (배포 단계에서 자세히 안내)

- Build command: `npm run build`
- Build output directory: `dist`
- 환경변수: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` (Supabase 연결 단계에서 추가)

## Android (Capacitor) 확장 계획

Android 패키징 단계에서 Capacitor 를 추가합니다. 지금 구조(React 웹앱 + dist 빌드)가 그대로 Android 앱의 화면이 되므로 구조를 바꿀 필요가 없습니다.

## 롤백 (이전 상태로 되돌리기)

버전마다 Git 태그를 남깁니다. 문제가 생기면 GitHub 의 해당 태그 시점 파일로 되돌릴 수 있습니다. (방법은 작업 보고서에서 안내)
