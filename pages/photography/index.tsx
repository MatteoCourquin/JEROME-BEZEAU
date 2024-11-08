import SliderPhotography from '@/components/sections/SliderPhotography';
import { fetchPhotos, Photo } from '@/services/photos.sevices';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Page({ photos }: { photos: Photo[] }) {
  return (
    <>
      <SliderPhotography photos={photos} />
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
