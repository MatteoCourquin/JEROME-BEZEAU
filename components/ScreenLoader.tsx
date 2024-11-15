import { LanguageContext } from '@/layout/default';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import gsap from 'gsap';
import { LottieRefCurrentProps } from 'lottie-react';
import dynamic from 'next/dynamic';
import { useContext, useEffect, useRef, useState } from 'react';
import JBLottie from '../public/lottie/JB.json';
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

export default function ScreenLoader() {
  const { isFrench } = useContext(LanguageContext);
  const [columnsNumbers, setColumnsNumbers] = useState(12);
  const wrapperColumnsRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const iconRef = useRef(null);

  const lottieRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    setColumnsNumbers(window.innerWidth < 768 ? 6 : 12);

    const checkLottie = setInterval(() => {
      if (lottieRef.current) {
        lottieRef.current.stop();
        clearInterval(checkLottie);
      }
    }, 50);

    return () => clearInterval(checkLottie);
  }, []);

  useGSAP(() => {
    if (!wrapperColumnsRef.current || !textRef.current) return;

    const columns = wrapperColumnsRef.current.querySelectorAll('.column');
    const letters = textRef.current.querySelectorAll('.anim-letter');

    const columnsLeft = Array.from(columns)
      .slice(0, columnsNumbers / 2)
      .reverse();
    const columnsRight = Array.from(columns).slice(columnsNumbers / 2);

    gsap
      .timeline({
        delay: 0.2,
      })
      .add(
        gsap.to(letters, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.04,
        }),
      )
      .add(
        gsap.to([...letters].reverse(), {
          opacity: 0,
          y: -32,
          duration: 0.6,
          ease: 'power2.in',
          stagger: 0.04,
        }),
        '+=0.2',
      )
      .add(
        gsap.to(iconRef.current, {
          opacity: 1,
          y: -120,
          duration: 0.6,
          ease: 'power2.out',
        }),
        '-=0.6',
      )
      .add(() => lottieRef.current && lottieRef.current.play())
      .add(
        gsap.to(iconRef.current, {
          opacity: 0,
          duration: 0.2,
          ease: 'power2.out',
        }),
        '+=3',
      )
      .add(
        gsap.set(columns, {
          scaleY: 1,
        }),
      )
      .add(
        gsap.to(columnsLeft, {
          scaleY: 0,
          transformOrigin: 'top',
          duration: 0.8,
          ease: 'power4.inOut',
          stagger: 0.05,
        }),
      )
      .add(
        gsap.to(columnsRight, {
          scaleY: 0,
          transformOrigin: 'top',
          duration: 0.8,
          ease: 'power4.inOut',
          stagger: 0.05,
        }),
        '<',
      )
      .play();
  }, [columnsNumbers]);

  const title = isFrench ? 'BIENVENUE' : 'WELCOME';

  return (
    <div
      ref={wrapperColumnsRef}
      className={clsx(
        'transition-container pointer-events-none fixed inset-0 z-[950] grid h-lvh w-screen',
        `grid-cols-${columnsNumbers}`,
      )}
    >
      {[...Array(columnsNumbers)].map((_, i) => (
        <div key={i} className="column relative h-full w-[101%] origin-top bg-black" />
      ))}
      <h1
        ref={textRef}
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-full whitespace-nowrap uppercase text-white"
      >
        {title.split('').map((letter, index) => (
          <span key={index} className="anim-letter inline-block translate-y-8 opacity-0">
            {letter == ' ' ? '\u00A0' : letter}
          </span>
        ))}
      </h1>
      <div
        ref={iconRef}
        className="-translate-full fixed left-1/2 top-1/2 -translate-x-1/2 opacity-0"
      >
        <Lottie
          animationData={JBLottie}
          autoPlay={false}
          className="h-32"
          loop={false}
          lottieRef={lottieRef}
        />
      </div>
    </div>
  );
}
