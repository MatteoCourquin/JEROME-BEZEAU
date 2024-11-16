import { Tags } from './tags.type';

type Author = {
  name: string;
  websiteUrl: string;
};

export type Credit = {
  author: Author;
  role: Tags;
};
