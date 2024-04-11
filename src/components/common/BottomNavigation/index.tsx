import { HTMLAttributes } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import Icon from '@components/common/Icon/index';
import cn from '@utils/cn';
import { NAVIGATION } from '@constants/navigation';

export default function BottomNavigation({
  className,
  ...restProps
}: HTMLAttributes<HTMLDivElement>) {
  const pathname = usePathname();
  const slicedPathname = pathname.slice(1).split('/')[0];

  return (
    <nav
      className={cn(
        'h-[73px] w-full flex justify-evenly items-center gap-[20px] p-[12px] fixed bottom-0 bg-white z-nav',
        className,
        { ...restProps },
      )}
    >
      {NAVIGATION.map((item) => (
        <Link key={item.key} href={item.route}>
          <div
            className={cn(
              slicedPathname === item.key ? 'fill-primary-500' : 'fill-black',
            )}
          >
            <Icon
              iconName={item.name}
              className={cn(
                slicedPathname === item.key ? 'fill-primary-500' : 'fill-black',
              )}
            />
          </div>
        </Link>
      ))}
    </nav>
  );
}
