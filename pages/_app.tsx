import Cursor from '@/components/Cursor';
import PageTransition from '@/components/PageTransition';
import ScreenLoader from '@/components/ScreenLoader';
import Layout from '@/layout/default';
import SmoothScrolling from '@/layout/lenis';
import '@/styles/main.scss';
import { useIsScreenLoader, useTouchDevice } from '@/utils/states';
import { AnimatePresence } from 'framer-motion';
import type { AppProps } from 'next/app';
import { usePathname } from 'next/navigation';
import { StrictMode } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  const pathname = usePathname();
  const isScreenLoader = useIsScreenLoader();
  const isTouchDevice = useTouchDevice();

  const ScrollContainer = isTouchDevice ? 'div' : SmoothScrolling;

  return (
    <StrictMode>
      <Cursor />
      {pathname?.includes('studio') ? (
        <Component {...pageProps} />
      ) : (
        <Layout>
          <ScrollContainer>
            {isScreenLoader && <ScreenLoader />}
            <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
              <PageTransition key={pathname}>
                <Component {...pageProps} />
              </PageTransition>
            </AnimatePresence>
          </ScrollContainer>
        </Layout>
      )}
    </StrictMode>
  );
}
