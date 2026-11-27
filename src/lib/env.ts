// 환경변수(.env)를 한 곳에서 읽습니다.
// 여기에는 브라우저에 공개되어도 되는 값(VITE_ 로 시작)만 둡니다.
const read = (value: unknown): string | undefined =>
  typeof value === 'string' && value.trim() !== '' ? value.trim() : undefined;

export const env = {
  supabaseUrl: read(import.meta.env.VITE_SUPABASE_URL),
  supabaseAnonKey: read(import.meta.env.VITE_SUPABASE_ANON_KEY),
  appVersion: __APP_VERSION__,
} as const;

// Supabase 연결에 필요한 값이 모두 있는지 확인합니다. (다음 단계에서 사용)
export const isSupabaseConfigured = Boolean(
  env.supabaseUrl && env.supabaseAnonKey,
);
