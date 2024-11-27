import Contact from '@/components/sections/Contact';
import ProjectsWork from '@/components/sections/ProjectsWork';
import { useLanguage } from '@/providers/language.provider';
import { fetchProjects } from '@/services/projects.sevices';
import { Project } from '@/types';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';

export default function Page({ projects }: { projects: Project[] }) {
  const { isFrench } = useLanguage();

  const wrapperRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
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
        <h1 className="py-y-default">{isFrench ? 'PROJETS' : 'WORK'}</h1>
      </div>
      <div className="pt-header">
        <div className="py-y-default" />
      </div>
      <ProjectsWork ref={wrapperRef} projects={projects} />
      <Contact />
    </>
  );
}

export async function getStaticProps() {
  const allProjects = await fetchProjects();

  const projects = Array.from({ length: 10 }, (_, i) => allProjects[i % allProjects.length]);
  return {
    props: {
      projects,
    },
  };
}
