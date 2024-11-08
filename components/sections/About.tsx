import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useContext, useRef } from 'react';
import { IconArrow } from '../atoms/Icons';
import Button from '../atoms/Button';
import { LanguageContext } from '@/layout/default';

const About = () => {
  const { isFrench } = useContext(LanguageContext);

  const wrapperSectionRef = useRef(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  const { contextSafe } = useGSAP();

  const scrollTriggerAnim = contextSafe(() => {
    if (!wrapperSectionRef.current || !descriptionRef.current || !titleRef.current) return;

    const titleWords = titleRef.current.querySelectorAll('.anim-text');
    const descriptionWords = descriptionRef.current.querySelectorAll('.anim-text');

    gsap
      .timeline({
        scrollTrigger: {
          trigger: wrapperSectionRef.current,
          start: 'top 50%',
          toggleActions: 'play none none reverse',
        },
      })
      .add(
        gsap.fromTo(
          titleWords,
          {
            y: 100,
          },
          {
            y: 0,
            stagger: 0.01,
            duration: 0.8,
            ease: 'power2.out',
          },
        ),
      )
      .add(
        gsap.fromTo(
          descriptionWords,
          {
            y: 100,
          },
          {
            y: 0,
            stagger: 0.01,
            duration: 0.8,
            ease: 'power2.out',
          },
        ),
        '-=0.6',
      );
  });

  const scrollScrubAnim = contextSafe(() => {
    if (!wrapperSectionRef.current || !descriptionRef.current || !titleRef.current) return;

    const descriptionWords = descriptionRef.current.querySelectorAll('.anim-text');

    gsap.to(descriptionWords, {
      opacity: 0.4,
      stagger: 0.3,
      duration: 0.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: wrapperSectionRef.current,
        start: 'top top',
        end: 'bottom 80%',
        scrub: true,
      },
    });
  });

  useGSAP(() => {
    scrollTriggerAnim();
    scrollScrubAnim();
  }, []);

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
      <h2 ref={titleRef} className="subtitle !text-white-80">
        {title.split(' ').map((word, index) => (
          <span key={index} className="inline-block overflow-hidden">
            <span className="anim-text inline-block">
              {word}
              {index !== title.split(' ').length - 1 && '\u00A0'}
            </span>
          </span>
        ))}
      </h2>
      <p ref={descriptionRef} className="subtitle overflow-hidden !text-white md:w-2/3">
        {text.split(' ').map((word, index) => (
          <span key={index} className="inline-block overflow-hidden">
            <span className="anim-text inline-block opacity-[0.12]">
              {word}
              {index !== text.split(' ').length - 1 && '\u00A0'}
            </span>
          </span>
        ))}
      </p>
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
