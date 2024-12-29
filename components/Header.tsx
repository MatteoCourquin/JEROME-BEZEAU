import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import gsap from 'gsap';
import type { LottieRefCurrentProps } from 'lottie-react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import React, { useRef, useState } from 'react';

import { LINKS } from '@/constants';
import { useIsScreenLoader } from '@/hooks/useIsScreenLoader';
import { useMagnet, useResetMagnet } from '@/hooks/useMagnet';
import { useLanguage } from '@/providers/language.provider';
import JBLottie from '../public/lottie/JB.json';
import Button from './atoms/Button';

const Lottie = dynamic(() => import('lottie-react'), {
  ssr: false,
  loading: () => <div className="h-[85px] w-[88px] pb-7" />,
});

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  const { isFrench } = useLanguage();
  const isScreenLoader = useIsScreenLoader();
  const navRef = useRef<HTMLElement>(null);
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [showLottie, setShowLottie] = useState(false);

  useGSAP(() => {
    if (!navRef.current) return;

    const links = navRef.current.getElementsByClassName('anim-items-header');

    gsap
      .timeline({
        delay: isScreenLoader ? 5.8 : 0,
      })
      .to(links, {
        y: 0,
        duration: 1,
        delay: 1,
        ease: 'power3.out',
        stagger: 0.1,
      })
      .add(() => {
        setShowLottie(true);
      }, '-=0.6')
      .play();
  }, [isScreenLoader]);

  return (
    <header
      className={clsx(
        'fixed left-0 top-0 z-[800] h-header w-screen overflow-hidden border-b border-b-white-12 px-x-default backdrop-blur-xl',
        className,
      )}
    >
      <div className="flex h-24 items-center justify-between">
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
        <nav ref={navRef}>
          <ul className="flex items-center">
            {LINKS.map(({ href, text }) => {
              if (href === '/') return null;

              return (
                <li
                  key={href}
                  className={clsx(href === '/contact' ? 'pl-5' : 'overflow-hidden px-5 py-4')}
                >
                  {href === '/contact' ? (
                    <Button href={href} type="a">
                      <span className="anim-items-header inline-block translate-y-24">
                        {isFrench ? text.fr : text.en}
                      </span>
                    </Button>
                  ) : (
                    <Link
                      className="anim-items-header link link_white-80 cursor-button inline-block translate-y-24 whitespace-nowrap pt-0.5 uppercase"
                      href={href}
                      scroll={false}
                      onMouseLeave={useResetMagnet}
                      onMouseMove={(e) => useMagnet(e, 1)}
                    >
                      {isFrench ? text.fr : text.en}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
