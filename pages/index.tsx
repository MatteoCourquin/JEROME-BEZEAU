import About from '@/components/sections/About';
import Hero from '@/components/sections/Hero';
import ProjectsHome from '@/components/sections/ProjectsHome';
import { fetchProjects, Project } from '@/services/projects.sevices';
import Contact from './contact';

export default function Home({ projects }: { projects: Project[] }) {
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
