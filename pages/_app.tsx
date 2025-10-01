import Cursor from '@/components/Cursor';
import PageTransition from '@/components/PageTransition';
import ScreenLoader from '@/components/ScreenLoader';
import { useIsScreenLoader } from '@/hooks/useIsScreenLoader';
import Layout from '@/layout/default';
import '@/styles/main.scss';
import { AnimatePresence } from 'framer-motion';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { AppProps } from 'next/app';
import { usePathname } from 'next/navigation';
import { StrictMode } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  const pathname = usePathname();
  const isScreenLoader = useIsScreenLoader();

  return (
    <StrictMode>
      <Cursor />
      {pathname?.includes('studio') ? (
        <Component {...pageProps} />
      ) : (
        <Layout>
          {isScreenLoader && <ScreenLoader />}
          <AnimatePresence
            mode="wait"
            onExitComplete={() => {
              window.scrollTo(0, 0);
              setTimeout(() => {
                ScrollTrigger.refresh();
              }, 100);
            }}
          >
            <PageTransition key={pathname}>
              <Component {...pageProps} />
            </PageTransition>
          </AnimatePresence>
        </Layout>
      )}
    </StrictMode>
  );
}
