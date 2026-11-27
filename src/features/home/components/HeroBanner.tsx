import { Link } from 'react-router-dom';
import Mascot from '../../../components/ui/Mascot';
import styles from './HeroBanner.module.css';

// 홈 맨 위 배너: 광고 등록으로 이어지는 큰 안내
export default function HeroBanner() {
  return (
    <section className={styles.hero} aria-label="모두의 광고 소개">
      <div className={styles.copy}>
        <h1 className={styles.title}>우리 동네 이야기,
          <br />광고로 시작해요</h1>
        <p className={styles.sub}>누구나 무료로 올릴 수 있어요</p>
        <Link to="/write" className={styles.cta}>
          광고 올리기
        </Link>
      </div>
      <div className={styles.mascot}>
        <Mascot size={104} />
      </div>
    </section>
  );
}
