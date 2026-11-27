import { Link } from 'react-router-dom';
import Icon from './Icon';
import type { IconName } from './Icon';
import styles from './PlaceholderPage.module.css';

interface PlaceholderPageProps {
  title: string;
  description: string;
  icon: IconName;
}

// 아직 만들지 않은 화면에서 보여주는 안내 화면입니다.
export default function PlaceholderPage({
  title,
  description,
  icon,
}: PlaceholderPageProps) {
  return (
    <section className={styles.page}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.card}>
        <span className={styles.badge}>
          <Icon name={icon} size={30} />
        </span>
        <p className={styles.text}>{description}</p>
        <Link to="/" className={styles.back}>
          홈으로 돌아가기
        </Link>
      </div>
    </section>
  );
}
