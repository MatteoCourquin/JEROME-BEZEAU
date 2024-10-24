import { client } from '@/sanity/lib/client';
import { ParsedUrlQuery } from 'querystring';
import { Image, Slug } from 'sanity';

export type Photo = {
  title: string;
  slug: Slug;
  mainImage: Image;
  gallery: Image[];
};

export const fetchPaths = async () => {
  const query = `
    *[_type == "photos"] {
      slug,
      title
    }
  `;

  const photos = await client.fetch(query);

  const paths = photos.map((photo: Photo) => ({
    slug: photo.slug.current,
    title: photo.title,
  }));

  return paths;
};

export const fetchPhotos = async () => {
  const query = `
    *[_type == "photos"] {
      title,
      slug,
      mainImage,
      gallery
    }
  `;

  const photos = await client.fetch(query);

  return photos;
};

export const fetchSinglePhoto = async (params: ParsedUrlQuery | undefined) => {
  const query = `
    *[_type == "photos" && slug.current == $photo][0] {
      title,
      slug,
      mainImage,
      gallery
    }
  `;

  const photo = await client.fetch(query, {
    photo: params?.photo,
  });

  return photo;
};
