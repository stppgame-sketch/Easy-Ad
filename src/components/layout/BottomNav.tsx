import { NavLink } from 'react-router-dom';
import Icon from '../ui/Icon';
import type { IconName } from '../ui/Icon';
import styles from './BottomNav.module.css';

interface NavItem {
  to: string;
  label: string;
  icon: IconName;
  end?: boolean;
}

const LEFT_ITEMS: NavItem[] = [
  { to: '/', label: '홈', icon: 'home', end: true },
  { to: '/region', label: '지역', icon: 'pin' },
];

const RIGHT_ITEMS: NavItem[] = [
  { to: '/alerts', label: '알림', icon: 'bell' },
  { to: '/my', label: '마이', icon: 'user' },
];

function Item({ to, label, icon, end }: NavItem) {
  return (
    <NavLink to={to} end={end} className={styles.item}>
      <Icon name={icon} size={24} />
      <span>{label}</span>
    </NavLink>
  );
}

// 하단 메뉴: 홈 · 지역 · (광고 등록) · 알림 · 마이
export default function BottomNav() {
  return (
    <nav className={styles.nav} aria-label="주 메뉴">
      {LEFT_ITEMS.map((item) => (
        <Item key={item.to} {...item} />
      ))}
      <NavLink to="/write" className={styles.write} aria-label="광고 등록">
        <Icon name="plus" size={28} strokeWidth={2.6} />
      </NavLink>
      {RIGHT_ITEMS.map((item) => (
        <Item key={item.to} {...item} />
      ))}
    </nav>
  );
}
