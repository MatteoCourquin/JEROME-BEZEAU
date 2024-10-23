import { Photo, photos } from './photos.sevices';

export const fetchPaths = () => {
  const paths = photos.map((photo: Photo) => ({
    slug: photo.slug,
    title: photo.title,
  }));

  return paths;
};
