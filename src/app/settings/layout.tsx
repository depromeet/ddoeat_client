import Header from '@components/common/Header';

interface TermsLayoutProps {
  children: React.ReactNode;
}

export default function layout({ children }: TermsLayoutProps) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}
