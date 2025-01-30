import DraggablePhotos from '@/components/DraggablePhotos';
import ListPhotos from '@/components/ListPhotos';
import SEO from '@/components/SEO';
import { useMatchMedia } from '@/hooks/useCheckScreenSize';
import { fetchPaths, fetchSinglePhoto } from '@/services/photos.sevices';
import { BREAKPOINTS } from '@/tailwind.config';
import { Photo } from '@/types';
import { GetStaticPropsContext } from 'next';

export default function Page({ photo }: { photo: Photo }) {
  const isTablet = useMatchMedia(BREAKPOINTS.MD);
  return (
    <>
      <SEO title={'Jérôme BEZEAU • ' + photo.title} />
      {isTablet ? <ListPhotos photo={photo} /> : <DraggablePhotos photo={photo} />}
    </>
  );
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const { params } = context;

  const photo = await fetchSinglePhoto(params);

  return {
    props: {
      photo,
      params,
    },
  };
};

export const getStaticPaths = async () => {
  const paths = (await fetchPaths()).map((photo: Photo) => ({
    params: { photo: photo.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};
