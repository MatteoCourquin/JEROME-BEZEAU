import About from '@/components/sections/About';
import Contact from '@/components/sections/Contact';
import Hero from '@/components/sections/Hero';
import ProjectsHome from '@/components/sections/ProjectsHome';
import { fetchProjects } from '@/services/projects.sevices';
import { Project } from '@/types';

export default function Page({ projects }: { projects: Project[] }) {
  return (
    <>
      <Hero />
      <About />
      <ProjectsHome projects={projects} />
      <Contact />
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
