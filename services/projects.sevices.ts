import { client } from '@/sanity/lib/client';
import { Project } from '@/types';
import { ParsedUrlQuery } from 'querystring';

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
      "mainImage": mainImage.asset->url,
      "mainVideo": mainVideo.asset->url,
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
      "mainImage": mainImage.asset->url,
      projectUrl,
      sections[]{
        sectionType,
        "text": {
          "contentFr": contentFr[],
          "contentEn": contentEn[]
        },
        "image": image.asset->url,
        "video": video.asset->url
      }
    }
  `;

  const project = await client.fetch(query, {
    project: params?.project,
  });

  return project;
};
