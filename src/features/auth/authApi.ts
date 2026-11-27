import { supabase } from '../../lib/supabase';

export type SocialProvider = 'google' | 'kakao';

// 소셜 로그인을 시작합니다. 성공하면 브라우저가 구글/카카오 화면으로 이동하므로
// 이 함수는 "문제가 생겼을 때만" 오류 문구를 돌려줍니다.
export async function signInWithSocial(
  provider: SocialProvider,
): Promise<string | null> {
  if (!supabase) return '서버 연결 정보가 없어서 로그인할 수 없어요.';

  const { error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      // 로그인이 끝나면 마이 화면으로 돌아옵니다.
      redirectTo: `${window.location.origin}/my`,
      // 카카오: 이메일(account_email)은 비즈앱만 받을 수 있어서 닉네임·프로필 사진만 요청합니다.
      ...(provider === 'kakao' ? { scopes: 'profile_nickname profile_image' } : {}),
    },
  });

  return error ? error.message : null;
}

export async function signOut(): Promise<void> {
  if (!supabase) return;
  await supabase.auth.signOut();
}
