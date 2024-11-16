import { Image, Slug } from 'sanity';

export type Photo = {
  title: string;
  slug: Slug;
  mainImage: string;
  gallery: Image[];
};
