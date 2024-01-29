import Modal from '../Modal';

import TrashIcon from 'public/assets/icon24/trash_24.svg';
import useControlModal from '@utils/useControlModal';

interface TrashButtonProps {
  onClick?: () => void;
}

export default function DeleteTrashButton({ onClick }: TrashButtonProps) {
  const { isModalShowing, handleOpenModal, handleCloseModal } =
    useControlModal();

  const handleClickDeleteButton = () => {
    handleOpenModal();
  };

  const handleDeleteConfirm = () => {
    onClick?.();
    handleCloseModal();
  };

  return (
    <>
      <div onClick={handleClickDeleteButton}>
        <TrashIcon />
      </div>
      <Modal
        isShowing={isModalShowing}
        text="정말 기록을 삭제할까요?"
        subText="기록 삭제시 복구가 불가능하고, 등록된 가게 정보가 사라질 수 있어요."
        controls={[
          {
            buttonText: '취소',
            buttonHandler: handleCloseModal,
          },
          {
            buttonText: '삭제',
            buttonHandler: handleDeleteConfirm,
          },
        ]}
        onCancel={handleCloseModal}
      />
    </>
  );
}
