import { client } from '@/sanity/lib/client';

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
