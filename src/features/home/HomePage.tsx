import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import AdCard from './components/AdCard';
import AdTypeTabs from './components/AdTypeTabs';
import CategoryGrid from './components/CategoryGrid';
import HeroBanner from './components/HeroBanner';
import HomeHeader from './components/HomeHeader';
import { SAMPLE_ADS } from './data/sampleAds';
import type { AdTypeFilter, CategoryId } from '../../types/ad';
import styles from './HomePage.module.css';

export default function HomePage() {
  const [type, setType] = useState<AdTypeFilter>('all');
  const [category, setCategory] = useState<CategoryId | null>(null);

  const ads = useMemo(
    () =>
      SAMPLE_ADS.filter(
        (ad) =>
          (type === 'all' || ad.type === type) &&
          (category === null || ad.category === category),
      ),
    [type, category],
  );

  return (
    <>
      <HomeHeader />
      <AdTypeTabs value={type} onChange={setType} />
      <HeroBanner />
      <CategoryGrid value={category} onChange={setCategory} />

      <section className={styles.list} aria-label="광고 목록">
        <div className={styles.listHead}>
          <h2 className={styles.listTitle}>우리 동네 광고</h2>
          <span className={styles.sample}>샘플 화면이에요</span>
        </div>

        {ads.length > 0 ? (
          <div className={styles.cards}>
            {ads.map((ad) => (
              <AdCard key={ad.id} ad={ad} />
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <p>이 조건에 맞는 광고가 아직 없어요.</p>
            <Link to="/write" className={styles.emptyCta}>
              첫 광고 올리기
            </Link>
          </div>
        )}
      </section>
    </>
  );
}
