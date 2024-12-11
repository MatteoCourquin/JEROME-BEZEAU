import Background from '@/components/Background';
import Burger from '@/components/Burger';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import SocialMedia from '@/components/SocialMedia';
import { useMatchMedia } from '@/hooks/useCheckScreenSize';
import { AppProvider } from '@/providers/root';
import { BREAKPOINTS } from '@/tailwind.config';
import gsap from 'gsap';
import CustomEase from 'gsap/dist/CustomEase';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import Head from 'next/head';
import { ReactNode } from 'react';

gsap.registerPlugin(ScrollTrigger, CustomEase);

const Layout = ({ children }: { children: ReactNode }) => {
  const isTablet = useMatchMedia(BREAKPOINTS.MD);

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
        {/* <script src="https://unpkg.com/react-scan/dist/auto.global.js"></script> */}
      </Head>
      {isTablet ? <Burger /> : <Header />}
      <SocialMedia />
      <main>{children}</main>
      <Footer />
      <Background />
    </AppProvider>
  );
};

export default Layout;
