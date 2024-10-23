import { ParsedUrlQuery } from 'querystring';
import { photos } from './photos.sevices';

export const fetchPhoto = async (params: ParsedUrlQuery | undefined) => {
  // const query = `
  //   *[_type == "projects" && slug.current == $project][0] {
  //     projectIndex,
  //     title,
  //     slug,
  //     ogImage,
  //     mainImageDesktop,
  //     mainImageMobile,
  //     descriptionEn,
  //     descriptionFr,
  //     websiteUrl,
  //     gallery,
  //     "authors": authors[]->{
  //       name,
  //       websiteUrl
  //     },
  //   }
  // `;

  // const project = await client.fetch(query, {
  //   project: params?.project,
  // });

  const photo = photos.find((photo) => photo.slug === params?.project);

  return photo;
};
