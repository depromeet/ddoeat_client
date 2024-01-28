'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React from 'react';

import { convertMeterToKm } from '@utils/parser';
import useDebounce from '@hooks/useDebounce';
import SearchTopBar from '@components/search/SearchTopBar';
import Header from '@components/common/Header';
import { useGetStoreList } from '@hooks/api/useGetStoreList';
import useInput from '@hooks/useInput';
import cn from '@utils/cn';
import NoSearchResult from '@components/common/NoSearchResult';
import SearchItem from '@components/search/SearchItem';
import RecentSearchKeyword from '@components/search/RecentSearchKeyword';
import useStorageState from '@utils/useStorageState';
import useIsMounted from '@hooks/useIsMounted';

export default function Page() {
  const type = useSearchParams().get('type');
  const latitude = useSearchParams().get('latitude') as string;
  const longitude = useSearchParams().get('longitude') as string;

  const isMounted = useIsMounted();
  const [text, onTextChange, setValue, resetText] = useInput('');
  const debouncedText = useDebounce(text, 500);

  const [recentSearchKeywords, setRecentSearchKeywords] = useStorageState<
    string[]
  >({ key: 'recentSearchKeywords', initialValue: [] });

  // TODO: 추후 위, 경도 추가
  const { data, refetch } = useGetStoreList({
    keyword: debouncedText,
    longitude,
    latitude,
  });

  const storeList = data?.storeSearchResult;

  const isStoreListNone = storeList?.length === 0;

  const handleClickSearchButton = () => {
    setRecentSearchKeywords((prev) => {
      const updatedKeywords = prev.includes(text)
        ? [text, ...prev.filter((item) => item !== text)]
        : [text, ...prev];

      if (updatedKeywords.length > 10) {
        updatedKeywords.pop();
      }

      return updatedKeywords;
    });
    if (text) {
      refetch();
    }
  };

  const handleClickRecentSearchKeyword = (keyword: string) => () => {
    setValue(keyword);
  };

  const handleClickDeleteButton =
    (keyword: string) => (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      setRecentSearchKeywords((prev) =>
        prev.filter((item) => item !== keyword),
      );
    };

  return (
    <div>
      <Header className="bg-white">
        <SearchTopBar
          className="bg-gray-100 py-[12px] has-[input:placeholder]:gray-300"
          placeholder={
            type === 'regist-log'
              ? '작성할 맛집을 검색해보세요'
              : '맛집 이름을 검색하세요.'
          }
          onClick={handleClickSearchButton}
          value={text}
          onChange={onTextChange}
          resetText={resetText}
        />
      </Header>
      <div className="h-[100dvh] pt-[68px] overflow-y-scroll">
        {!storeList && isMounted && (
          <RecentSearchKeyword
            recentSearchKeywords={recentSearchKeywords}
            onClick={handleClickRecentSearchKeyword}
            onDelete={handleClickDeleteButton}
          />
        )}
        <ul
          className={cn({
            'bg-white': !isStoreListNone,
            'bg-gray-100 h-full flex justify-center items-center':
              isStoreListNone,
          })}
        >
          {isStoreListNone ? (
            <NoSearchResult />
          ) : (
            storeList?.map((store, index) => {
              const { storeId, distance, ...rest } = store;

              return (
                // TODO: 클릭 시 이동 url 확정되면 수정
                <Link
                  href={{
                    pathname: '/',
                    query: { type: 'search', ...store },
                  }}
                  key={String(storeId) + String(rest.kakaoStoreId)}
                >
                  <SearchItem
                    {...rest}
                    distance={convertMeterToKm(distance)}
                    isLast={index === storeList.length - 1}
                  />
                </Link>
              );
            })
          )}
        </ul>
      </div>
    </div>
  );
}
