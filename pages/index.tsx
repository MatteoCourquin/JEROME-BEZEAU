import About from '@/components/sections/About';
import Contact from '@/components/sections/Contact';
import Hero from '@/components/sections/Hero';
import WorksPreview from '@/components/sections/WorksPreview';
import { fetchWorks } from '@/services/works.sevices';
import { Work } from '@/types';

export default function Page({ works }: { works: Work[] }) {
  return (
    <>
      <Hero />
      <About />
      <WorksPreview works={works} />
      <Contact />
    </>
  );
}

export async function getStaticProps() {
  const works = await fetchWorks();

  return {
    props: {
      works,
    },
  };
}
