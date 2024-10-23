export type Photo = {
  title: string;
  slug: string;
  imageCover: string;
};

export const photos = [
  {
    title: 'projet 1',
    slug: 'projet-1',
    imageCover: '/images/projects/project1.jpeg',
  },
  {
    title: 'projet au titre long',
    slug: 'projet-au-titre-long',
    imageCover: '/images/projects/project2.jpeg',
  },
  {
    title: 'super projet',
    slug: 'super-projet',
    imageCover: '/images/projects/project3.jpeg',
  },
  {
    title: 'Lorem',
    slug: 'lorem',
    imageCover: '/images/projects/project4.jpeg',
  },
];

export const fetchPhotos = async () => {
  return photos;
};
