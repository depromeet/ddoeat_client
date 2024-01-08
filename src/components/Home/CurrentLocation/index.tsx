'use client';

import { ButtonHTMLAttributes, useEffect, useRef, useState } from 'react';

import LocationDefaultIcon from 'public/assets/icon24/loction_default_24.svg';
import cn from '@utils/cn';

export default function CurrentLocation({
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

  const handleClick = () => {
    setIsActive(true);
  };

  return (
    <button
      ref={buttonRef}
      {...props}
      className="w-[50px] h-[50px] rounded-[16px] p-0 bg-white shadow-floating active:bg-white flex items-center justify-center"
      onClick={handleClick}
    >
      <LocationDefaultIcon
        className={cn({
          'fill-primary-500': isActive,
          'fill-gray-900': !isActive,
        })}
      />
    </button>
  );
}
