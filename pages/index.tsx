import Button from '@/components/Button';
import CardProject from '@/components/CardProject';
import { IconArrow } from '@/components/Icons';
import { fetchProjects, Project } from '@/services/projects.sevices';
import { useParallax } from '@/utils/animations';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import Image from 'next/image';
import { useRef } from 'react';

export default function Home({ projects }: { projects: Project[] }) {
  const imageRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useGSAP(() => {
    useParallax(titleRef.current, 0.3);
    useParallax(subtitleRef.current, 0.2);
    useParallax(imageRef.current, 0.2, 'bottom');
  });
  return (
    <>
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-x-default py-y-default text-center">
        <Image
          src="/images/JB.jpeg"
          width={1920}
          height={1080}
          ref={imageRef}
          alt=""
          className="absolute inset-0 -z-[1] h-screen w-screen object-cover"
        />
        <h1 ref={titleRef}>JÉRÔME BEZEAU</h1>
        <p ref={subtitleRef} className="subtitle">
          Art Director & Digital designer
        </p>
        <div
          className="absolute bottom-y-default flex h-[58px] w-[58px] cursor-pointer items-center justify-center"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <IconArrow className="w-fit rotate-90" />
        </div>
      </section>
      <section className="relative flex min-h-screen flex-col justify-center gap-10 px-x-default py-y-default md:items-center md:text-center">
        <h2 className="subtitle !text-white-80">
          Hey, I’m Jérôme, a Digital Art Director from Paris.
        </h2>
        <p className="subtitle md:w-2/3">
          Morbi pellentesque vestibulum tristique massa. Cursus urna eu ac lectus. Iaculis amet sem
          consectetur semper pellentesque diam molestie sodales sit.
        </p>
        <Button as="a" href="/about" className="w-fit">
          MORE ABOUT ME
        </Button>
        <div
          className="absolute bottom-[20%] flex cursor-pointer flex-col items-center gap-2 self-center"
          onClick={() => window.scrollTo({ top: window.innerHeight * 1.9, behavior: 'smooth' })}
        >
          <IconArrow className="rotate-90" />
          <p className="text-white-80">MY WORK</p>
        </div>
      </section>
      <section className="flex min-h-screen flex-col gap-y-default px-x-default py-y-default">
        <h2 className="heading1">CURATED WORKS</h2>
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
                originTransform={clsx(
                  index === 0 && 'origin-top-left',
                  index !== 0 && index % 2 === 0 && 'origin-top-left md:origin-top-right',
                  index !== 0 && index % 2 !== 0 && 'origin-top-left',
                )}
                project={project}
              />
              <div className="hidden grow md:block"></div>
            </div>
          ))}
        </div>
        <Button as="a" href="/work" className="mx-auto w-fit">
          MORE WORKS
        </Button>
      </section>
      <section className="flex min-h-screen flex-col gap-y-default px-x-default py-y-default">
        <h2 className="heading1">CONTACT ME</h2>
      </section>
    </>
  );
}

export async function getStaticProps() {
  const projects = await fetchProjects();

  return {
    props: {
      projects,
    },
  };
}
