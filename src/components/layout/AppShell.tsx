import { Outlet } from 'react-router-dom';
import BottomNav from './BottomNav';
import styles from './AppShell.module.css';

// 모든 화면의 공통 틀: 가운데 정렬된 모바일 화면 + 하단 메뉴
export default function AppShell() {
  return (
    <div className={styles.app}>
      <div className={styles.frame}>
        <main className={styles.main}>
          <Outlet />
        </main>
        <BottomNav />
      </div>
    </div>
  );
}
