'use client';

import { usePathname } from 'next/navigation';

import FollowerList from '@components/following/FollowerList';
import Tab from '@components/mypage/Tab';
import { useGetFollowingList } from '@hooks/api/useGetFollowingList';

export default function Page() {
  const pathname = usePathname();
  const userId = Number(pathname.split('/').pop());

  const { data: followerList } = useGetFollowingList(userId, 'FOLLOWER');
  const { data: followingList } = useGetFollowingList(userId, 'FOLLOWER');

  console.log('di', followingList);

  return (
    <div>
      <Tab.Group initialTab="follower">
        <div className="h-[76px] w-full flex sticky top-[40px] bg-white z-above rounded-t-[24px]">
          <Tab.Header>
            <Tab.Item value="follower" className="w-[1/2] my-[10px]">
              팔로워
            </Tab.Item>
            <Tab.Item value="following" className="w-[1/2] my-[10px]">
              팔로잉
            </Tab.Item>
          </Tab.Header>
        </div>
        <div>
          <Tab.Content value="follower">
            {followerList &&
              followerList.data.map((item) => (
                <FollowerList
                  key={item.userId}
                  userId={item.userId}
                  profileImgUrl={item.profileImgUrl}
                  nickName={item.nickname}
                  isFollowed={item.isFollowed}
                  value={'FOLLOWER'}
                />
              ))}
          </Tab.Content>
          <Tab.Content value="following">
            {followingList &&
              followingList.data.map((item) => (
                <FollowerList
                  key={item.userId}
                  userId={item.userId}
                  profileImgUrl={item.profileImgUrl}
                  nickName={item.nickname}
                  isFollowed={item.isFollowed}
                  value={'FOLLOWING'}
                />
              ))}
          </Tab.Content>
        </div>
      </Tab.Group>
    </div>
  );
}
