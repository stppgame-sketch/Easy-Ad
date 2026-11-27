import Icon from '../../../components/ui/Icon';
import { AD_TYPE_LABELS } from '../../ads/constants';
import { getCategory } from '../data/categories';
import type { Ad } from '../../../types/ad';
import styles from './AdCard.module.css';

interface AdCardProps {
  ad: Ad;
}

// 광고 목록의 카드 한 장
export default function AdCard({ ad }: AdCardProps) {
  const category = getCategory(ad.category);
  return (
    <article className={styles.card}>
      <div
        className={styles.thumb}
        style={{ background: `var(${category.tone})` }}
      >
        <Icon name={category.icon} size={30} />
      </div>
      <div className={styles.body}>
        <h3 className={styles.title}>{ad.title}</h3>
        <p className={styles.meta}>
          <span>{ad.region}</span>
          <span className={styles.time}>{ad.timeAgo}</span>
        </p>
        <div className={styles.foot}>
          <span className={styles.badge}>{AD_TYPE_LABELS[ad.type]}</span>
          <span className={styles.likes}>
            <Icon name="heart" size={14} />
            {ad.likes}
          </span>
        </div>
      </div>
    </article>
  );
}
