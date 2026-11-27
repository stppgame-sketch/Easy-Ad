import { Link } from 'react-router-dom';
import Icon from '../../../components/ui/Icon';
import styles from './HomeHeader.module.css';

// 상단 영역: 지역 선택(다음 단계에서 연결) + 검색 + 알림
export default function HomeHeader() {
  return (
    <header className={styles.header}>
      <Link to="/region" className={styles.region} aria-label="지역 선택">
        <Icon name="pin" size={20} />
        <span className={styles.regionName}>서울시 강남구</span>
        <Icon name="chevronDown" size={18} />
      </Link>
      <div className={styles.actions}>
        <button
          type="button"
          className={styles.iconButton}
          aria-label="검색 (준비 중)"
          disabled
        >
          <Icon name="search" size={22} />
        </button>
        <Link to="/alerts" className={styles.iconButton} aria-label="알림">
          <Icon name="bell" size={22} />
        </Link>
      </div>
    </header>
  );
}
