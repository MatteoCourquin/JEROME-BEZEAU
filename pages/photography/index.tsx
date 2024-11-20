import ScrollerPhotography from '@/components/sections/ScrollerPhotography';
import SliderPhotography from '@/components/sections/SliderPhotography';
import { useMatchMedia } from '@/hooks/useCheckScreenSize';
import { fetchPhotos } from '@/services/photos.sevices';
import { BREAKPOINTS } from '@/tailwind.config';
import { Photo } from '@/types';

export default function Page({ photos }: { photos: Photo[] }) {
  const isMobile = useMatchMedia(BREAKPOINTS.MD);

  return (
    <>
      {isMobile ? <ScrollerPhotography photos={photos} /> : <SliderPhotography photos={photos} />}
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
