// 환경변수를 한 곳에서 읽습니다.
// 여기에는 브라우저에 공개되어도 되는 값(VITE_ 로 시작)만 둡니다.
const read = (value: unknown): string | undefined =>
  typeof value === 'string' && value.trim() !== '' ? value.trim() : undefined;

export const env = {
  supabaseUrl: read(import.meta.env.VITE_SUPABASE_URL),
  // Supabase 의 publishable(공개용) 키. secret 키는 절대 사용하지 않습니다.
  supabasePublishableKey: read(import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY),
  appVersion: __APP_VERSION__,
} as const;

// Supabase 연결에 필요한 값이 모두 있는지 확인합니다.
export const isSupabaseConfigured = Boolean(
  env.supabaseUrl && env.supabasePublishableKey,
);
