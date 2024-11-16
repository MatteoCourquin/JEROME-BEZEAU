import ProjectsWork from '@/components/sections/ProjectsWork';
import { useLanguage } from '@/providers/language.provider';
import { fetchProjects } from '@/services/projects.sevices';
import { Project } from '@/types';

export default function Page({ projects }: { projects: Project[] }) {
  const { isFrench } = useLanguage();

  return (
    <>
      <section className="sticky top-0 flex flex-col items-center justify-center px-x-default pt-header">
        <h1 className="py-y-default">{isFrench ? 'PROJETS' : 'WORK'}</h1>
      </section>
      <ProjectsWork projects={projects} />
    </>
  );
}
export async function getStaticProps() {
  const allProjects = await fetchProjects();

  const projects = Array.from({ length: 30 }, (_, i) => allProjects[i % allProjects.length]);
  return {
    props: {
      projects,
    },
  };
}
