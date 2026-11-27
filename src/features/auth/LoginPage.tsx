import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Mascot from '../../components/ui/Mascot';
import { isSupabaseConfigured } from '../../lib/env';
import { useAuth } from './AuthContext';
import { signInWithSocial } from './authApi';
import type { SocialProvider } from './authApi';
import styles from './LoginPage.module.css';

export default function LoginPage() {
  const { user, loading } = useAuth();
  const [pending, setPending] = useState<SocialProvider | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  // 이미 로그인한 상태라면 마이 화면으로 보냅니다.
  if (!loading && user) return <Navigate to="/my" replace />;

  async function handleLogin(provider: SocialProvider) {
    setMessage(null);
    setPending(provider);
    const error = await signInWithSocial(provider);
    // 성공하면 페이지가 이동하므로 여기까지 오는 것은 오류가 났을 때입니다.
    if (error) {
      setMessage(error);
      setPending(null);
    }
  }

  const disabled = pending !== null || !isSupabaseConfigured;

  return (
    <div className={styles.page}>
      <div className={styles.frame}>
        <Link to="/" className={styles.close} aria-label="홈으로">
          ✕
        </Link>

        <div className={styles.hero}>
          <Mascot size={120} />
          <h1 className={styles.title}>모두의 광고</h1>
          <p className={styles.sub}>
            누구나, 무엇이든,
            <br />
            무료로 광고하는 세상!
          </p>
        </div>

        <div className={styles.buttons}>
          <button
            type="button"
            className={`${styles.button} ${styles.kakao}`}
            onClick={() => handleLogin('kakao')}
            disabled={disabled}
          >
            {pending === 'kakao' ? '이동 중…' : '카카오로 시작하기'}
          </button>
          <button
            type="button"
            className={`${styles.button} ${styles.google}`}
            onClick={() => handleLogin('google')}
            disabled={disabled}
          >
            {pending === 'google' ? '이동 중…' : '구글로 시작하기'}
          </button>
        </div>

        {message && <p className={styles.error}>{message}</p>}
        {!isSupabaseConfigured && (
          <p className={styles.error}>서버 연결 정보가 아직 없어요.</p>
        )}
        <p className={styles.note}>지금은 테스트 중인 서비스예요.</p>
      </div>
    </div>
  );
}
