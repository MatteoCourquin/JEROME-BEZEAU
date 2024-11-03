import ProjectsWork from '@/components/sections/ProjectsWork';
import { LanguageContext } from '@/layout/default';
import { fetchProjects, Project } from '@/services/projects.sevices';
import { useContext } from 'react';

export default function Work({ projects }: { projects: Project[] }) {
  const { isFrench } = useContext(LanguageContext);

  return (
    <>
      <section className="relative flex flex-col items-center justify-center px-x-default pt-header">
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
