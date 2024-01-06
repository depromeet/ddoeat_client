import { ButtonHTMLAttributes } from 'react';

import CTAButton from '@components/common/CTAButton';
import cn from '@utils/cn';

export default function NavigationButton({
  children,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <div
      className={cn(
        'w-full px-[16px] pt-[24px] pb-[32px] bg-white-gradient',
        className,
      )}
    >
      <CTAButton {...props}>{children}</CTAButton>
    </div>
  );
}
