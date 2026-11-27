import type { IconName } from '../../../components/ui/Icon';
import type { CategoryId } from '../../../types/ad';

export interface Category {
  id: CategoryId;
  label: string;
  icon: IconName;
  tone: string; // tokens.css 의 색 변수 이름
}

export const CATEGORIES: Category[] = [
  { id: 'food', label: '맛집', icon: 'utensils', tone: '--peach-100' },
  { id: 'market', label: '생활·중고', icon: 'bag', tone: '--sky-100' },
  { id: 'travel', label: '여행', icon: 'plane', tone: '--mint-100' },
  { id: 'realty', label: '부동산', icon: 'building', tone: '--yellow-100' },
  { id: 'job', label: '알바', icon: 'briefcase', tone: '--peach-100' },
  { id: 'edu', label: '교육', icon: 'book', tone: '--lavender-100' },
  { id: 'hobby', label: '취미', icon: 'smile', tone: '--pink-100' },
  { id: 'etc', label: '기타', icon: 'dots', tone: '--lavender-100' },
];

export const getCategory = (id: CategoryId): Category =>
  CATEGORIES.find((category) => category.id === id) ?? CATEGORIES[CATEGORIES.length - 1];
