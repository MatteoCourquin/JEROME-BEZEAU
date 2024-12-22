import { Image, Slug } from 'sanity';

export type Photo = {
  title: string;
  updatedAt: string;
  slug: Slug;
  mainImage: string;
  gallery: Image[];
};
