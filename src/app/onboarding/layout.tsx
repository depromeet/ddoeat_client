import { ReactNode } from 'react';

interface OnboardingLayout {
  children: ReactNode;
}

export default function layout({ children }: OnboardingLayout) {
  return (
    <div className="h-screen w-screen bg-gray-100 relative">{children}</div>
  );
}
