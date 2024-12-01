import { useMagnet, useResetMagnet } from '@/hooks/useMagnet';
import { useLanguage } from '@/providers/language.provider';
import { useRef } from 'react';
import AnimatedText from '../atoms/AnimatedText';
import Button from '../atoms/Button';
import { IconArrow } from '../atoms/Icons';

const About = () => {
  const { isFrench } = useLanguage();
  const wrapperSectionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={wrapperSectionRef}
      className="relative flex min-h-screen flex-col justify-center gap-10 px-x-default py-y-default md:items-center md:text-center"
    >
      <AnimatedText
        className="subtitle !text-white-80"
        isTriggerAnim={true}
        trigger={wrapperSectionRef}
        variant="h2"
      >
        {isFrench
          ? 'Salut, je suis Jérôme, un Directeur Artistique Digital de Paris.'
          : 'Hey, I’m Jérôme, a Digital Art Director from Paris.'}
      </AnimatedText>
      <AnimatedText
        className="subtitle overflow-hidden !text-white md:w-2/3"
        isScrubAnim={true}
        isTriggerAnim={true}
        trigger={wrapperSectionRef}
      >
        {isFrench
          ? 'Morbi pellentesque vestibulum tristique massa. Cursus urna eu ac lectus. Iaculis amet sem consectetur semper pellentesque diam molestie sodales sit.'
          : 'Morbi pellentesque vestibulum tristique massa. Cursus urna eu ac lectus. Iaculis amet sem consectetur semper pellentesque diam molestie sodales sit.'}
      </AnimatedText>
      <Button className="w-fit" href="/about" type="a">
        {isFrench ? 'EN SAVOIR PLUS' : 'MORE ABOUT ME'}
      </Button>
      <div
        className="cursor-button flex flex-col items-center gap-2 self-center pt-y-default md:absolute md:bottom-[20%]"
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
