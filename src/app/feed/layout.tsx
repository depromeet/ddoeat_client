import { HTMLAttributes } from 'react';

export default function layout({ children }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div>
      <h1 className="flex top-0 items-center justify-center w-full h-[56px] body-16-bold border-b-[1px] border-gray-100">
        피드
      </h1>
      <div className="top-[56px]">{children}</div>
    </div>
  );
}
