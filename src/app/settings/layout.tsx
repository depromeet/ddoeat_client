import Header from '@components/common/Header';

interface TermsLayoutProps {
  children: React.ReactNode;
}

export default function layout({ children }: TermsLayoutProps) {
  return (
    <div>
      <Header className="z-header">
        <p className="body-16-bold">설정</p>
      </Header>
      {children}
    </div>
  );
}
