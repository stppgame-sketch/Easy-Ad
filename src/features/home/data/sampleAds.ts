import type { Ad } from '../../../types/ad';

// 화면 모양을 확인하기 위한 "샘플" 광고입니다. 광고 등록 기능을 만들 때 실제 데이터로 교체합니다.
export const SAMPLE_ADS: Ad[] = [
  { id: 's1', title: '역삼동 수제 돈가스, 신메뉴 출시했어요', region: '강남구 역삼동', timeAgo: '2시간 전', likes: 126, type: 'business', category: 'food' },
  { id: 's2', title: '서초 신축 원룸 월세, 보증금 협의 가능', region: '서초구 서초동', timeAgo: '3시간 전', likes: 87, type: 'personal', category: 'realty' },
  { id: 's3', title: '주말 카페 아르바이트 함께할 분 찾아요', region: '강남구 논현동', timeAgo: '5시간 전', likes: 42, type: 'business', category: 'job' },
  { id: 's4', title: '초등 영어 소그룹 수업, 이번 달 신규 모집', region: '송파구 잠실동', timeAgo: '어제', likes: 64, type: 'personal', category: 'edu' },
  { id: 's5', title: '봄맞이 제주 2박 3일 패키지 얼리버드', region: '서울 전체', timeAgo: '어제', likes: 205, type: 'company', category: 'travel' },
  { id: 's6', title: '거의 새것 전기자전거 판매합니다', region: '강남구 대치동', timeAgo: '2일 전', likes: 31, type: 'personal', category: 'market' },
  { id: 's7', title: '주말 러닝 크루 신입 멤버 모집', region: '서초구 반포동', timeAgo: '2일 전', likes: 58, type: 'personal', category: 'hobby' },
  { id: 's8', title: '강남점 오픈 기념 전 메뉴 20% 할인', region: '강남구 삼성동', timeAgo: '3일 전', likes: 173, type: 'company', category: 'food' },
];
