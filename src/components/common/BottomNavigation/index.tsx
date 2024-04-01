import { HTMLAttributes } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import Icon from '@components/common/Icon/index';
import cn from '@utils/cn';
import { NAVIGATION } from '@constants/navigation';
import { useGetUserProfile } from '@hooks/api/useGetUserProfile';

export default function BottomNavigation({
  className,
  ...restProps
}: HTMLAttributes<HTMLDivElement>) {
  const currentPath = usePathname();
  const { data: userProfile } = useGetUserProfile();

  return (
    <nav
      className={cn(
        'h-[73px] w-full flex justify-evenly items-center gap-[20px] p-[12px]',
        className,
        { ...restProps },
      )}
    >
      {NAVIGATION.map((item) => (
        <Link
          key={item.key}
          href={
            userProfile?.userId ? `/profile?${userProfile.userId}` : item.route
          }
        >
          <div
            className={cn(
              item.key === currentPath ? 'fill-primary-500' : 'fill-black',
            )}
          >
            <Icon
              iconName={item.name}
              className={cn(
                item.key === currentPath ? 'fill-primary-500' : 'fill-black',
              )}
            />
          </div>
        </Link>
      ))}
    </nav>
  );
}
