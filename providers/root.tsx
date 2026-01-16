import { ReactNode } from 'react';
import { CursorProvider } from './cursor.provider';
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
        <CursorProvider>
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </CursorProvider>
      </LanguageProvider>
    </QueryProvider>
  );
};
