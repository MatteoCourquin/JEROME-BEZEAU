import Burger from '@/components/Burger';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import SocialMedia from '@/components/SocialMedia';
import { useMatchMedia } from '@/hooks/useCheckScreenSize';
import { AppProvider } from '@/providers/root';
import Head from 'next/head';
import { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  const isMobile = useMatchMedia('(max-width: 768px)');

  return (
    <AppProvider>
      <Head>
        <title>Jérôme Bezeau</title>
        <meta content="Art Director & Digital designer" name="description" />
        <meta
          content="Art Director, Digital designer, Web designer, Graphic designer, UI/UX designer, Front-end developer"
          name="keywords"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      {isMobile ? <Burger /> : <Header />}
      <SocialMedia />
      <main className="min-h-screen !scale-y-50 overflow-hidden">{children}</main>
      <Footer />
    </AppProvider>
  );
};

export default Layout;
