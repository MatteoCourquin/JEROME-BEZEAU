import { ReactNode } from 'react';
import { LanguageProvider } from './language.provider';
import { QueryProvider } from './query.provider';
import { SmoothScrollProvider } from './smooth-scroll.provider';

type AppProviderProps = {
  children: ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <QueryProvider>
      <LanguageProvider>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </LanguageProvider>
    </QueryProvider>
  );
};
