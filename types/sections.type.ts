import { TypedObject } from 'sanity';

export enum SECTIONS_TYPES {
  TEXT = 'text',
  IMAGE = 'image',
  VIDEO = 'video',
}

export type Sections = {
  sectionType: string;
  text: {
    contentFr: TypedObject[];
    contentEn: TypedObject[];
  };
  image: string;
  video: string;
};
