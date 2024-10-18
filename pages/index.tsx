import About from '@/components/sections/About';
import Hero from '@/components/sections/Hero';
import Projects from '@/components/sections/Projects';
import { fetchProjects, Project } from '@/services/projects.sevices';
import Contact from './contact';

export default function Home({ projects }: { projects: Project[] }) {
  return (
    <>
      <Hero />
      <About />
      <Projects projects={projects} />
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
