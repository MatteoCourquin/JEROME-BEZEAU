import ScrollerPhotographyDesktop from '@/components/sections/ScrollerPhotographyDesktop';
import ScrollerPhotographyMobile from '@/components/sections/ScrollerPhotographyMobile';
import { useMatchMedia } from '@/hooks/useCheckScreenSize';
import { fetchPhotos } from '@/services/photos.sevices';
import { BREAKPOINTS } from '@/tailwind.config';
import { Photo } from '@/types';

export default function Page({ photos }: { photos: Photo[] }) {
  const isTablet = useMatchMedia(BREAKPOINTS.MD);

  return (
    <>
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
