import type { StructureResolver } from 'sanity/structure';

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('PORTFOLIO')
    .items([
      S.documentTypeListItem('projects').title('PROJECTS'),
      S.documentTypeListItem('projectTypes').title('PROJECT TYPES'),
      S.divider(),
      S.documentTypeListItem('photos').title('PHOTOS'),
      // ...S.documentTypeListItems().filter((item) => {
      //   return item.getId() && !['category'].includes(item.getId()!);
      // }),
    ]);
