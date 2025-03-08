import { useMagnet, useResetMagnet } from '@/hooks/useMagnet';
import { useParallax } from '@/hooks/useParallax';
import { useLanguage } from '@/providers/language.provider';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Image from 'next/image';
import { useRef } from 'react';
import AnimatedText, { AnimatedTextRef } from '../atoms/AnimatedText';
import { IconArrow } from '../atoms/Icons';

const Hero = () => {
  const { isFrench } = useLanguage();

  const imageRef = useRef(null);
  const titleRef = useRef<AnimatedTextRef>(null);
  const subtitleRef = useRef<AnimatedTextRef>(null);
  const wrapperTitleRef = useRef(null);
  const wrapperSubtitleRef = useRef(null);

  useGSAP(() => {
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

    if (!titleRef.current || !subtitleRef.current || !imageRef.current) return;

    useParallax(wrapperTitleRef.current, 0.2);
    useParallax(wrapperSubtitleRef.current, 0.2);
    useParallax(imageRef.current, 0.2, 'bottom');
  });

  return (
    <section className="relative flex min-h-screen flex-col justify-center overflow-hidden px-x-default py-y-default text-left sm:items-center sm:text-center">
      <div ref={imageRef} className="absolute inset-0 -z-[1] h-screen w-screen">
        <Image
          alt="Jérôme Bezeau"
          className="absolute -z-10 h-full w-full object-cover object-[80%] lg:object-right"
          height={1080}
          src="/images/jerome-bezeau.jpg"
          width={1920}
          priority
        />
        {/* <div className="absolute z-10 h-full w-full bg-black object-cover opacity-40" /> */}
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
