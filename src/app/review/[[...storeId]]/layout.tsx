import Header from '@components/common/Header';

interface ReviewLayoutProps {
  children: React.ReactNode;
}

export default function layout({ children }: ReviewLayoutProps) {
  return (
    <div className="bg-gray-100">
      <Header className="fixed top-0 bg-gray-100">
        <p className="body-16-bold">로그 작성</p>
      </Header>
      <div className="px-[16px]">{children}</div>
    </div>
  );
}
