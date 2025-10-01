import { useMatchMedia } from '@/hooks/useCheckScreenSize';
import { useMagnet, useResetMagnet } from '@/hooks/useMagnet';
import { useParallax } from '@/hooks/useParallax';
import { useLanguage } from '@/providers/language.provider';
import { BREAKPOINTS } from '@/tailwind.config';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import AnimatedText, { AnimatedTextRef } from '../atoms/AnimatedText';
import { IconArrow } from '../atoms/Icons';

const Hero = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const titleRef = useRef<AnimatedTextRef>(null);
  const subtitleRef = useRef<AnimatedTextRef>(null);
  const wrapperTitleRef = useRef(null);
  const wrapperSubtitleRef = useRef(null);
  const wrapperColumnsRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  const [columnsNumbers, setColumnsNumbers] = useState(12);

  const isMobile = useMatchMedia(BREAKPOINTS.SM);
  const isTablet = useMatchMedia(BREAKPOINTS.LG);
  const { isFrench } = useLanguage();
  const { contextSafe } = useGSAP();

  useParallax(wrapperTitleRef.current, 0.07);
  useParallax(wrapperSubtitleRef.current, 0.06);
  useParallax(imageRef.current, 0.05);

  const getColumnsNumber = useCallback(() => {
    if (isMobile) return 4;
    if (isTablet) return 6;
    return 12;
  }, [isMobile, isTablet]);

  const revealAnimation = contextSafe(() => {
    const animTitle = titleRef.current?.textAnimation();
    const animSubtitle = subtitleRef.current?.textAnimation();

    if (!animTitle || !animSubtitle) return;

    gsap
      .timeline({
        delay: 1,
      })
      .add(animTitle)
      .add(animSubtitle, '-=0.4')
      .play();
  });

  const createScrubAnimation = useCallback(() => {
    if (!sectionRef.current || !wrapperColumnsRef.current) return;

    timelineRef.current = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: () => window.innerHeight * 2,
        pin: true,
        scrub: true,
        id: 'hero-scrub',
        onRefresh: () => {
          if (timelineRef.current && wrapperColumnsRef.current) {
            timelineRef.current.clear();
            timelineRef.current.to(wrapperColumnsRef.current.children, {
              scaleY: 1,
              stagger: 0.03,
              ease: 'power3.inOut',
            });
          }
        },
      },
    });

    scrollTriggerRef.current = ScrollTrigger.getById('hero-scrub') || null;

    timelineRef.current.to(wrapperColumnsRef.current.children, {
      scaleY: 1,
      stagger: 0.03,
      ease: 'power3.inOut',
    });
  }, []);

  useGSAP(() => {
    revealAnimation();
    createScrubAnimation();
  });

  useEffect(() => {
    setColumnsNumbers(getColumnsNumber());
  }, [isMobile, isTablet, getColumnsNumber]);

  useEffect(() => {
    if (timelineRef.current && wrapperColumnsRef.current) {
      timelineRef.current.clear();
      timelineRef.current.to(wrapperColumnsRef.current.children, {
        scaleY: 1,
        stagger: 0.03,
        ease: 'power3.inOut',
      });
    }
  }, [columnsNumbers]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen flex-col justify-center overflow-hidden px-x-default py-y-default text-left sm:items-center sm:text-center"
    >
      <div
        ref={wrapperColumnsRef}
        className="fixed inset-0 z-0 grid h-screen w-screen gap-x-5 px-x-default"
        style={{
          gridTemplateColumns: `repeat(${columnsNumbers}, 1fr)`,
        }}
      >
        <div className="absolute left-0 -z-10 h-screen w-x-default origin-bottom scale-y-0 bg-black" />
        {[...Array(columnsNumbers)].map((_, i) => (
          <div
            key={i}
            className={clsx(
              'relative h-full origin-bottom scale-y-0 border-x border-dashed border-[#808080]/15 bg-black',
              'after:absolute after:right-full after:-z-10 after:h-screen after:w-5 after:-translate-x-px after:bg-black after:content-[""]',
            )}
            style={{
              zIndex: i + 2 * -1,
            }}
          />
        ))}
        <div className="absolute right-0 -z-10 h-screen w-x-default origin-bottom scale-y-0 bg-black" />
      </div>
      <div ref={imageRef} className="absolute inset-0 -z-[1] h-[120vh] w-screen">
        <Image
          alt="Jérôme Bezeau"
          className="absolute -z-10 h-full w-full object-cover object-[80%] lg:object-right"
          height={1080}
          src="/images/jerome-bezeau.jpg"
          width={1920}
          priority
        />
      </div>

      <div ref={wrapperTitleRef}>
        <AnimatedText ref={titleRef} className="h-fit" isRandomAnim={true} variant="h1">
          JÉRÔME BEZEAU
        </AnimatedText>
      </div>
      <div ref={wrapperSubtitleRef}>
        <AnimatedText ref={subtitleRef} as="subtitle" className="h-fit" variant="p">
          {isFrench ? 'Directeur artistique & Designer digital' : 'Art Director & Digital designer'}
        </AnimatedText>
      </div>

      <div
        className="cursor-button absolute bottom-y-default flex h-[58px] w-[58px] items-center justify-center"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        onMouseLeave={(e) => useResetMagnet(e)}
        onMouseMove={(e) => useMagnet(e, 1)}
      >
        <IconArrow className="w-fit rotate-90" />
      </div>
    </section>
  );
};

export default Hero;
