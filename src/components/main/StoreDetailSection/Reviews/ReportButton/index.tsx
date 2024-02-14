import { toast } from 'sonner';
import { ChangeEvent, useState } from 'react';

import useControlModal from '@utils/useControlModal';
import Modal from '@components/common/Modal';
import TextArea from '@components/review/TextArea';

export default function ReviewReportButton() {
  const [reportContent, setReportContent] = useState('');

  const { isModalShowing, handleOpenModal, handleCloseModal } =
    useControlModal();

  const handleClickReportButton = () => {
    handleOpenModal();
  };

  const handleReportConfirm = () => {
    handleCloseModal();
    toast('신고가 완료되었습니다!');
  };

  const handleChangeReportContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setReportContent(e.target.value);
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
        <TextArea
          value={reportContent}
          onChange={handleChangeReportContent}
          placeholder="신고내용 작성"
          className="bg-gray-50 [&>*]:bg-gray-50"
        />
      </Modal>
    </>
  );
}
