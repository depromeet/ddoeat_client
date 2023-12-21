'use client';

import { QueryClientProvider } from '@tanstack/react-query';

import queryClient from '@api/query-config';

export default function QueryClientProviders({
  children,
}: React.PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
