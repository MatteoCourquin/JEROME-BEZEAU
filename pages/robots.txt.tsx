import { GetServerSideProps } from 'next';

const Robots = () => null;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const robots = `User-agent: *
Allow: /
Allow: /work
Allow: /photography
Allow: /about
Allow: /contact
Disallow: /api/
Disallow: /_next/
Disallow: /static/
Disallow: /studio
Crawl-delay: 1
Sitemap: https://jeromebezeau.com/sitemap.xml`;

  res.setHeader('Content-Type', 'text/plain');
  res.write(robots);
  res.end();

  return { props: {} };
};

export default Robots;
