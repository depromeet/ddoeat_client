'use client';

import { useGetFeedList } from '@hooks/api/useGetFeedList';

export default function Page() {
  const { data } = useGetFeedList();
  console.log(data);
  return <div>page</div>;
}
