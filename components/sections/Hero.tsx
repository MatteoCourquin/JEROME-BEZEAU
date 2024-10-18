import { useParallax } from '@/utils/animations';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';
import { useRef } from 'react';
import { IconArrow } from '../Icons';
import gsap from 'gsap';

const Hero = () => {
  const imageRef = useRef(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const timeline = useRef(gsap.timeline({ paused: true }));

  useGSAP(() => {
    if (!titleRef.current || !subtitleRef.current || !imageRef.current) return;

    const titleSpan = titleRef.current.querySelector('span');
    const subtitleSpan = subtitleRef.current.querySelector('span');

    timeline.current
      .add(
        gsap.fromTo(
          titleSpan,
          { yPercent: 105 },
          { yPercent: 0, duration: 1, ease: 'power3.out', delay: 1 },
        ),
      )
      .add(
        gsap.fromTo(
          subtitleSpan,
          { yPercent: 100 },
          { yPercent: 0, duration: 1, ease: 'power3.out' },
        ),
        '-=0.6',
      )
      .play();

    useParallax(titleRef.current, 0.3);
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
      />
      <h1 ref={titleRef} className="overflow-hidden">
        <span className="inline-block pt-4">JÉRÔME BEZEAU</span>
      </h1>
      <p ref={subtitleRef} className="subtitle overflow-hidden">
        <span className="inline-block">Art Director & Digital designer</span>
      </p>
      <div
        className="absolute bottom-y-default flex h-[58px] w-[58px] cursor-pointer items-center justify-center"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <IconArrow className="w-fit rotate-90" />
      </div>
    </section>
  );
};

export default Hero;
