import { useMatchMedia } from '@/hooks/useCheckScreenSize';
import { useMagnet, useResetMagnet } from '@/hooks/useMagnet';
import { useLanguage } from '@/providers/language.provider';
import { BREAKPOINTS } from '@/tailwind.config';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import gsap from 'gsap';
import { useCallback, useEffect, useRef, useState } from 'react';
import AnimatedText, { AnimatedTextRef } from '../atoms/AnimatedText';
import Button from '../atoms/Button';
import { IconArrow } from '../atoms/Icons';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const About = () => {
  const { isFrench } = useLanguage();
  const wrapperSectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<AnimatedTextRef>(null);
  const descriptionRef = useRef<AnimatedTextRef>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const wrapperColumnsRef = useRef<HTMLDivElement>(null);

  const [columnsNumbers, setColumnsNumbers] = useState(12);

  const isMobile = useMatchMedia(BREAKPOINTS.SM);
  const isTablet = useMatchMedia(BREAKPOINTS.LG);

  const getColumnsNumber = useCallback(() => {
    if (isMobile) return 4;
    if (isTablet) return 6;
    return 12;
  }, [isMobile, isTablet]);

  useGSAP(() => {
    const textAnimationTitle = titleRef.current?.textAnimation();
    const textAnimationDescription = descriptionRef.current?.textAnimation();

    if (!textAnimationTitle || !textAnimationDescription) return;

    gsap
      .timeline({
        scrollTrigger: {
          trigger: wrapperSectionRef.current,
          start: 'top 40%',
          toggleActions: 'play none none reverse',
        },
      })
      .add(textAnimationTitle)
      .add(textAnimationDescription, '-=0.6');
  }, [isFrench]);

  const createScrubAnimation = useCallback(() => {
    if (!wrapperSectionRef.current || !wrapperColumnsRef.current) return;

    timelineRef.current = gsap.timeline({
      scrollTrigger: {
        start: 'top top',
        end: () => window.innerHeight * 0.8,
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
    createScrubAnimation();
  }, []);

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
    <>
      <div
        ref={wrapperColumnsRef}
        className="pointer-events-none fixed inset-0 -z-10 grid h-screen w-screen gap-x-5 px-x-default"
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
      <section
        ref={wrapperSectionRef}
        className="relative z-20 flex h-screen flex-col justify-center gap-10 px-x-default py-y-default md:items-center md:text-center"
      >
        <AnimatedText
          ref={titleRef}
          className="subtitle uppercase !text-white-80"
          isRandomAnim={true}
          variant="h2"
        >
          {isFrench
            ? 'Salut, je suis Jérôme, un Directeur Artistique Digital de Paris.'
            : 'Hey, I’m Jérôme, a Digital Art Director from Paris.'}
        </AnimatedText>
        <AnimatedText
          ref={descriptionRef}
          className="subtitle overflow-hidden !text-white md:w-2/3"
          isScrubAnim={true}
          trigger={wrapperSectionRef}
        >
          {isFrench
            ? 'Je conçois des identités visuelles, des sites web et des animations en motion design pour des marques qui veulent marquer les esprits. Un design impactant, une direction artistique soignée et des expériences immersives.'
            : 'I design visual identities, websites, and motion graphics for brands that want to make an impact. Thoughtful art direction, immersive experiences, and a sharp eye for detail.'}
        </AnimatedText>
        <Button className="w-fit" href="/about" type="a">
          {isFrench ? 'EN SAVOIR PLUS' : 'MORE ABOUT ME'}
        </Button>
        <div
          className="cursor-button flex flex-col items-center gap-2 self-center pt-y-default"
          onClick={() => window.scrollTo({ top: window.innerHeight * 1.9, behavior: 'smooth' })}
          onMouseLeave={(e) => useResetMagnet(e)}
          onMouseMove={(e) => useMagnet(e, 1)}
        >
          <IconArrow className="rotate-90" />
          <p className="text-white-80">{isFrench ? 'MES PROJETS' : 'MY WORK'}</p>
        </div>
      </section>
    </>
  );
};

export default About;
