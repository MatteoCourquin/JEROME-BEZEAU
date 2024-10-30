import ProjectsWork from '@/components/sections/ProjectsWork';
import { fetchProjects, Project } from '@/services/projects.sevices';

export default function Work({ projects }: { projects: Project[] }) {
  return (
    <>
      <section className="relative flex flex-col items-center justify-center px-x-default pt-header">
        <h1 className="py-y-default">WORK</h1>
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
