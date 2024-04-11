'use client';

import { ChangeEvent, RefCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import PenIcon from 'public/assets/icon24/pen_24.svg';
import ProfileEditButton from 'public/assets/icon22/profile_edit_button_22.svg';
import Tab from '@components/profile/Tab';
import { MAX_INPUT_SIZE } from '@constants/mypage';
import { useGetUserProfile } from '@hooks/api/useGetUserProfile';
import { usePutUserName } from '@hooks/api/usePutUserName';
import BookMarkContent from '@components/profile/BookMarkContent';
import FollowingButton from '@components/profile/FollowingButton';
import { useGetPresignedUrl } from '@hooks/api/useGetPresignedUrl';
import { useUploadImageToNCloud } from '@hooks/api/useUploadImageToNCloud';
import { usePutProfileImage } from '@hooks/api/usePutProfileImage';
import { usePatchFollow } from '@hooks/api/usePatchFollow';
import ProfileFeedContent from '@components/profile/ProfileFeedContent';

export default function Page() {
  const pathname = usePathname();
  const userId = Number(pathname.split('/')[2]);
  const [isInputActive, setIsInputActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { data: userProfile } = useGetUserProfile(userId);
  const { mutate: uploadImageToNCloud } = useUploadImageToNCloud();
  const { mutate: putProfileImage } = usePutProfileImage();
  const [nickName, setNickName] = useState(userProfile?.nickname);
  const [imageUrl, setImageUrl] = useState(
    '/assets/icon24/profile_none_24.svg',
  );
  const patchFollow = usePatchFollow();

  const { mutate: putUserName } = usePutUserName({
    onError: (error) => {
      if (error?.response?.status === 400) {
        toast('중복된 이름입니다.');
      }
    },
  });

  const { data: presignedUrl, refetch } = useGetPresignedUrl(
    imageUrl.split('/')[imageUrl.split('/').length - 1],
  );

  useEffect(() => {
    setNickName(userProfile?.nickname);
    setImageUrl(
      userProfile?.profileImgUrl || '/assets/icon24/profile_none_24.svg',
    );
  }, [userProfile?.nickname, userProfile?.profileImgUrl]);

  useEffect(
    function requestPresignedUrl() {
      if (imageUrl && imageUrl !== '/assets/icon24/profile_none_24.svg') {
        if (imageUrl) {
          refetch();
        }
      }
    },
    [imageUrl, refetch],
  );

  const handleUserNameClick = () => setIsInputActive(true);

  const handleInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    if (newValue.length <= MAX_INPUT_SIZE) setNickName(newValue);
  };

  const handleInputRefCallback: RefCallback<HTMLInputElement> = (input) => {
    input?.focus();
  };

  const handleInputBlur = () => {
    setIsInputActive(false);
    if (!nickName?.trim().length) setNickName(userProfile?.nickname || '');
    else putUserName(nickName || '');
  };

  const handleChangeImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = (e.target.files as FileList)[0];
    setImageUrl(URL.createObjectURL(selectedFile));

    await refetch();

    uploadImageToNCloud({
      presignedUrl: presignedUrl?.presignedUrl as string,
      file: selectedFile,
    });

    putProfileImage({
      userId: userProfile!.userId,
      profileImageUrl: presignedUrl?.presignedUrl.split('?')[0] as string,
    });
  };
  const handleProfileEditButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFollowingState = () => {
    patchFollow.mutate(userId);
  };

  return (
    <div>
      <div className="flex px-[20px] items-center  justify-between">
        <div className="flex gap-7 items-center">
          <div className="relative">
            <div className="w-20 h-20">
              <Image
                alt="Profile"
                src={imageUrl}
                layout="fill"
                className="rounded-full"
              />
              <input
                type="file"
                className="hidden"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleChangeImage}
              />
            </div>

            {userProfile?.isMine && (
              <ProfileEditButton
                className="absolute right-0 bottom-0 translate-x-[20%] translate-y-[-30%]"
                onClick={handleProfileEditButtonClick}
              />
            )}
          </div>

          <div className="flex flex-col gap-[4px]">
            <div>
              {isInputActive ? (
                <div className="flex gap-[4px]">
                  <input
                    ref={handleInputRefCallback}
                    type="text"
                    value={nickName}
                    onChange={handleInputValue}
                    onBlur={handleInputBlur}
                    className={`w-[170px] h-[29px] bg-transparent header-18 outline-none border-b-[1px] border-b-transparent focus:outline-none focus:border-b-[1px] focus:border-b-white `}
                  />
                  {userProfile?.isMine && <PenIcon />}
                </div>
              ) : (
                <div className="flex gap-[4px]">
                  <div className="flex h-[29px] header-18 gap-[4px]">
                    {userProfile?.nickname}
                  </div>
                  {userProfile?.isMine && (
                    <PenIcon onClick={handleUserNameClick} />
                  )}
                </div>
              )}
            </div>

            <div className="flex gap-[24px] body-16-bold">
              <div className="flex flex-col items-center">
                <div>{userProfile?.feedCnt || 100}</div>
                <div className="caption-10-regular">게시글</div>
              </div>
              <div className="flex flex-col items-center">
                <Link href={`/follow/${userId}?type=follower`}>
                  {userProfile?.follwerCnt || 100}
                </Link>
                <div className="caption-10-regular">팔로워</div>
              </div>
              <div className="flex flex-col items-center">
                <Link href={`/follow/${userId}?type=following`}>
                  {userProfile?.followingCnt || 100}
                </Link>
                <div className="caption-10-regular">팔로잉</div>
              </div>
            </div>
          </div>
        </div>

        {!userProfile?.isMine && (
          <FollowingButton
            onClick={handleFollowingState}
            isFollowing={userProfile?.isFollowed || false}
          />
        )}
      </div>

      <div className="w-full bg-white h-screen">
        <div className="w-full">
          <Tab.Group initialTab="mylog">
            <div className="w-full h-[76px] flex sticky top-0 bg-white z-above">
              <Tab.Header>
                <Tab.Item value="mylog">내 기록</Tab.Item>
                <Tab.Item value="bookmark">북마크</Tab.Item>
              </Tab.Header>
            </div>
            <div>
              <Tab.Content value="mylog">
                <ProfileFeedContent />
              </Tab.Content>
              <Tab.Content value="bookmark">
                <BookMarkContent />
              </Tab.Content>
            </div>
          </Tab.Group>
        </div>
      </div>
    </div>
  );
}
