import { HTMLAttributes } from 'react';

export default function FeedDate({
  children,
}: HTMLAttributes<HTMLParagraphElement>) {
  return <p className="text-gray-500 body-16-regular">{children}</p>;
}
