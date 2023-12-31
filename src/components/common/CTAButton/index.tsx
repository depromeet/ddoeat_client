import { ButtonHTMLAttributes } from 'react';

import Button from '../Button';

import cn from '@utils/cn';

export default function CTAButton({
  children,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <Button {...props} className={cn('w-full', className)}>
      {children}
    </Button>
  );
}
