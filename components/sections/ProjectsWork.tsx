import { Project } from '@/services/projects.sevices';
import clsx from 'clsx';
import CardProject from '../CardProject';

const ProjectsWork = ({ projects }: { projects: Project[] }) => {
  const sequence = [
    {
      before: 0,
      size: 3,
      origin: 'right',
    },
    {
      before: 3,
      size: 5,
      origin: 'left',
    },
    {
      before: 8,
      size: 4,
      origin: 'left',
    },
    {
      before: 3,
      size: 5,
      origin: 'right',
    },
    {
      before: 0,
      size: 3,
      origin: 'right',
    },
    {
      before: 3,
      size: 4,
      origin: 'left',
    },
    {
      before: 7,
      size: 5,
      origin: 'left',
    },
    {
      before: 3,
      size: 4,
      origin: 'right',
    },
  ];

  const getColumnSpan = (index: number) => sequence[index % sequence.length];

  return (
    <section className="px-x-default">
      {projects.map((project, index) => {
        const { before, size, origin } = getColumnSpan(index);
        return (
          <div key={project.title + index} className="grid grid-cols-12 gap-x-5">
            <div className={clsx(`col-span-${size} col-start-${before + 1}`)}>
              <CardProject
                className="grow"
                originTransform={index === 0 ? 'origin-top-left' : `origin-top-${origin}`}
                project={project}
              />
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default ProjectsWork;
