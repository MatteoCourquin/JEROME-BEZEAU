import { client } from '@/sanity/lib/client';
import { Slug } from 'sanity';

export type Tags = {
  labelFr: string;
  labelEn: string;
  value: Slug;
};

export const fetchTags = async () => {
  const query = `
    *[_type == "tags"] {
      labelFr,
      labelEn,
      value
    }
  `;

  const tags = await client.fetch(query);

  return tags;
};
