import { ReactNode } from 'react';

import ProfileIcon from 'public/assets/icon24/profile_default_24.svg';
import FeedIcon from 'public/assets/icon24/feed_24.svg';
import HomeIcon from 'public/assets/icon24/home_24.svg';
import AddFeedIcon from 'public/assets/icon24/add_feed_24.svg';

export interface NavigationItemType {
  icon: ReactNode;
  key: string;
  name: string;
  route: string;
}

export const NAVIGATION: NavigationItemType[] = [
  {
    icon: FeedIcon,
    key: '/feed',
    name: 'FeedPage',
    route: '/feed',
  },

  {
    icon: HomeIcon,
    key: '/',
    name: 'Home',
    route: '/',
  },
  {
    icon: AddFeedIcon,
    key: '/search',
    name: 'Search',
    route: '/search',
  },
  {
    icon: ProfileIcon,
    key: '/mypage',
    name: 'MyPage',
    route: '/mypage',
  },
];
