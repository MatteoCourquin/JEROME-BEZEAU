import { fetchPaths } from '@/services/paths.sevices';
import { fetchPhoto } from '@/services/photo.sevices';
import { Photo } from '@/services/photos.sevices';
import { GetStaticPropsContext } from 'next';
import { useEffect } from 'react';

export default function Page({ photo }: { photo: Photo }) {
  useEffect(() => {
    console.info(photo);
  }, []);

  return (
    <>
      <div></div>
    </>
  );
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const { params } = context;

  const photo = await fetchPhoto(params);

  return {
    props: {
      photo: photo || null,
      params,
    },
  };
};

export const getStaticPaths = () => {
  const path = fetchPaths();
  const paths = path.map((photo: Photo) => ({
    params: { photo: photo.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};
