'use client';

import { useRouter } from 'next/navigation';

import { SETTINGS, Setting } from '@constants/settings';
import RightArrowIcon from 'public/assets/icon24/right_arrow_24.svg';
import ArrowSquareIcon from 'public/assets/icon16/arrow_square_16.svg';
import { useLogout } from '@hooks/api/useLogout';
import Modal from '@components/common/Modal';
import useControlModal from '@utils/useControlModal';

export default function Page() {
  const { push } = useRouter();
  const { mutate: logout } = useLogout();
  const { isModalShowing, handleOpenModal, handleCloseModal } =
    useControlModal();

  const handleClickSettingItem = (setting: Setting) => () => {
    if (setting.url) {
      push(setting.url);
    }

    if (setting.title === '로그아웃') {
      handleOpenModal();
    }
  };

  const handleClickLogoutButton = () => {
    logout();
  };

  return (
    <>
      <ul className="pt-[56px]">
        {SETTINGS.map((setting, index) => (
          <li
            key={index}
            className="flex justify-between items-center py-[8px] pl-[24px] pr-[16px] h-[56px] cursor-pointer border-b-[1px] border-gray-100"
            onClick={handleClickSettingItem(setting)}
          >
            <div className="flex gap-[4px] items-center">
              <p className="body-16-bold">{setting.title}</p>
              {setting.url && <ArrowSquareIcon />}
            </div>
            {setting.url && <RightArrowIcon />}
          </li>
        ))}
      </ul>
      <Modal
        isShowing={isModalShowing}
        text="로그아웃"
        subText="로그아웃하시겠습니까?"
        controls={[
          {
            buttonText: '취소',
            buttonHandler: handleCloseModal,
          },
          {
            buttonText: '삭제',
            buttonHandler: handleClickLogoutButton,
          },
        ]}
        onCancel={handleCloseModal}
      />
    </>
  );
}
