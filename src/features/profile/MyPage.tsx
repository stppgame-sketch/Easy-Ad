import { Link } from 'react-router-dom';
import Mascot from '../../components/ui/Mascot';
import { env } from '../../lib/env';
import { useAuth } from '../auth/AuthContext';
import ConnectionCheck from './ConnectionCheck';
import ProfileCard from './ProfileCard';
import styles from './MyPage.module.css';

export default function MyPage() {
  const { user, loading } = useAuth();

  return (
    <>
      <section className={styles.page}>
        <h1 className={styles.title}>마이</h1>

        {loading ? (
          <p className={styles.guestText}>로그인 상태를 확인하고 있어요…</p>
        ) : user ? (
          <ProfileCard user={user} />
        ) : (
          <div className={styles.guest}>
            <Mascot size={88} />
            <p className={styles.guestText}>
              로그인하면 광고를 올리고
              <br />
              포인트를 모을 수 있어요.
            </p>
            <Link to="/login" className={styles.loginLink}>
              로그인하기
            </Link>
          </div>
        )}
      </section>

      <ConnectionCheck />
      <p className={styles.version}>앱 버전 {env.appVersion}</p>
    </>
  );
}
