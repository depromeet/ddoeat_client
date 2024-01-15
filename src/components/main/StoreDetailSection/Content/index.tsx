import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

import Report from '../Report';
import Reviews from '../Reviews';

import Header from '@components/common/Header';
import ImageContainer from '@components/common/ImageContainer';
import { useGetReport } from '@hooks/api/useGetReport';
import useObserver from '@hooks/useObserver';

export default function StoreDetailContent() {
  const searchParams = useSearchParams();

  const storeId = searchParams.get('storeId');

  const { data } = useGetReport(storeId ?? '');

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
          className={`fixed bg-white ${
            data?.data.storeMainImageUrl && '[&>*>*]:fill-white'
          }`}
        >
          {isScrollDown && <span>{'음식점 이름 들어가는 자리입니다.'}</span>}
        </Header>
      </div>

      {data?.data.storeMainImageUrl && (
        <ImageContainer
          type="full"
          src={data.data.storeMainImageUrl}
          alt="음식점 이미지"
          className="w-full"
        />
      )}
      <div
        className={`w-full bg-white h-[${
          data?.data.storeMainImageUrl ? 24 : 56
        }px]  ${data?.data.storeMainImageUrl ? 'rounded-t-[24px]' : ''}`}
      />

      {/* TODO: 상조님 음식점 정보 컴포넌트 넣기 */}
      <div className="w-full h-[8px] bg-gray-100" />
      <Report />
      <Reviews />
    </div>
  );
}
