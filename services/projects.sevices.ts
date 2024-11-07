import { client } from '@/sanity/lib/client';
import { ParsedUrlQuery } from 'querystring';
import { Image, Slug, TypedObject } from 'sanity';
import { Tags } from './tags.services';

export enum SECTIONS_TYPES {
  TEXT = 'text',
  IMAGE = 'image',
  // VIDEO = 'video',
}

type Author = {
  name: string;
  websiteUrl: string;
};

type Credit = {
  author: Author;
  role: Tags;
};

type Sections = {
  sectionType: string;
  text: {
    contentFr: TypedObject[];
    contentEn: TypedObject[];
  };
  image: Image;
  // video: Video;
};

export type Project = {
  title: string;
  descriptionFr: TypedObject[];
  descriptionEn: TypedObject[];
  slug: Slug;
  tags: Tags[];
  date: string;
  ogImage: Image;
  mainImage: Image;
  credits: Credit[];
  // mainVideo: ???;
  projectUrl: string;
  sections: Sections[];
};

export const fetchPaths = async () => {
  const query = `
    *[_type == "projects"] {
      slug,
      title
    }
  `;

  const projects = await client.fetch(query);

  const paths = projects.map((project: Project) => ({
    slug: project.slug.current,
    title: project.title,
  }));

  return paths;
};

export const fetchProjects = async () => {
  const query = `
    *[_type == "projects"] {
      title,
      slug,
      "tags": tags[]->{
        labelFr,
        labelEn,
        value
      },
      ogImage,
      mainImage,
      projectUrl
    }
  `;

  const projects = await client.fetch(query);

  return projects;
};

export const fetchSingleProject = async (params: ParsedUrlQuery | undefined) => {
  const query = `
    *[_type == "projects" && slug.current == $project][0] {
      title,
      slug,
      date,
      descriptionFr,
      descriptionEn,
      "tags": tags[]->{
        labelFr,
        labelEn,
        value
      },
      credits[]{
        "author": author->{
          name,
          websiteUrl
        },
        "role": role->{
          labelEn,
          labelFr,
          value
        }
      },
      ogImage,
      mainImage,
      projectUrl,
      sections[]{
        sectionType,
        "text": {
          "contentFr": contentFr[],
          "contentEn": contentEn[]
        },
        "image": image.asset->url
      }
    }
  `;

  const project = await client.fetch(query, {
    project: params?.project,
  });

  return project;
};
