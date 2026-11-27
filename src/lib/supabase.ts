import { createClient } from '@supabase/supabase-js';
import { env } from './env';

// Supabase 연결 도구. 연결 정보가 없으면 null 이 되어 앱이 멈추지 않습니다.
// 사용하는 곳에서는 항상 null 인지 먼저 확인합니다.
export const supabase =
  env.supabaseUrl && env.supabasePublishableKey
    ? createClient(env.supabaseUrl, env.supabasePublishableKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true,
        },
      })
    : null;
