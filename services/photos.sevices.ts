import { client } from '@/sanity/lib/client';
import { Photo } from '@/types';
import { ParsedUrlQuery } from 'querystring';

export const fetchPaths = async () => {
  const query = `
    *[_type == "photos"] {
      slug,
      title,
      "updatedAt" : _updatedAt
    }
  `;

  const photos = await client.fetch(query);

  const paths = photos.map((photo: Photo) => ({
    slug: photo.slug.current,
    title: photo.title,
    updatedAt: photo.updatedAt,
  }));

  return paths;
};

export const fetchPhotos = async () => {
  const query = `
    *[_type == "photos"] {
      title,
      slug,
      "mainImage": mainImage.asset->url,
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
      "mainImage": mainImage.asset->url,
      "gallery": gallery[]{
        "url": asset->url,
        _key,
        asset
      }
    }
  `;

  const photo = await client.fetch(query, {
    photo: params?.photo,
  });

  const formattedGallery = Array.from({ length: 12 }, (_, index) => {
    return photo.gallery[index % photo.gallery.length];
  });

  return {
    ...photo,
    gallery: formattedGallery,
  };
};
