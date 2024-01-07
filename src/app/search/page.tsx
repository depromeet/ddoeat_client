'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import SearchTopBar from '@components/common/SearchTopBar';
import Header from '@components/common/Header';
import { useGetStoreList } from '@api/useGetStoreList';
import useInput from '@hooks/useInput';
import Store from '@components/search/store';

export default function Page() {
  const [text, onTextChange, resetText] = useInput('');
  const { data: storeList } = useGetStoreList(text);

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
      <ul>
        {storeList?.map((store, index) => {
          const { storeId, storeName, menuType, location, revisitNum } = store;

          return (
            // TODO: 클릭 시 이동 url 확정되면 수정
            // TODO: 검색결과가 없는 케이스에 노출할 컴포넌트 논의 후 적용
            <Link href={`/map/${storeId}`} key={storeId}>
              <Store
                storeId={storeId}
                storeName={storeName}
                menuType={menuType}
                location={location}
                revisitNum={revisitNum}
                hasDeleteOption={false}
                isLast={index === storeList.length - 1}
              />
            </Link>
          );
        })}
      </ul>
    </div>
  );
}
