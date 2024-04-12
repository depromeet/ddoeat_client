import { HTMLAttributes } from 'react';
import { useRouter } from 'next/navigation';

import ImageContainer from '@components/common/ImageContainer';
import Button from '@components/common/Button';
import { usePatchFollow } from '@hooks/api/usePatchFollow';

type ValueType = 'FOLLOWER' | 'FOLLOWING';

interface FollowerListProps extends HTMLAttributes<HTMLLIElement> {
  userId: number;
  value: ValueType;
  profileImgUrl: string;
  nickName: string;
  isFollowed: boolean;
}

export default function FollowerList({
  userId,
  value,
  profileImgUrl,
  nickName,
  isFollowed,
}: FollowerListProps) {
  const patchFollow = usePatchFollow();
  const handleFollowButton = () => {
    patchFollow.mutate(userId);
  };

  const router = useRouter();
  const handleProfileNavigate = () => {
    router.push(`/profile/${userId}`);
  };

  return (
    <li className="flex w-full p-[16px] gap-y-[8px] border-b-2 border-gray-100 justify-between items-center">
      <div className="flex items-center gap-x-[15px]">
        <div onClick={handleProfileNavigate}>
          {profileImgUrl ? (
            <ImageContainer
              type={'profile'}
              src={profileImgUrl}
              alt={nickName}
              fill
              className="w-[59px] h-[59px] overflow-hidden"
            />
          ) : (
            // TO DO : null일 때 기본 svg 사용하기
            <div className="w-[59px] h-[59px] bg-gray-300 rounded-full"></div>
          )}
        </div>
        <div className="flex gap-x-[15px] justify-center items-center">
          <p className="body-14-extraBold">{nickName}</p>
          {!isFollowed && value == 'FOLLOWER' && (
            <p
              className="caption-12-bold text-primary-500"
              onClick={handleFollowButton}
            >
              팔로우
            </p>
          )}
        </div>
      </div>
      {value == 'FOLLOWING' && (
        <div>
          <Button
            className={`${
              isFollowed
                ? 'bg-gray-100 active:bg-gray-100 text-black'
                : 'bg-black active:bg-black text-gray-100'
            } w-[80px] h-[34px] rounded-[20px] p-[10px] caption-12-bold`}
            onClick={handleFollowButton}
          >
            {isFollowed ? '팔로잉' : '팔로우'}
          </Button>
        </div>
      )}
    </li>
  );
}
