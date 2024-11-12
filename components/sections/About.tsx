import { LanguageContext } from '@/layout/default';
import { useContext, useRef } from 'react';
import AnimatedText from '../AnimatedText';
import Button from '../atoms/Button';
import { IconArrow } from '../atoms/Icons';

const About = () => {
  const { isFrench } = useContext(LanguageContext);
  const wrapperSectionRef = useRef(null);

  const title = isFrench
    ? 'Salut, je suis Jérôme, un Directeur Artistique Digital de Paris.'
    : 'Hey, I’m Jérôme, a Digital Art Director from Paris.';
  const text = isFrench
    ? 'Morbi pellentesque vestibulum tristique massa. Cursus urna eu ac lectus. Iaculis amet sem consectetur semper pellentesque diam molestie sodales sit.'
    : 'Morbi pellentesque vestibulum tristique massa. Cursus urna eu ac lectus. Iaculis amet sem consectetur semper pellentesque diam molestie sodales sit.';
  return (
    <section
      ref={wrapperSectionRef}
      className="relative flex min-h-screen flex-col justify-center gap-10 px-x-default py-y-default md:items-center md:text-center"
    >
      <AnimatedText
        className="subtitle !text-white-80"
        isTriggerAnim={true}
        text={title}
        trigger={wrapperSectionRef}
        variant="h2"
      />
      <AnimatedText
        className="subtitle overflow-hidden !text-white md:w-2/3"
        isScrubAnim={true}
        isTriggerAnim={true}
        text={text}
        trigger={wrapperSectionRef}
      />
      <Button className="w-fit" href="/about" type="a">
        MORE ABOUT ME
      </Button>
      <div
        className="cursor-button absolute bottom-[20%] flex flex-col items-center gap-2 self-center"
        onClick={() => window.scrollTo({ top: window.innerHeight * 1.9, behavior: 'smooth' })}
      >
        <IconArrow className="rotate-90" />
        <p className="text-white-80">MY WORK</p>
      </div>
    </section>
  );
};

export default About;
