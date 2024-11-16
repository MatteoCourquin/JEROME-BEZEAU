import Footer from '@/components/Footer';
import Header from '@/components/Header';
import SocialMedia from '@/components/SocialMedia';
import { useGSAP } from '@gsap/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import Head from 'next/head';
import { createContext, ReactNode, useEffect, useState } from 'react';

gsap.registerPlugin(ScrollTrigger);

type TypeLanguageContext = {
  isFrench: boolean;
  setIsFrench: (isFrench: boolean) => void;
};

export const LanguageContext = createContext<TypeLanguageContext>({
  isFrench: false,
  setIsFrench: () => {},
});

const queryClient = new QueryClient();

const Layout = ({ children }: { children: ReactNode }) => {
  const [isFrench, _setIsFrench] = useState(false);

  const setIsFrench = (isFrench: boolean) => {
    localStorage.setItem('isFrench', isFrench.toString());
    _setIsFrench(isFrench);
  };

  useGSAP(() => {
    ScrollTrigger.config({ ignoreMobileResize: true });
  });

  useEffect(() => {
    const refreshScrollTrigger = () => ScrollTrigger.refresh();
    setIsFrench(localStorage.getItem('isFrench') === 'true' || navigator.language.includes('fr'));
    window.addEventListener('resize', refreshScrollTrigger);
    return () => {
      window.removeEventListener('resize', refreshScrollTrigger);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageContext.Provider value={{ isFrench, setIsFrench }}>
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
      </LanguageContext.Provider>
    </QueryClientProvider>
  );
};

export default Layout;
