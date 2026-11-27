import type { AdType, AdTypeFilter } from '../../types/ad';

export const AD_TYPE_LABELS: Record<AdType, string> = {
  personal: '개인',
  business: '소상공인',
  company: '기업',
};

export const AD_TYPE_TABS: { id: AdTypeFilter; label: string }[] = [
  { id: 'all', label: '전체' },
  { id: 'personal', label: AD_TYPE_LABELS.personal },
  { id: 'business', label: AD_TYPE_LABELS.business },
  { id: 'company', label: AD_TYPE_LABELS.company },
];
