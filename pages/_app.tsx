import Layout from '@/layout/default';
import SmoothScrolling from '@/layout/lenis';
import '@/styles/main.sass';
import type { AppProps } from 'next/app';
import { usePathname } from 'next/navigation';

export default function App({ Component, pageProps }: AppProps) {
  const pathname = usePathname();

  return (
    <>
      {pathname?.includes('studio') ? (
        <Component {...pageProps} />
      ) : (
        <Layout>
          <SmoothScrolling>
            <Component {...pageProps} />
          </SmoothScrolling>
        </Layout>
      )}
    </>
  );
}
