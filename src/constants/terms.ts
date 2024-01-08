// TODO: description 타입 변경, 확정 시 추가
interface Terms {
  id: string;
  title: string;
  description: string;
  required: boolean;
}

export const TERMS: Terms[] = [
  {
    id: '이용약관',
    title: '또잇또잇 이용약관 (필수)',
    description: '',
    required: true,
  },
  {
    id: '위치정보',
    title: '위치정보 이용약관 동의 (필수)',
    description: '',
    required: true,
  },
  {
    id: '정보제공',
    title: '제 3자 정보제공 동의',
    description: '',
    required: false,
  },
];
