import { LINKS, SOCIALS } from '@/constants';
import { useIsScreenLoader } from '@/hooks/useIsScreenLoader';
import { useMagnet, useResetMagnet } from '@/hooks/useMagnet';
import { useLanguage } from '@/providers/language.provider';
import { defaultSpacing } from '@/tailwind.config';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import gsap from 'gsap';
import { LottieRefCurrentProps } from 'lottie-react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import JBLottie from '../public/lottie/JB.json';
const Lottie = dynamic(() => import('lottie-react'), {
  ssr: false,
  loading: () => <div className="h-[85px] w-[88px] pb-7" />,
});

const Burger = ({ className }: { className?: string }) => {
  const { isFrench } = useLanguage();
  const isScreenLoader = useIsScreenLoader();
  const pathname = usePathname();

  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const wrapperIconRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const timelineRef = useRef<gsap.core.Timeline>();

  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const [showLottie, setShowLottie] = useState(false);

  useGSAP(() => {
    gsap
      .timeline({
        delay: isScreenLoader ? 4.8 : 1,
      })
      .to(burgerRef.current, { scale: 1, duration: 0.3, ease: 'power3.out' })
      .add(() => setShowLottie(true))
      .play();
  }, [isScreenLoader]);

  useGSAP(() => {
    if (!headerRef.current || !navRef.current || !wrapperIconRef.current) return;
    const links = navRef.current.getElementsByClassName('anim-items-header');
    const divider = navRef.current.getElementsByClassName('anim-items-divider');
    const iconsChildren = wrapperIconRef.current.children;

    timelineRef.current = gsap
      .timeline({ paused: true })
      .fromTo(
        headerRef.current,
        { backgroundColor: 'transparent' },
        {
          backgroundColor: '#0e0e0e',
          duration: 0.3,
          ease: 'power2.inOut',
        },
      )
      .fromTo(
        headerRef.current,
        { height: '96px' },
        {
          height: '100vh',
          duration: 0.4,
          ease: 'power2.inOut',
        },
        '-=0.1',
      )
      .fromTo(
        divider,
        { paddingLeft: 0, paddingRight: 0 },
        {
          paddingLeft: defaultSpacing['x-default'],
          paddingRight: defaultSpacing['x-default'],
          duration: 0.3,
          ease: 'power2.inOut',
          stagger: 0.1,
        },
        '<',
      )
      .fromTo(
        navRef.current,
        { paddingTop: 0, paddingBottom: 0 },
        {
          paddingTop: defaultSpacing['y-default'],
          paddingBottom: defaultSpacing['y-default'],
          duration: 0.3,
          ease: 'power2.inOut',
        },
        '<',
      )
      .fromTo(
        links,
        { y: -100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 1,
          ease: 'power2.inOut',
          stagger: 0.08,
        },
        '-=1.6',
      )
      .fromTo(
        iconsChildren,
        {
          scale: 0.5,
          y: -20,
          opacity: 0,
        },
        {
          scale: 1,
          y: 0,
          opacity: 1,
          duration: 0.4,
          ease: 'power3.out',
          stagger: 0.12,
        },
        '-=0.6',
      );
  }, []);

  useEffect(() => {
    if (!timelineRef.current) return;

    if (isBurgerOpen) {
      timelineRef.current.reverse();
      setIsBurgerOpen(false);
    }
  }, [pathname]);

  useEffect(() => {
    if (!timelineRef.current) return;

    if (isBurgerOpen) {
      timelineRef.current.play();
    } else {
      timelineRef.current.reverse();
    }
  }, [isBurgerOpen]);

  return (
    <header
      ref={headerRef}
      className={clsx(
        'fixed z-[99] flex h-24 w-screen flex-col overflow-hidden bg-transparent backdrop-blur-lg',
        className,
      )}
    >
      <div className="flex h-[95px] shrink-0 items-center justify-between px-x-default">
        <Link
          aria-label="Go to home"
          className="cursor-button"
          href="/"
          scroll={false}
          onMouseLeave={useResetMagnet}
          onMouseMove={(e) => useMagnet(e, 1)}
        >
          <div className="h-[85px] w-[88px] pb-7">
            {showLottie && (
              <Lottie
                animationData={JBLottie}
                autoPlay={false}
                className="h-full w-full"
                loop={false}
                lottieRef={lottieRef}
              />
            )}
          </div>
        </Link>
        <button
          ref={burgerRef}
          aria-expanded={isBurgerOpen}
          aria-label={isBurgerOpen ? 'Close menu' : 'Open menu'}
          className="cursor-button group/burger flex h-6 w-6 scale-0 flex-col items-end justify-between text-white transition-opacity"
          onClick={() => setIsBurgerOpen(!isBurgerOpen)}
          onMouseLeave={(e) => useResetMagnet(e)}
          onMouseMove={(e) => useMagnet(e, 1)}
        >
          <div
            className={clsx(
              'h-0.5 w-full bg-white transition-transform',
              isBurgerOpen && 'translate-y-[11px] rotate-45',
            )}
          />
          <div
            className={clsx(
              'h-0.5 w-full origin-right bg-white transition-[transform,opacity]',
              isBurgerOpen ? 'scale-x-0 opacity-0' : 'scale-x-[66%] group-hover/burger:scale-100',
            )}
          />
          <div
            className={clsx(
              'h-0.5 w-full bg-white transition-transform',
              isBurgerOpen && '-translate-y-[11px] -rotate-45 group-hover/burger:scale-x-75',
            )}
          />
        </button>
      </div>
      <nav ref={navRef} aria-hidden={!isBurgerOpen}>
        <div className="relative w-screen">
          <div className="anim-items-divider absolute left-0 top-0 h-px w-full px-0">
            <div className="h-full w-full bg-white-12" />
          </div>
          <ul className="flex flex-col gap-5 px-x-default py-y-default">
            {LINKS.map(({ href, text }) => {
              if (href === '/') return null;

              return (
                <li key={href} className="overflow-hidden transition-transform hover:translate-x-2">
                  <Link
                    className="anim-items-header link link_white-80 cursor-button inline-block whitespace-nowrap pt-0.5 !text-3xl uppercase"
                    href={href}
                    scroll={false}
                  >
                    {isFrench ? text.fr : text.en}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="anim-items-divider absolute bottom-0 left-0 h-px w-full px-0">
            <div className="h-full w-full bg-white-12" />
          </div>
        </div>
      </nav>
      <div ref={wrapperIconRef} className="flex gap-4 px-x-default">
        {SOCIALS.map(({ href, text, icon }) => (
          <Link
            key={href}
            aria-label={`Visit my ${text} profile`}
            className="cursor-button scale-0 p-3 opacity-0"
            href={href}
            target="_blank"
            onMouseLeave={(e) => useResetMagnet(e)}
            onMouseMove={(e) => useMagnet(e, 1)}
          >
            {icon()}
          </Link>
        ))}
      </div>
    </header>
  );
};

export default Burger;
