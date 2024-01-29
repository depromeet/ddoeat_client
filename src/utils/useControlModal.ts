import { useState } from 'react';

export default function useControlModal() {
  const [isModalShowing, setIsModalShowing] = useState(false);

  const handleOpenModal = () => {
    setIsModalShowing(true);
  };

  const handleCloseModal = () => {
    setIsModalShowing(false);
  };

  return { isModalShowing, handleOpenModal, handleCloseModal };
}
