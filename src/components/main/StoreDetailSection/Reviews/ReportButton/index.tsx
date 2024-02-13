import { toast } from 'sonner';

import useControlModal from '@utils/useControlModal';
import Modal from '@components/common/Modal';

export default function ReviewReportButton() {
  const { isModalShowing, handleOpenModal, handleCloseModal } =
    useControlModal();

  const handleClickReportButton = () => {
    handleOpenModal();
  };

  const handleReportConfirm = () => {
    handleCloseModal();
    toast('신고가 완료되었습니다!');
  };

  return (
    <>
      <button
        className="caption-12-bold text-gray-500"
        onClick={handleClickReportButton}
      >
        신고
      </button>
      <Modal
        isShowing={isModalShowing}
        text="리뷰 신고"
        subText="신고 내용을 자세히 작성해주세요."
        controls={[
          {
            buttonText: '취소',
            buttonHandler: handleCloseModal,
          },
          {
            buttonText: '신고하기',
            buttonHandler: handleReportConfirm,
          },
        ]}
        onCancel={handleCloseModal}
      >
        <textarea
          className="h-[100px] w-full mb-[15px] outline-none border border-gray-500 rounded-[12px] p-[5px] resize-none"
          rows={4}
        />
      </Modal>
    </>
  );
}
