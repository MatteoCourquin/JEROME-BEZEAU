export type Photo = {
  title: string;
  imageCover: string;
};

export const fetchPhotos = async () => {
  const photos = [
    {
      title: 'pregen',
      imageCover: '/images/projects/project1.jpeg',
    },
    {
      title: 'pregen',
      imageCover: '/images/projects/project2.jpeg',
    },
    {
      title: 'pregen',
      imageCover: '/images/projects/project3.jpeg',
    },
    {
      title: 'pregen',
      imageCover: '/images/projects/project4.jpeg',
    },
  ];

  return photos;
};
