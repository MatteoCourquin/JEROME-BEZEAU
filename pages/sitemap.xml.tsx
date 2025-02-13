import { fetchPaths as fetchProjectPaths } from '@/services/photos.sevices';
import { fetchPaths as fetchPhotoPaths } from '@/services/works.sevices';
import { Photo, Work } from '@/types';
import { GetServerSideProps } from 'next';

const Sitemap = () => null;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const works = await fetchProjectPaths();
  const photos = await fetchPhotoPaths();

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
        xmlns:xhtml="http://www.w3.org/1999/xhtml" 
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd 
        http://www.w3.org/1999/xhtml 
        http://www.w3.org/2002/08/xhtml/xhtml1-strict.xsd">
  <url>
    <loc>https://www.jeromebezeau.com</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://www.jeromebezeau.com/work</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://www.jeromebezeau.com/about</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.jeromebezeau.com/contact</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.7</priority>
  </url>
  ${works
    .map(
      (work: Work) => `
  <url>
    <loc>https://www.jeromebezeau.com/work/${work.slug.current}</loc>
    <lastmod>${work.updatedAt}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  `,
    )
    .join('')}
  ${photos
    .map(
      (photo: Photo) => `
  <url>
    <loc>https://www.jeromebezeau.com/photography/${photo.slug.current}</loc>
    <lastmod>${photo.updatedAt}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  `,
    )
    .join('')}
</urlset>`;

  res.setHeader('Content-Type', 'application/xml');
  res.write(sitemap.trim());
  res.end();

  return { props: {} };
};

export default Sitemap;
