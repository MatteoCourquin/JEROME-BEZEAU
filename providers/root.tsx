import { ReactNode } from 'react';
import { GSAPProvider } from './gsap.provider';
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
        <GSAPProvider>
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </GSAPProvider>
      </LanguageProvider>
    </QueryProvider>
  );
};
