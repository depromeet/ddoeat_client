'use client';

import { useRouter } from 'next/navigation';
import { ChangeEvent, RefCallback, useEffect, useState } from 'react';

import Header from '@components/common/Header';
import SettingIcon from 'public/assets/icon24/setting_24.svg';
import PenIcon from 'public/assets/icon24/pen_24.svg';
import Tab from '@components/mypage/Tab';
import {
  DDOBAP_LEVEL_IMAGE,
  DEFAULT_DDOBAP_LEVEL,
  MAX_INPUT_SIZE,
} from '@constants/mypage';
import { useGetUserProfile } from '@hooks/api/useGetUserProfile';
import { usePutUserName } from '@hooks/api/usePutUserName';
import MyLogContent from '@components/mypage/MyLogContent';
import BookMarkContent from '@components/mypage/BookMarkContent';

export default function Page() {
  const router = useRouter();
  const [nickName, setNickName] = useState<string | undefined>('');
  const [isInputActive, setIsInputActive] = useState(false);

  const { data: userProfile } = useGetUserProfile();
  const { mutate: putUserName } = usePutUserName();

  const userLevel = userProfile?.level || DEFAULT_DDOBAP_LEVEL;
  const StatusImage = DDOBAP_LEVEL_IMAGE[userLevel];

  // TODO: 설정 페이지로 이동하기
  const handleSettingButtonClick = () => router.push('/setting');

  useEffect(() => {
    const userNickName = userProfile?.nickname;
    setNickName(userNickName);
  }, [userProfile]);

  const handleUserNameClick = () => setIsInputActive(true);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    if (newValue.length <= MAX_INPUT_SIZE) setNickName(newValue);
  };

  const handleInputRefCallback: RefCallback<HTMLInputElement> = (input) => {
    input?.focus();
  };

  const handleInputBlur = () => {
    setIsInputActive(false);
    if (nickName?.trim.length) setNickName(userProfile?.nickname);
    else putUserName(nickName || '');
  };

  return (
    <div>
      <Header className=" [&>*>*]:fill-white justify-between">
        <SettingIcon onClick={handleSettingButtonClick} />
      </Header>

      <div className="h-[164px] flex justify-between items-end px-[32px]">
        <div className="flex flex-col">
          <div className="text-white body-16-bold">{userLevel}</div>
          <div className={`flex pb-[32px]`}>
            <div className="flex">
              {isInputActive ? (
                <input
                  ref={handleInputRefCallback}
                  type="text"
                  value={nickName}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  className={`w-[170px] h-[29px] bg-transparent text-white header-22 outline-none border-b-[1px] border-b-transparent focus:outline-none focus:border-b-[1px] focus:border-b-white `}
                />
              ) : (
                <button
                  className="flex h-[29px] text-white header-22 gap-[4px]"
                  onClick={handleUserNameClick}
                >
                  {userProfile?.nickname}
                </button>
              )}
              <PenIcon />
            </div>
          </div>
        </div>
        <div>
          <StatusImage className="z-above translate-y-[8px]" />
        </div>
      </div>

      <div className="w-full h-full bg-white rounded-t-[24px]">
        <Tab.Group initialTab="mylog">
          <div className="h-[76px] flex px-[24px]">
            <Tab.Header>
              <Tab.Item value="mylog">내 로그</Tab.Item>
              <Tab.Item value="bookmark">북마크</Tab.Item>
            </Tab.Header>
          </div>
          <div>
            <Tab.Content value="mylog">
              <MyLogContent />
            </Tab.Content>
            <Tab.Content value="bookmark">
              <BookMarkContent />
            </Tab.Content>
          </div>
        </Tab.Group>
      </div>
    </div>
  );
}
