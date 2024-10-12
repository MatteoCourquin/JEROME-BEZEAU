import Button from '@/components/Button';
import CardProject from '@/components/CardProject';
import { IconArrow } from '@/components/Icons';
import { fetchProjects, Project } from '@/services/projects.sevices';
import clsx from 'clsx';
import Image from 'next/image';

export default function Home({ projects }: { projects: Project[] }) {
  return (
    <>
      <section className="relative flex h-screen flex-col items-center justify-center px-x-default py-y-default text-center">
        <Image
          src="/images/JB.jpeg"
          width={1920}
          height={1080}
          alt=""
          className="absolute inset-0 -z-[1] h-screen w-screen object-cover"
        />
        <h1>JÉRÔME BEZEAU</h1>
        <p className="subtitle">Art Director & Digital designer</p>
        <div
          className="absolute bottom-y-default flex h-[58px] w-[58px] cursor-pointer items-center justify-center"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <IconArrow className="w-fit rotate-90" />
        </div>
      </section>
      <section className="relative flex h-screen flex-col items-center justify-center gap-10 px-x-default py-y-default text-center">
        <h2 className="subtitle !text-white-80">
          Hey, I’m Jérôme, a Digital Art Director from Paris.
        </h2>
        <p className="subtitle w-2/3">
          Morbi pellentesque vestibulum tristique massa. Cursus urna eu ac lectus. Iaculis amet sem
          consectetur semper pellentesque diam molestie sodales sit.
        </p>
        <Button as="a" href="/work">
          MORE ABOUT ME
        </Button>
        <div
          className="absolute bottom-[20%] flex cursor-pointer flex-col items-center gap-2"
          onClick={() => window.scrollTo({ top: window.innerHeight * 1.9, behavior: 'smooth' })}
        >
          <IconArrow className="rotate-90" />
          <p className="text-white-80">MY WORK</p>
        </div>
      </section>
      <section className="min-h-screen px-x-default py-y-default flex flex-col gap-y-default">
        <h2 className="heading1">CURATED WORKS</h2>
        <div className="grid grid-cols-1 gap-x-5 md:grid-cols-2">
          {projects.map((project, index) => (
            <>
              <CardProject
                key={index}
                className={clsx(
                  'scale-0',
                  index === 0 && 'origin-top-left',
                  index !== 0 && index % 2 === 0 && 'origin-top-right md:col-start-1',
                  index !== 0 && index % 2 !== 0 && 'origin-top-left md:col-start-2',
                )}
                project={project}
              />

              <div />
            </>
          ))}
        </div>
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
