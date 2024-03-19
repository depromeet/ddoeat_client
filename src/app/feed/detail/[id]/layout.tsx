import Header from '@components/common/Header';

interface ServiceTermsLayoutProps {
  children: React.ReactNode;
}

export default function layout({ children }: ServiceTermsLayoutProps) {
  return (
    <div>
      <Header className="bg-white" />
      <div className="h-[calc(100dvh-56px] overflow-scroll">{children}</div>
    </div>
  );
}
