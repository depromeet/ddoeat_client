'use client';

import { usePathname } from 'next/navigation';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const pathname = usePathname();
  return (
    <div>
      {pathname === '/feed' && (
        <h1 className="flex top-0 items-center justify-center w-full h-[56px] body-16-bold border-b-[1px] border-gray-100">
          피드
        </h1>
      )}
      <div>{children}</div>
    </div>
  );
}
