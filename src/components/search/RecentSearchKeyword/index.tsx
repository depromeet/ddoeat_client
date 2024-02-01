import React from 'react';

import Tag from '@components/common/Tag';
import CloseIcon from 'public/assets/icon12/close_12.svg';

interface RecentSearchKeywordProps {
  recentSearchKeywords: string[];
  onClick: (keyword: string) => () => void;
  onDelete: (
    keyword: string,
  ) => (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function RecentSearchKeyword({
  recentSearchKeywords,
  onClick,
  onDelete,
}: RecentSearchKeywordProps) {
  return (
    <div className="flex flex-col gap-[8px] p-[16px]">
      <p className="body-14-bold text-gray-900">최근 검색어</p>
      <div className="flex gap-[8px] overflow-x-scroll whitespace-nowrap">
        {recentSearchKeywords.map((recentSearchKeyword, index) => (
          <Tag
            key={index}
            size="large"
            className="py-[8px] bg-gray-100 cursor-pointer text-gray-900"
            onClick={onClick(recentSearchKeyword)}
          >
            <p>{recentSearchKeyword}</p>
            <button onClick={onDelete(recentSearchKeyword)}>
              <CloseIcon />
            </button>
          </Tag>
        ))}
      </div>
    </div>
  );
}
