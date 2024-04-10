import { HTMLAttributes } from 'react';

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
    // TO DO: 팔로우, 언팔 요청에 따른 UI 변경 적용하기
    patchFollow.mutate(userId);
  };

  return (
    <li className="flex w-full p-[16px] gap-y-[8px] border-b-2 border-gray-100 justify-between items-center mt-[35px]">
      <div className="flex items-center gap-x-[15px]">
        {profileImgUrl ? (
          <ImageContainer
            type={'profile'}
            src={profileImgUrl}
            alt={nickName}
            fill
            className="w-[59px] h-[59px] overflow-hidden"
          />
        ) : (
          <div className="w-[59px] h-[59px] bg-gray-300 rounded-full"></div>
        )}
        <div className="flex gap-x-[5px] items-center">
          <p className="body-14-extraBold">{nickName}</p>
          {!isFollowed && value == 'FOLLOWER' && (
            <span
              className="caption-12-bold text-primary-500"
              onClick={handleFollowButton}
            >
              팔로우
            </span>
          )}
        </div>
      </div>
      {value == 'FOLLOWING' && (
        <div>
          <Button
            className={`${
              !isFollowed
                ? 'bg-gray-100 active:bg-gray-100 text-black'
                : 'bg-black active:bg-black text-gray-100'
            } w-[60px] h-[34px] rounded-[20px] p-[10px] caption-12-bold`}
            onClick={handleFollowButton}
          >
            {!isFollowed ? '팔로잉' : '팔로우'}
          </Button>
        </div>
      )}
    </li>
  );
}
