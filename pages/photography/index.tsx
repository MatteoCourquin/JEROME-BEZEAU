import ScrollerPhotographyDesktop from '@/components/sections/ScrollerPhotographyDesktop';
import ScrollerPhotographyMobile from '@/components/sections/ScrollerPhotographyMobile';
import { useMatchMedia } from '@/hooks/useCheckScreenSize';
import { useLanguage } from '@/providers/language.provider';
import { fetchPhotos } from '@/services/photos.sevices';
import { BREAKPOINTS } from '@/tailwind.config';
import { Photo } from '@/types';
import Head from 'next/head';

export default function Page({ photos }: { photos: Photo[] }) {
  const isTablet = useMatchMedia(BREAKPOINTS.MD);
  const { isFrench } = useLanguage();

  return (
    <>
      <Head>
        <title>{'Jérôme BEZEAU • ' + (isFrench ? 'Photographie' : 'Photography')}</title>
        <link href="https://www.jeromebezeau.com/photography/" rel="canonical" />
        <meta content="https://www.jeromebezeau.com/photography/" property="og:url" />
      </Head>
      {isTablet ? (
        <ScrollerPhotographyMobile photos={photos} />
      ) : (
        <ScrollerPhotographyDesktop photos={photos} />
      )}
    </>
  );
}

export async function getStaticProps() {
  const photosSingle = await fetchPhotos();

  const photos = Array.from({ length: 30 }, (_, i) => photosSingle[i % photosSingle.length]);

  return {
    props: {
      photos,
    },
  };
}
