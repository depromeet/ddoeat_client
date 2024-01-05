import { ComponentProps, ReactNode } from 'react';

import cn from '@utils/cn';

type TagSizeType = 'small' | 'large';
interface TagProps extends ComponentProps<'div'> {
  children: ReactNode;
  size: TagSizeType;
}
interface TagStylesAttributes {
  height: string;
  width: string;
  px: string;
  textFont: string;
}

const getTagAttributes = (type: TagSizeType): TagStylesAttributes => {
  switch (type) {
    case 'small':
      return {
        height: 'h-[24px]',
        width: 'w-[43px]',
        px: 'px-[8px]',
        textFont: 'caption-10-bold',
      };
    case 'large':
      return {
        height: 'h-[32px]',
        width: 'w-[53px]',
        px: 'px-[12px]',
        textFont: 'caption-12-bold',
      };
  }
};

export default function Tag({ children, className, size }: TagProps) {
  const { height, width, px, textFont } = getTagAttributes(size);
  console.log(height, width, px, textFont);
  return (
    <div
      className={cn(
        `flex justify-items items-center justify-between gap-[4px] rounded-[32px] py-[4px] ${px} ${height} ${width} ${textFont}`,
        className,
      )}
    >
      {children}
    </div>
  );
}
