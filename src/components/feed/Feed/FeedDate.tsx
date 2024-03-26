import { HTMLAttributes } from 'react';

import cn from '@utils/cn';

export default function FeedDate({
  children,
  className,
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn('text-gray-500 body-16-bold', className)}>{children}</p>
  );
}
