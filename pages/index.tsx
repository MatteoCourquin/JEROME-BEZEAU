import Button from '@/components/Button';
import CardProject from '@/components/CardProject';
import { IconArrow } from '@/components/Icons';
import { fetchProjects, Project } from '@/services/projects.sevices';
import { useParallax } from '@/utils/animations';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import gsap from 'gsap';
import Image from 'next/image';
import { useRef } from 'react';

export default function Home({ projects }: { projects: Project[] }) {
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
    <>
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
      <section className="relative flex min-h-screen flex-col justify-center gap-10 px-x-default py-y-default md:items-center md:text-center">
        <h2 className="subtitle !text-white-80">
          Hey, I’m Jérôme, a Digital Art Director from Paris.
        </h2>
        <p className="subtitle md:w-2/3">
          Morbi pellentesque vestibulum tristique massa. Cursus urna eu ac lectus. Iaculis amet sem
          consectetur semper pellentesque diam molestie sodales sit.
        </p>
        <Button as="a" className="w-fit" href="/about">
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
        <Button as="a" className="mx-auto w-fit" href="/work">
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
