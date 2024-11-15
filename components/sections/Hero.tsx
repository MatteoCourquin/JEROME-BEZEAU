import { useMagnet, useParallax, useResetMagnet } from '@/utils/animations';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';
import { useContext, useRef } from 'react';
import { IconArrow } from '../atoms/Icons';
import gsap from 'gsap';
import { LanguageContext } from '@/layout/default';

const Hero = () => {
  const { isFrench } = useContext(LanguageContext);

  const imageRef = useRef(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const timeline = useRef(gsap.timeline({ paused: true }));

  useGSAP(() => {
    if (!titleRef.current || !subtitleRef.current || !imageRef.current) return;

    const titleSpan = titleRef.current.querySelector('span');
    const subtitleSpan = subtitleRef.current.querySelector('span');

    timeline.current
      .fromTo(
        titleSpan,
        { yPercent: 105 },
        { yPercent: 0, duration: 1, ease: 'power3.out', delay: 1 },
      )
      .fromTo(
        subtitleSpan,
        { yPercent: 100 },
        { yPercent: 0, duration: 1, ease: 'power3.out' },
        '-=0.6',
      )
      .play();

    useParallax(titleRef.current, 0.2);
    useParallax(subtitleRef.current, 0.2);
    useParallax(imageRef.current, 0.2, 'bottom');
  });

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-x-default py-y-default text-center">
      <Image
        ref={imageRef}
        alt=""
        className="absolute inset-0 -z-[1] h-screen w-screen object-cover"
        height={1080}
        src="/images/JB.jpeg"
        width={1920}
        priority
      />
      <h1 ref={titleRef} className="overflow-hidden">
        <span className="inline-block pt-5">JÉRÔME BEZEAU</span>
      </h1>
      <p ref={subtitleRef} className="subtitle overflow-hidden">
        <span className="inline-block">
          {isFrench ? 'Directeur artistique & Designer digital' : 'Art Director & Digital designer'}
        </span>
      </p>
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
