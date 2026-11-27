import Icon from '../../../components/ui/Icon';
import { CATEGORIES } from '../data/categories';
import type { CategoryId } from '../../../types/ad';
import styles from './CategoryGrid.module.css';

interface CategoryGridProps {
  value: CategoryId | null;
  onChange: (value: CategoryId | null) => void;
}

// 카테고리 8개. 같은 것을 한 번 더 누르면 선택이 풀립니다.
export default function CategoryGrid({ value, onChange }: CategoryGridProps) {
  return (
    <div className={styles.grid}>
      {CATEGORIES.map((category) => {
        const selected = value === category.id;
        return (
          <button
            key={category.id}
            type="button"
            className={styles.item}
            aria-pressed={selected}
            onClick={() => onChange(selected ? null : category.id)}
          >
            <span
              className={styles.icon}
              style={{ background: `var(${category.tone})` }}
            >
              <Icon name={category.icon} size={24} />
            </span>
            <span className={styles.label}>{category.label}</span>
          </button>
        );
      })}
    </div>
  );
}
