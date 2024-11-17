import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { ReactNode, useEffect } from 'react';

gsap.registerPlugin(ScrollTrigger);

export const GSAPProvider = ({ children }: { children: ReactNode }) => {
  useGSAP(() => {
    ScrollTrigger.config({ ignoreMobileResize: true });
    ScrollTrigger.normalizeScroll();
  });

  useEffect(() => {
    const refreshScrollTrigger = () => ScrollTrigger.refresh();
    window.addEventListener('resize', refreshScrollTrigger);
    return () => {
      window.removeEventListener('resize', refreshScrollTrigger);
    };
  }, []);

  return <>{children}</>;
};
