import { client } from '@/sanity/lib/client';
import { ParsedUrlQuery } from 'querystring';
import { Image, Slug } from 'sanity';
import { Tags } from './tags.services';

export type Video = {
  webm: string;
  mp4: string;
};

export type Author = {
  name: string;
  websiteUrl: string;
};

export type Credit = {
  author: Author;
  role: Tags;
};

export type Project = {
  title: string;
  slug: Slug;
  tags: Tags[];
  date: string;
  ogImage: Image;
  mainImage: Image;
  credits: Credit[];
  // mainVideo: ???;
  projectUrl: string;
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
      projectUrl
    }
  `;

  const project = await client.fetch(query, {
    project: params?.project,
  });

  return project;
};
