import { AD_TYPE_TABS } from '../../ads/constants';
import type { AdTypeFilter } from '../../../types/ad';
import styles from './AdTypeTabs.module.css';

interface AdTypeTabsProps {
  value: AdTypeFilter;
  onChange: (value: AdTypeFilter) => void;
}

// 전체 / 개인 / 소상공인 / 기업 탭
export default function AdTypeTabs({ value, onChange }: AdTypeTabsProps) {
  return (
    <div className={styles.tabs} role="tablist" aria-label="광고 종류">
      {AD_TYPE_TABS.map((tab) => (
        <button
          key={tab.id}
          type="button"
          role="tab"
          aria-selected={value === tab.id}
          className={styles.tab}
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
