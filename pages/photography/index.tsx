import SliderPhotography from '@/components/sections/SliderPhotography';
import { fetchPhotos, Photo } from '@/services/photos.sevices';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function PagePhotography({ photos }: { photos: Photo[] }) {
  return (
    <>
      <SliderPhotography photos={photos} />
    </>
  );
}

export async function getStaticProps() {
  const photos = await fetchPhotos();

  return {
    props: {
      photos,
    },
  };
}
