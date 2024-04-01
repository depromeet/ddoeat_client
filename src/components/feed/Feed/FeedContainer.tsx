import { HTMLAttributes } from 'react';

export default function FeedContainer({
  children,
}: HTMLAttributes<HTMLDivElement>) {
  return <div className="flex flex-col gap-[12px] px-[16px]">{children}</div>;
}
