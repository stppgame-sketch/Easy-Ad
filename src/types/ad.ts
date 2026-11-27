// 광고 작성자 구분: 개인 / 소상공인 / 기업
export type AdType = 'personal' | 'business' | 'company';

export type AdTypeFilter = AdType | 'all';

export type CategoryId =
  | 'food'
  | 'market'
  | 'travel'
  | 'realty'
  | 'job'
  | 'edu'
  | 'hobby'
  | 'etc';

export interface Ad {
  id: string;
  title: string;
  region: string;
  timeAgo: string;
  likes: number;
  type: AdType;
  category: CategoryId;
}
