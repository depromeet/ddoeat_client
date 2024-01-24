import { ReactNode } from 'react';

interface OnboardingLayout {
  children: ReactNode;
}

export default function Layout({ children }: OnboardingLayout) {
  return <div className="h-screen w-dvw bg-gray-100 relative">{children}</div>;
}
