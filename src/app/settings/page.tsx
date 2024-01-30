'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { SETTINGS, Setting } from '@constants/settings';
import RightArrowIcon from 'public/assets/icon24/right_arrow_24.svg';
import ArrowSquareIcon from 'public/assets/icon16/arrow_square_16.svg';
import { logout } from '@utils/auth';
import Modal from '@components/common/Modal';
import useControlModal from '@utils/useControlModal';
import cn from '@utils/cn';
import { usePostWithdraw } from '@hooks/api/usePostWithdraw';
import type { ModalProps } from 'src/types/modal';

export default function Page() {
  const { isModalShowing, handleOpenModal, handleCloseModal } =
    useControlModal();
  const [modalProps, setModalProps] = useState<Omit<ModalProps, 'isShowing'>>({
    text: '',
    subText: '',
    controls: [],
    onCancel: () => {},
  });
  const { push } = useRouter();
  const { mutate: postWithDraw } = usePostWithdraw();

  const handleClickSettingItem = (setting: Setting) => () => {
    if (setting.url) {
      push(setting.url);
    }

    if (setting.title === '로그아웃') {
      handleOpenModal();
      setModalProps({
        text: '로그아웃',
        subText: '로그아웃하시겠습니까?',
        controls: [
          {
            buttonText: '취소',
            buttonHandler: handleCloseModal,
          },
          {
            buttonText: '확인',
            buttonHandler: handleClickLogoutButton,
          },
        ],
        onCancel: handleCloseModal,
      });
    }
  };

  const handleClickLogoutButton = () => {
    logout();
  };

  const handleClickWithdrawButton = () => {
    handleOpenModal();
    setModalProps({
      text: '회원 탈퇴',
      subText:
        '회원을 탈퇴하시면 계정 정보와 기록된 정보가 삭제되어 복구가 불가합니다. 정말로 탈퇴하시겠어요?',
      controls: [
        {
          buttonText: '더 써볼래요',
          buttonHandler: handleCloseModal,
        },
        {
          buttonText: '탈퇴할래요',
          buttonHandler: postWithDraw,
        },
      ],
      onCancel: handleCloseModal,
    });
  };

  return (
    <div className="relative h-[100dvh]">
      <ul className="pt-[56px]">
        {SETTINGS.map((setting, index) => (
          <li
            key={index}
            className="flex justify-between items-center py-[8px] pl-[24px] pr-[16px] h-[56px] cursor-pointer border-b-[1px] border-gray-100"
            onClick={handleClickSettingItem(setting)}
          >
            <div className="flex gap-[4px] items-center">
              <p
                className={cn('body-16-bold', {
                  'text-gray-900': setting.title !== '로그아웃',
                  'text-primary-300': setting.title === '로그아웃',
                })}
              >
                {setting.title}
              </p>
              {setting.url && <ArrowSquareIcon />}
            </div>
            {setting.url && <RightArrowIcon />}
          </li>
        ))}
      </ul>
      <button
        className="underline underline-offset-1 text-gray-500 absolute bottom-[80px] left-[50%] -translate-x-[50%]"
        onClick={handleClickWithdrawButton}
      >
        또잇또잇 탈퇴하기
      </button>
      <Modal isShowing={isModalShowing} {...modalProps} />
    </div>
  );
}
