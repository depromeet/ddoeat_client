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
      className={cn(
        'flex justify-between gap-[16px] w-full h-[128px] px-[24px] py-[16px]',
        className,
      )}
      {...restProps}
    >
      <CurrentLocationButton onClick={onCurrentLocationButtonClick} />
      <AddStoreButton />
      <ProfileButton />
    </div>
  );
}
