import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

import Report from '../Report';
import Reviews from '../Reviews';

import Header from '@components/common/Header';
import ImageContainer from '@components/common/ImageContainer';
import { useGetReport } from '@hooks/api/useGetReport';
import useObserver from '@hooks/useObserver';
import cn from '@utils/cn';

export default function StoreDetailContent() {
  const searchParams = useSearchParams();

  const storeId = searchParams.get('storeId');

  const { data: reportData } = useGetReport(storeId ?? '');

  const [isScrollDown, setIsScrollDown] = useState(false);

  const onIntersect: IntersectionObserverCallback = ([entry]) => {
    setIsScrollDown(!entry.isIntersecting);
  };

  const { setTarget } = useObserver({
    onIntersect,
  });

  return (
    <div>
      <div ref={setTarget}>
        <Header
          className={cn('fixed bg-white', {
            '[&>*>*]:fill-white': reportData?.storeMainImageUrl,
          })}
        >
          {isScrollDown && <span>{'음식점 이름 들어가는 자리입니다.'}</span>}
        </Header>
      </div>

      {reportData?.storeMainImageUrl && (
        <ImageContainer
          type="medium"
          src={reportData.storeMainImageUrl}
          alt="음식점 이미지"
        />
      )}

      <div
        className={cn('w-full', {
          'h-[24px] rounded-t-[24px]': reportData?.storeMainImageUrl,
          'h-[56px]': !reportData?.storeMainImageUrl,
        })}
      />

      {/* TODO: 상조님 음식점 정보 컴포넌트 넣기 */}
      <div className="w-full h-[8px] bg-gray-100" />
      <Report />
      <Reviews />
    </div>
  );
}
