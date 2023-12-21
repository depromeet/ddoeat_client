'use client';

import { useGetPost } from '@hooks/useGetPost';

//NOTE: 예시 컴포넌트이므로 추후 파일삭제 필요
export default function PostItem() {
  const { data } = useGetPost(1);
  return <div>{data?.title}</div>;
}
