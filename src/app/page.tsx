'use client';

import { useState } from 'react';

import BottomSheet from '@components/common/BottomSheet';

export default function Home() {
  //TODO: 리뷰 후 원복
  const [isShowing, setIsShowing] = useState(false);
  return (
    <main className="flex h-[100dvh] max-h-[100dvh] flex-col items-center justify-between overflow-hidden">
      <button
        onClick={() => {
          setIsShowing(!isShowing);
        }}
      >
        click
      </button>
      <BottomSheet
        handleCloseBottomSheet={() => {
          setIsShowing(false);
        }}
        isShowing={isShowing}
      >
        <BottomSheet.ShowContent>
          <div className="w-full h-[3000px] bg-primary-50 break-words">
            중간까지 올라온 바텀싯 내용
          </div>
        </BottomSheet.ShowContent>
        <BottomSheet.FullContent>
          <div className="w-full h-[2000px] bg-primary-300 break-words">
            풀페이지 바텀싯 내용
          </div>
        </BottomSheet.FullContent>
      </BottomSheet>
    </main>
  );
}
