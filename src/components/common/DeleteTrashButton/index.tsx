import { useState } from 'react';

import DeleteModal from '../DeleteModal';

import TrashIcon from 'public/assets/icon24/trash_24.svg';

interface TrashButtonProps {
  onClick?: () => void;
}

export default function DeleteTrashButton({ onClick }: TrashButtonProps) {
  const [isModalShowing, setModalShowing] = useState(false);

  const handleClickDeleteButton = () => {
    setModalShowing(true);
  };

  const handleDeleteConfirm = () => {
    onClick?.();
    setModalShowing(false);
  };

  const handleCancel = () => {
    setModalShowing(false);
  };
  return (
    <>
      <div onClick={handleClickDeleteButton}>
        <TrashIcon />
      </div>
      <DeleteModal
        isShowing={isModalShowing}
        onClick={handleDeleteConfirm}
        onCancel={handleCancel}
      />
    </>
  );
}
