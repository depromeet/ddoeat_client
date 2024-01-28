import Header from '@components/common/Header';

interface ServiceTermsLayoutProps {
  children: React.ReactNode;
}

export default function layout({ children }: ServiceTermsLayoutProps) {
  return (
    <div>
      <Header className="bg-white" />
      <div className="px-[16px]">{children}</div>
    </div>
  );
}
