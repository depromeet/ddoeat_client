'use client';

import { HTMLAttributes, ReactNode, useState } from 'react';

interface BottomNaviagtionButtonProps
  extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode[];
}

export default function BottomNaviagtionButton({
  children,
  onClick,
}: BottomNaviagtionButtonProps) {
  const [isActive, setIsActive] = useState(false);

  const handleMouseEnter = () => {
    setIsActive(true);
  };

  const handleMouseLeave = () => {
    setIsActive(false);
  };

  return (
    <button
      className="flex justify-center items-center w-[56px] h-[56px] rounded-[50%] bg-bottom-navigation-button border-gray-900 border-[1px] shadow-bottom-navigation-button"
      onClick={onClick}
      type="button"
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
    >
      {isActive ? children[0] : children[1]}
    </button>
  );
}
