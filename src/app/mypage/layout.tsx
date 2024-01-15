import Image from 'next/image';

interface LayoutProps {
  children: React.ReactNode;
}
export default function layout({ children }: LayoutProps) {
  return (
    <main>
      <Image
        alt="myPage background"
        src="/assets/image/mypage/background.png"
        className="-z-fixedBody"
        fill
      />

      {children}
    </main>
  );
}
