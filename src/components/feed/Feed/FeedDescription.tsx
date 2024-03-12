import { HTMLAttributes } from 'react';

import RightArrowLogo from 'public/assets/icon20/right_arrow_20.svg';

export default function FeedDescription({
  children,
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <div className="flex justify-between items-center gap-[8px]">
      <p className="body-14-regular flex-grow line-clamp-2">{children}</p>
      <button className="w-[20px] h-[20px]">
        <RightArrowLogo />
      </button>
    </div>
  );
}
