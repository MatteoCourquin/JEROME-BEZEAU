import { type SchemaTypeDefinition } from 'sanity';
import { blockContent } from './blockContent';
import { projectTypes } from './projectTypes';
import { projects } from './projects';
import { photos } from './photos';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [projectTypes, projects, photos, blockContent],
};
