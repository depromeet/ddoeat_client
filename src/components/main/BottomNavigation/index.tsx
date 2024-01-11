import { HTMLAttributes } from 'react';

import AddStoreButton from '../AddStoreButton';
import CurrentLocationButton from '../CurrentLocationButton';

import ProfileButton from '@components/main/ProfileButton';
import cn from '@utils/cn';

interface BottomNavigationProps extends HTMLAttributes<HTMLDivElement> {
  onCurrentLocationButtonClick: () => void;
}

export default function BottomNavigation({
  onCurrentLocationButtonClick,
  className,
  ...restProps
}: BottomNavigationProps) {
  return (
    <div
      className={cn('flex justify-center gap-[16px] w-full', className)}
      {...restProps}
    >
      <CurrentLocationButton onClick={onCurrentLocationButtonClick} />
      <AddStoreButton />
      <ProfileButton />
    </div>
  );
}
