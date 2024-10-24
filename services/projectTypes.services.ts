import { client } from '@/sanity/lib/client';
import { Slug } from 'sanity';

export type ProjectType = {
  labelFr: string;
  labelEn: string;
  value: Slug;
};

export const fetchProjectTypes = async () => {
  const query = `
    *[_type == "projectTypes"] {
      labelFr,
      labelEn,
      value
    }
  `;

  const projectTypes = await client.fetch(query);

  return projectTypes;
};
