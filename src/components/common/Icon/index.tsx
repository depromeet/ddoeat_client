import ProfileIcon from 'public/assets/icon24/profile_default_24.svg';
import FeedIcon from 'public/assets/icon24/feed_24.svg';
import HomeIcon from 'public/assets/icon24/home_24.svg';
import AddFeedIcon from 'public/assets/icon24/add_feed_24.svg';
import cn from '@utils/cn';

interface IconProps {
  iconName: string;
  className: string;
}

export default function Icon({ iconName }: IconProps) {
  const iconComponent = (() => {
    switch (iconName) {
      case 'Profile':
        return <ProfileIcon className={cn()} />;
      case 'FeedPage':
        return <FeedIcon className={cn()} />;
      case 'Home':
        return <HomeIcon className={cn()} />;
      case 'Search':
        return <AddFeedIcon className={cn()} />;
      default:
        return null;
    }
  })();

  return <>{iconComponent}</>;
}
