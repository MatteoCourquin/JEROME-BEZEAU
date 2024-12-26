import { Image, Slug, TypedObject } from 'sanity';
import { Tags } from './tags.type';
import { Credit } from './credits.type';
import { Sections } from './sections.type';

export type Work = {
  title: string;
  descriptionFr: TypedObject[];
  descriptionEn: TypedObject[];
  slug: Slug;
  updatedAt: string;
  tags: Tags[];
  date: string;
  ogImage: Image;
  mainImage: string;
  mainVideo: string;
  credits: Credit[];
  workUrl: string;
  sections: Sections[];
};
