import { type SchemaTypeDefinition } from 'sanity';
import authors from './authors';
import { blockContent } from './blockContent';
import { photos } from './photos';
import { tags } from './tags';
import { works } from './works';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [tags, works, authors, photos, blockContent],
};
