export interface Setting {
  url?: string;
  title: string;
}

export const SETTINGS: Setting[] = [
  {
    url: '/service-terms',
    title: '이용약관',
  },
  {
    url: '/privacy-policy',
    title: '개인정보처리방침',
  },
  {
    url: '/location-terms',
    title: '위치기반 서비스 이용약관',
  },
  {
    title: '로그아웃',
  },
  {
    title: '회원탈퇴',
  },
];
