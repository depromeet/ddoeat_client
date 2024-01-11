'use client';

import { ButtonHTMLAttributes, useEffect, useRef, useState } from 'react';

import LocationDefaultIcon from 'public/assets/icon24/loction_default_24.svg';
import cn from '@utils/cn';
import Button from '@components/common/Button';

export default function CurrentLocationButton({
  onClick,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  const [isActive, setIsActive] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleWindowClick = (event: MouseEvent) => {
      if (!buttonRef.current?.contains(event.target as Node)) {
        setIsActive(false);
      }
    };

    window.addEventListener('click', handleWindowClick);

    return () => window.removeEventListener('click', handleWindowClick);
  }, []);

  const handleClick = (e: React.PointerEvent<HTMLButtonElement>) => {
    onClick?.(e);
    setIsActive(true);
  };

  return (
    <Button
      ref={buttonRef}
      {...props}
      className="w-[50px] h-[50px] rounded-[16px] p-0 bg-white shadow-floating active:bg-white"
      onClick={handleClick}
    >
      <LocationDefaultIcon
        className={cn({
          'fill-primary-500': isActive,
          'fill-gray-900': !isActive,
        })}
      />
    </Button>
  );
}
