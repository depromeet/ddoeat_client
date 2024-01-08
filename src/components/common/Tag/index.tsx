import { HTMLAttributes } from 'react';

import cn from '@utils/cn';

type TagSizeType = 'small' | 'large';

interface TagProps extends HTMLAttributes<HTMLDivElement> {
  size: TagSizeType;
}

const tagStyleAttributes = {
  small: 'h-[24px] px-[8px] caption-10-bold',
  large: 'h-[32px] px-[12px] caption-12-bold',
};

export default function Tag({
  children,
  className,
  size,
  ...restProps
}: TagProps) {
  const tagStyles = tagStyleAttributes[size];

  return (
    <div
      className={cn(
        `inline-flex justify-items items-center justify-between gap-[4px] rounded-[32px] py-[4px] ${tagStyles}`,
        className,
      )}
      {...restProps}
    >
      {children}
    </div>
  );
}
