import clsx from 'clsx';
import CardProject from '../CardProject';
import Button from '../atoms/Button';
import { Project } from '@/types';

const ProjectsHome = ({ projects }: { projects: Project[] }) => {
  return (
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
      <Button className="mx-auto w-fit" href="/work" type="a">
        MORE WORKS
      </Button>
    </section>
  );
};

export default ProjectsHome;
