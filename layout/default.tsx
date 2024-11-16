import Footer from '@/components/Footer';
import Header from '@/components/Header';
import SocialMedia from '@/components/SocialMedia';
import { AppProvider } from '@/providers/root';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import Head from 'next/head';
import { ReactNode } from 'react';

gsap.registerPlugin(ScrollTrigger);

const Layout = ({ children }: { children: ReactNode }) => {
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
      <Header />
      <SocialMedia />
      <main className="min-h-screen !scale-y-50 overflow-hidden">{children}</main>
      <Footer />
    </AppProvider>
  );
};

export default Layout;
