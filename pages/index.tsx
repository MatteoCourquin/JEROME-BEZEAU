import About from '@/components/sections/About';
import Contact from '@/components/sections/Contact';
import Hero from '@/components/sections/Hero';
import WorksPreview from '@/components/sections/WorksPreview';
import { fetchWorks } from '@/services/works.sevices';
import { Work } from '@/types';
import Head from 'next/head';

export default function Page({ works }: { works: Work[] }) {
  return (
    <>
      <Head>
        <title>Jérôme BEZEAU</title>
        <link href="https://www.jeromebezeau.com" rel="canonical" />
        <meta content="https://www.jeromebezeau.com" property="og:url" />
      </Head>
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
