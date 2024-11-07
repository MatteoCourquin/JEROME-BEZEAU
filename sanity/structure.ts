import type { StructureResolver } from 'sanity/structure';

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('PORTFOLIO')
    .items([
      S.documentTypeListItem('projects').title('PROJECTS'),
      S.divider(),
      S.documentTypeListItem('photos').title('PHOTOS'),
      S.divider(),
      S.documentTypeListItem('tags').title('TAGS'),
      S.documentTypeListItem('authors').title('AUTHORS'),
      // ...S.documentTypeListItems().filter((item) => {
      //   return item.getId() && !['category'].includes(item.getId()!);
      // }),
    ]);
