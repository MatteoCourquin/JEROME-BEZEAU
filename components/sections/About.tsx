import { useMagnet, useResetMagnet } from '@/hooks/useMagnet';
import { useLanguage } from '@/providers/language.provider';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';
import AnimatedText, { AnimatedTextRef } from '../atoms/AnimatedText';
import Button from '../atoms/Button';
import { IconArrow } from '../atoms/Icons';

const About = () => {
  const { isFrench } = useLanguage();
  const wrapperSectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<AnimatedTextRef>(null);
  const descriptionRef = useRef<AnimatedTextRef>(null);

  useGSAP(() => {
    const textAnimationTitle = titleRef.current?.textAnimation();
    const textAnimationDescription = descriptionRef.current?.textAnimation();

    if (!textAnimationTitle || !textAnimationDescription) return;

    gsap
      .timeline({
        scrollTrigger: {
          trigger: wrapperSectionRef.current,
          start: 'top 50%',
          toggleActions: 'play none none reverse',
        },
      })
      .add(textAnimationTitle)
      .add(textAnimationDescription, '-=0.6');
  }, []);

  return (
    <section
      ref={wrapperSectionRef}
      className="relative flex min-h-screen flex-col justify-center gap-10 px-x-default py-y-default md:items-center md:text-center"
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
  );
};

export default About;
