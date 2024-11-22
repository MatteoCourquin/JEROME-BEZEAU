import { RocketIcon } from '@sanity/icons';
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list';
import type { StructureResolver } from 'sanity/structure';

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S, context) =>
  S.list()
    .title('PORTFOLIO')
    .items([
      orderableDocumentListDeskItem({
        type: 'projects',
        title: 'PROJECTS',
        icon: RocketIcon,
        S,
        context,
      }),
      // S.documentTypeListItem('projects').title('PROJECTS'),
      S.divider(),
      S.documentTypeListItem('photos').title('PHOTOS'),
      S.divider(),
      S.documentTypeListItem('tags').title('TAGS'),
      S.documentTypeListItem('authors').title('AUTHORS'),
      // ...S.documentTypeListItems().filter((item) => {
      //   return item.getId() && !['category'].includes(item.getId()!);
      // }),
    ]);
