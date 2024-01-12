import { useState, useEffect } from 'react';

import Tag from '@components/common/Tag';
import CloseIcon from 'public/assets/icon12/close_12.svg';

export default function RecentSearchKeyword() {
  const [isComponentMounted, setIsComponentMounted] = useState(false);
  const [recentSearchKeywords, setRecentSearchKeywords] = useState<string[]>(
    [],
  );

  useEffect(() => {
    const storedKeywords = localStorage.getItem('recentSearchKeywords') || '[]';
    setRecentSearchKeywords(JSON.parse(storedKeywords));
    setIsComponentMounted(true);
  }, []);

  useEffect(() => {
    if (isComponentMounted) {
      localStorage.setItem(
        'recentSearchKeywords',
        JSON.stringify(recentSearchKeywords),
      );
    }
  }, [recentSearchKeywords, isComponentMounted]);

  const handleClickDeleteButton = (keyword: string) => () => {
    setRecentSearchKeywords((prev) => prev.filter((item) => item !== keyword));
  };

  return (
    <div className="flex flex-col gap-[8px] p-[16px]">
      <p className="body-14-bold">최근 검색어</p>
      <div className="flex gap-[8px] overflow-x-scroll whitespace-nowrap">
        {recentSearchKeywords.map((recentSearchKeyword, index) => (
          <Tag key={index} size="large" className="py-[8px] bg-gray-100">
            <p>{recentSearchKeyword}</p>
            <button onClick={handleClickDeleteButton(recentSearchKeyword)}>
              <CloseIcon />
            </button>
          </Tag>
        ))}
      </div>
    </div>
  );
}
