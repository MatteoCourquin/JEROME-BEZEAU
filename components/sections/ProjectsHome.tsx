import { useLanguage } from '@/providers/language.provider';
import { Project } from '@/types';
import clsx from 'clsx';
import CardProject from '../CardProject';
import Button from '../atoms/Button';
import AnimatedText, { AnimatedTextRef } from '../atoms/AnimatedText';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const ProjectsHome = ({ projects }: { projects: Project[] }) => {
  const { isFrench } = useLanguage();

  const sectionRef = useRef(null);
  const titleRef = useRef<AnimatedTextRef>(null);

  useGSAP(() => {
    const textAnimationTitle = titleRef.current?.textAnimation();

    if (!textAnimationTitle) return;

    gsap
      .timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      })
      .add(textAnimationTitle);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="flex min-h-screen flex-col gap-y-default px-x-default py-y-default"
    >
      <AnimatedText ref={titleRef} as="h1" isRandomAnim={true} variant="h2">
        {isFrench ? 'QUELQUES PROJETS' : 'CURRATED WORKS'}
      </AnimatedText>
      <div className="flex flex-col gap-y-5 md:gap-y-0">
        {projects.map((project, index) => (
          <div
            key={project.title + index}
            className={clsx(
              'md:flex md:gap-x-5',
              index % 2 === 0 && 'md:flex-row',
              index % 2 !== 0 && 'md:flex-row-reverse',
            )}
          >
            <CardProject
              className="grow"
              project={project}
              originTransform={clsx(
                index === 0 && 'origin-top-left',
                index !== 0 && index % 2 === 0 && 'origin-top-left md:origin-top-right',
                index !== 0 && index % 2 !== 0 && 'origin-top-left',
              )}
            />
            <div className="hidden grow md:block"></div>
          </div>
        ))}
      </div>
      <Button className="mx-auto w-fit" href="/work" type="a">
        {isFrench ? 'PLUS DE PROJETS' : 'MORE WORKS'}
      </Button>
    </section>
  );
};

export default ProjectsHome;
