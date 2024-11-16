import { QueryClient, QueryClientProvider as TanstackQueryProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

const queryClient = new QueryClient();

export const QueryProvider = ({ children }: { children: ReactNode }) => {
  return <TanstackQueryProvider client={queryClient}>{children}</TanstackQueryProvider>;
};
