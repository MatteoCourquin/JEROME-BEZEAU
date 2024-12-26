import AnimatedText, { AnimatedTextRef } from '@/components/atoms/AnimatedText';
import Contact from '@/components/sections/Contact';
import WorksGallery from '@/components/sections/WorksGallery';
import { useLanguage } from '@/providers/language.provider';
import { fetchWorks } from '@/services/works.sevices';
import { Work } from '@/types';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';

export default function Page({ works }: { works: Work[] }) {
  const { isFrench } = useLanguage();

  const wrapperRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const titleAnimRef = useRef<AnimatedTextRef>(null);

  useGSAP(() => {
    const animTitle = titleAnimRef.current?.textAnimation();
    if (!animTitle) return;
    gsap
      .timeline({
        delay: 1,
      })
      .add(animTitle);

    if (!wrapperRef.current || !titleRef.current) return;

    const titleHeight = titleRef.current.clientHeight;

    gsap.fromTo(
      titleRef.current,
      {
        y: 0,
        opacity: 1,
      },
      {
        y: () => window.innerHeight - titleHeight,
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      },
    );
    gsap.fromTo(
      titleRef.current,
      {
        opacity: 1,
      },
      {
        opacity: 0,
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: `bottom-=${window.innerHeight} bottom`,
          end: `bottom-=${window.innerHeight / 2} bottom`,
          scrub: 1,
        },
      },
    );
  }, []);

  return (
    <>
      <div
        ref={titleRef}
        className="fixed top-0 flex w-full flex-col items-center justify-center px-x-default pt-header"
      >
        <AnimatedText ref={titleAnimRef} className="py-y-default" isRandomAnim={true} variant="h1">
          {isFrench ? 'PROJETS' : 'WORK'}
        </AnimatedText>
      </div>
      <div className="pb-y-default pt-header">
        <div className="py-y-default" />
      </div>
      <WorksGallery ref={wrapperRef} works={works} />
      <Contact />
    </>
  );
}

export async function getStaticProps() {
  const allWorks = await fetchWorks();

  const works = Array.from({ length: 10 }, (_, i) => allWorks[i % allWorks.length]);
  return {
    props: {
      works,
    },
  };
}
