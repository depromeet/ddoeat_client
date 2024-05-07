import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

import { useBottomSheet } from '../BottomSheet/contexts/BottomSheetContext';
import StoreInformation from '../StoreInformation';
import { SearchedPinFromSearchParams } from '../StorePreviewSection';
import WriteLogButton from '../WriteLogButton';

import AnimatePortal from '@components/common/AnimatePortal';
import BookmarkButton from '@components/common/BookmarkButton';
import Header from '@components/common/Header';
import ImageContainer from '@components/common/ImageContainer';
import { useGetReport } from '@hooks/api/useGetReport';
import useGetStore from '@hooks/api/useGetStore';
import useObserver from '@hooks/useObserver';
import cn from '@utils/cn';
import switchUrl from '@utils/switchUrl';
import { useGetStoreFeedList } from '@hooks/api/useGetFeedList';
import { Feed } from '@components/feed/Feed';

export default function StoreDetailSection({
  storeId,
  searchedPinFromSearchParams,
}: {
  storeId?: number;
  searchedPinFromSearchParams?: SearchedPinFromSearchParams;
}) {
  const { isDragging } = useBottomSheet();
  const searchParams = useSearchParams();
  const { data: storeData } = useGetStore({
    storeId: storeId ?? (Number(searchParams.get('storeId')) || undefined),
  });

  const { data: reportData } = useGetReport(
    storeId ?? Number(searchParams.get('storeId') || null),
  );

  const { data: storeFeedListData } = useGetStoreFeedList({
    storeId: storeId ?? 0,
  });

  console.log(storeFeedListData);

  const [isScrollDown, setIsScrollDown] = useState(false);

  const onIntersect: IntersectionObserverCallback = ([entry]) => {
    setIsScrollDown(!entry.isIntersecting);
  };

  const { setTarget } = useObserver({
    onIntersect,
  });

  const handleBackButtonClick = () => {
    const url = new URL(window.location.href);
    url.searchParams.set('bottomSheetStatus', 'show');
    switchUrl(url);
  };

  return (
    <div className="relative pb-[32px]">
      <div
        ref={setTarget}
        className="absolute top-0 h-[20px] w-full bg-transparent"
      />
      <AnimatePortal isShowing={!isDragging}>
        <Header
          className={cn('absolute z-toast transition-all', {
            '[&>*>*]:fill-white bg-transparent': reportData?.thumbnailUrl,
            '[&>*>*]:fill-black bg-white': isScrollDown,
          })}
          onClick={handleBackButtonClick}
        >
          {isScrollDown && <span>{storeData?.storeName}</span>}
        </Header>
      </AnimatePortal>

      {reportData?.thumbnailUrl && (
        <ImageContainer
          type="full"
          src={reportData.thumbnailUrl}
          alt="음식점 이미지"
        />
      )}
      <div
        className={cn('w-full', {
          'h-[24px] rounded-t-[24px]': reportData?.thumbnailUrl,
          'h-[56px]': !reportData?.thumbnailUrl,
        })}
      />
      <StoreInformation
        kakaoCategoryName={
          storeData?.kakaoCategoryName ??
          searchedPinFromSearchParams?.kakaoCategoryName ??
          ''
        }
        storeName={
          storeData?.storeName ?? searchedPinFromSearchParams?.storeName ?? ''
        }
        address={
          storeData?.address ?? searchedPinFromSearchParams?.address ?? ''
        }
        totalRating={storeData?.totalRating ?? 0}
        totalReviewCount={storeData?.totalFeedCnt ?? 0}
        myRevisitedCount={storeData?.userFeedCnt ?? 0}
      />
      <div className="flex gap-[8px] p-[16px]">
        <WriteLogButton
          storeName={
            storeData?.storeName ?? searchedPinFromSearchParams?.storeName ?? ''
          }
          storeId={storeData?.storeId ?? null}
          myRevisitedCount={storeData?.userFeedCnt ?? 0}
          searchedPinFromSearchParams={searchedPinFromSearchParams}
        />
        {storeData && (
          <BookmarkButton
            isBookmarked={storeData.isBookmarked}
            storeId={storeData.storeId}
          />
        )}
      </div>
      {storeFeedListData &&
        !storeFeedListData[0].data.empty &&
        storeFeedListData.map((feedList) =>
          feedList.data.content.map((feed) => {
            return (
              <Feed key={feed.feedId}>
                <Feed.Date>{feed.createdAt}</Feed.Date>
                <Feed.Profile
                  userId={feed.userId}
                  src={feed.profileImageUrl}
                  nickName={feed.nickname}
                  alt={`${feed.userId} 프로필 이미지`}
                  isMyFeed={feed.isMine}
                  isFollowed={feed.isFollowed}
                />
                <Feed.Image
                  src={feed.feedImg}
                  alt={`${feed.feedStoreResponse.storeName} 이미지`}
                  storeName={feed.feedStoreResponse.storeName}
                  storeCategory={feed.feedStoreResponse.kakaoCategoryName}
                  storeLocation={feed.feedStoreResponse.address}
                  storeResponse={feed.feedStoreResponse}
                />
                <Feed.Description
                  id={feed.feedId}
                  description={feed.description}
                />
              </Feed>
            );
          }),
        )}
      <div className="w-full h-[8px] bg-gray-100" />
    </div>
  );
}
