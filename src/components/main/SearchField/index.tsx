'use client';

import { useRouter } from 'next/navigation';

import CTAButton from '@components/common/CTAButton';
import SearchIcon from 'public/assets/icon24/search_24.svg';

export default function SearchField() {
  const router = useRouter();

  const handleSearchButtonClick = () => {
    // TODO: 검색 페이지로 이동 시키기
    router.push('/search');
  };

  return (
    <CTAButton
      onClick={handleSearchButtonClick}
      className="justify-between text-gray-500 body-14-regular bg-white active:bg-white"
    >
      <p>맛집을 검색하세요</p>
      <SearchIcon />
    </CTAButton>
  );
}
