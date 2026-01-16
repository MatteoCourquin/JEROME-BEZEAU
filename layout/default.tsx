import Background from '@/components/Background';
import Burger from '@/components/Burger';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import SEO from '@/components/SEO';
import SocialMedia from '@/components/SocialMedia';
import { useMatchMedia } from '@/hooks/useCheckScreenSize';
import { AppProvider } from '@/providers/root';
import { BREAKPOINTS } from '@/tailwind.config';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import gsap from 'gsap';
import CustomEase from 'gsap/dist/CustomEase';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { ReactNode, useEffect } from 'react';

gsap.registerPlugin(ScrollTrigger, CustomEase, SplitText);

const Layout = ({ children }: { children: ReactNode }) => {
  const isTablet = useMatchMedia(BREAKPOINTS.MD);

  useEffect(() => {
    console.info(
      '%c Code by Matteo Courquin: https://matteocourquin.com/',
      'border: 1px solid #ccc; padding: 4px;',
    );
  }, []);

  return (
    <AppProvider>
      <SEO />
      {/* <Script src="https://unpkg.com/react-scan/dist/auto.global.js" /> */}
      {isTablet ? <Burger /> : <Header />}
      <SocialMedia />
      <main>{children}</main>
      <Footer />
      <Background />
      <Analytics />
      <SpeedInsights />
    </AppProvider>
  );
};

export default Layout;
