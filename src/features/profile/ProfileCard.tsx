import { useEffect, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import Mascot from '../../components/ui/Mascot';
import { signOut } from '../auth/authApi';
import { supabase } from '../../lib/supabase';
import styles from './ProfileCard.module.css';

interface ProfileCardProps {
  user: User;
}

const PROVIDER_LABELS: Record<string, string> = {
  google: '구글',
  kakao: '카카오',
};

// 로그인한 사용자의 간단한 프로필 카드 (닉네임 수정은 다음 단계에서 추가)
export default function ProfileCard({ user }: ProfileCardProps) {
  const [nickname, setNickname] = useState<string | null>(null);
  const userId = user.id;

  useEffect(() => {
    if (!supabase) return;
    let active = true;
    supabase
      .from('profiles')
      .select('nickname')
      .eq('id', userId)
      .maybeSingle()
      .then(({ data }) => {
        if (active) setNickname(data?.nickname ?? null);
      });
    return () => {
      active = false;
    };
  }, [userId]);

  const provider = String(user.app_metadata?.provider ?? '');

  return (
    <section className={styles.card} aria-label="내 프로필">
      <Mascot size={88} />
      <p className={styles.nickname}>{nickname ?? '불러오는 중…'}</p>
      <p className={styles.provider}>
        {PROVIDER_LABELS[provider] ?? '소셜'} 계정으로 로그인했어요
      </p>
      <button type="button" className={styles.logout} onClick={() => signOut()}>
        로그아웃
      </button>
    </section>
  );
}
