'use client';

import { useGetPost } from '@common/hooks/useGetPost';

export default function PostItem() {
  const { data } = useGetPost(1);
  return <div>{data?.title}</div>;
}
