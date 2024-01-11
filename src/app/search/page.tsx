'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import useDebounce from '@hooks/useDebounce';
import SearchTopBar from '@components/search/SearchTopBar';
import Header from '@components/common/Header';
import { useGetStoreList } from '@hooks/api/useGetStoreList';
import useInput from '@hooks/useInput';
import cn from '@utils/cn';
import NoSearchResult from '@components/common/NoSearchResult';
import SearchItem from '@components/search/SearchItem';

export default function Page() {
  const [text, onTextChange, resetText] = useInput('');
  const debouncedText = useDebounce(text, 500);

  const { data: storeList } = useGetStoreList(debouncedText);

  const isStoreListNone = storeList?.length === 0;

  const type = useSearchParams().get('type');

  return (
    <div>
      <Header>
        <SearchTopBar
          className="bg-gray-100 py-[12px] has-[input:placeholder]:gray-300"
          placeholder={
            type === 'regist-log'
              ? '작성할 맛집을 검색해보세요'
              : '맛집 이름을 검색하세요.'
          }
          value={text}
          onChange={onTextChange}
          resetText={resetText}
        />
      </Header>
      <ul
        className={cn('h-[100dvh] pt-[68px] overflow-y-scroll', {
          'bg-white': !isStoreListNone,
          'bg-gray-100 flex justify-center items-center': isStoreListNone,
        })}
      >
        {isStoreListNone ? (
          <NoSearchResult />
        ) : (
          storeList?.map((store, index) => {
            const { storeId } = store;

            if (storeList.length === 0) return <NoSearchResult />;

            return (
              // TODO: 클릭 시 이동 url 확정되면 수정
              // TODO: 검색결과가 없는 케이스에 노출할 컴포넌트 논의 후 적용
              <Link href={`/map/${storeId}`} key={storeId}>
                <SearchItem
                  {...store}
                  isLast={index === storeList.length - 1}
                  listId={storeId}
                />
              </Link>
            );
          })
        )}
      </ul>
    </div>
  );
}
