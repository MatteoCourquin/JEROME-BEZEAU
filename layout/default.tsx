import Background from '@/components/Background';
import Burger from '@/components/Burger';
import Cursor from '@/components/Cursor';
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
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CustomEase from 'gsap/dist/CustomEase';
import { usePathname } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  const isTablet = useMatchMedia(BREAKPOINTS.MD);
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger, CustomEase);
    }
  }, []);

  useEffect(() => {
    console.info(
      '%c Code by Matteo Courquin: https://matteocourquin.com/',
      'border: 1px solid #ccc; padding: 4px;',
    );
  }, []);

  const isPhotographyPage = /^\/photography\/.+/.test(pathname);

  return (
    <AppProvider>
      <Cursor />
      <SEO />
      {isTablet ? <Burger /> : <Header />}
      <SocialMedia />
      <main>{children}</main>
      {!isPhotographyPage && <Footer />}
      <Background />
      <Analytics />
      <SpeedInsights />
    </AppProvider>
  );
};

export default Layout;
