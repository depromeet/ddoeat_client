import { HTMLAttributes } from 'react';

export default function FeedDescription({
  children,
}: HTMLAttributes<HTMLParagraphElement>) {
  return <p className="body-14-regular">{children}</p>;
}
