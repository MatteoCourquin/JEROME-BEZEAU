import Cursor from '@/components/Cursor';
import PageTransition from '@/components/PageTransition';
import Layout from '@/layout/default';
import SmoothScrolling from '@/layout/lenis';
import '@/styles/main.scss';
import { AnimatePresence } from 'framer-motion';
import type { AppProps } from 'next/app';
import { usePathname } from 'next/navigation';

export default function App({ Component, pageProps }: AppProps) {
  const pathname = usePathname();

  return (
    <>
      <Cursor />
      {pathname?.includes('studio') ? (
        <Component {...pageProps} />
      ) : (
        <Layout>
          <SmoothScrolling>
            <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
              <PageTransition
                key={pathname}
                // backgroundColor={pathname === '/' ? '#000000' : '#ffffff'}
              >
                <Component {...pageProps} />
              </PageTransition>
            </AnimatePresence>
          </SmoothScrolling>
        </Layout>
      )}
    </>
  );
}
