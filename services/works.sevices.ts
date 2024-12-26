import { client } from '@/sanity/lib/client';
import { Work } from '@/types';
import { ParsedUrlQuery } from 'querystring';

export const fetchPaths = async () => {
  const query = `
    *[_type == "works"] {
      slug,
      title,
      "updatedAt" : _updatedAt
    }
  `;

  const works = await client.fetch(query);

  const paths = works.map((work: Work) => ({
    slug: work.slug.current,
    title: work.title,
    updatedAt: work.updatedAt,
  }));

  return paths;
};

export const fetchWorks = async () => {
  const query = `
    *[_type == "works"] | order(orderRank) {
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
      workUrl
    }
  `;

  const works = await client.fetch(query);

  return works;
};

export const fetchSingleWork = async (params: ParsedUrlQuery | undefined) => {
  const query = `
    *[_type == "works" && slug.current == $work][0] {
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
      workUrl,
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

  const work = await client.fetch(query, {
    work: params?.work,
  });

  return work;
};
