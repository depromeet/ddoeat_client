import { ButtonHTMLAttributes } from 'react';

import CTAButton from '../CTAButton';

import cn from '@utils/cn';

export default function index({
  children,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <div
      className={cn(
        'bg-transparent px-[16px] pt-[24px] pb-[32px] fixed bottom-0 left-[50%] -translate-x-[50%] w-full max-w-[480px] z-fixedBody',
        className,
      )}
    >
      <CTAButton {...props}>{children}</CTAButton>
    </div>
  );
}
