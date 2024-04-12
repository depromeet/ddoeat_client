'use client';

import { ReactNode } from 'react';

import ProfileIcon from 'public/assets/icon24/profile_default_24.svg';
import FeedIcon from 'public/assets/icon24/feed_24.svg';
import HomeIcon from 'public/assets/icon24/home_24.svg';
import AddFeedIcon from 'public/assets/icon24/add_feed_24.svg';

const DEFAULT_LOCATION: { lat: number; lng: number } = {
  lat: 37.498095,
  lng: 127.02761,
};
export interface NavigationItemType {
  icon: ReactNode;
  key: string;
  name: string;
  route: string;
}

let userId: string | null = null;
if (typeof window !== 'undefined') {
  userId = localStorage.getItem('userId');
}

export const NAVIGATION: NavigationItemType[] = [
  {
    icon: FeedIcon,
    key: 'feed',
    name: 'FeedPage',
    route: `/feed`,
  },
  {
    icon: HomeIcon,
    key: '',
    name: 'Home',
    route: '/',
  },
  {
    icon: AddFeedIcon,
    key: 'search',
    name: 'Search',
    route: `/search?longitude=${DEFAULT_LOCATION.lng}&latitude=${DEFAULT_LOCATION.lat}`,
  },
  {
    icon: ProfileIcon,
    key: 'profile',
    name: 'Profile',
    route: `/profile/${userId}`,
  },
];
