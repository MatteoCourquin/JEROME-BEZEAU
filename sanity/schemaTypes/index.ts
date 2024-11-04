import { type SchemaTypeDefinition } from 'sanity';
import { blockContent } from './blockContent';
import { projects } from './projects';
import { photos } from './photos';
import { tags } from './tags';
import authors from './authors';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [tags, projects, authors, photos, blockContent],
};
