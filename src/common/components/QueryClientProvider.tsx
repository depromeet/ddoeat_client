'use client';

import queryClient from '@api/query-config';
import { QueryClientProvider } from '@tanstack/react-query';

export default function QueryClientProviders({
  children,
}: React.PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
