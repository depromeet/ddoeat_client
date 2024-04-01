'use client';

import { ButtonHTMLAttributes, useEffect, useRef, useState } from 'react';

import LocationDefaultIcon from 'public/assets/icon24/loction_default_24.svg';
import cn from '@utils/cn';
import Button from '@components/common/Button';

interface CurrentLocationButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  onCurrentLocationButtonClick: () => void;
}

export default function CurrentLocationButton({
  className,
  onClick,
  onCurrentLocationButtonClick,
  ...props
}: CurrentLocationButtonProps) {
  const [isActive, setIsActive] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleOutsidePoint = (event: PointerEvent) => {
      if (!buttonRef.current?.contains(event.target as Node)) {
        setIsActive(false);
      }
    };

    window.addEventListener('pointerdown', handleOutsidePoint);

    return () => window.removeEventListener('pointerdown', handleOutsidePoint);
  }, []);

  const handleClick = (e: React.PointerEvent<HTMLButtonElement>) => {
    onClick?.(e);
    onCurrentLocationButtonClick?.();
    setIsActive(true);
  };

  return (
    <Button
      ref={buttonRef}
      {...props}
      className={cn(
        'w-[56px] h-[56px] rounded-full p-0 bg-white shadow-floating active:bg-white',
        className,
      )}
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
