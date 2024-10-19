export type Photo = {
  title: string;
  imageCover: string;
};

export const fetchPhotos = async () => {
  const photos = [
    {
      title: 'projet 1',
      imageCover: '/images/projects/project1.jpeg',
    },
    {
      title: 'projet au titre long',
      imageCover: '/images/projects/project2.jpeg',
    },
    {
      title: 'super projet',
      imageCover: '/images/projects/project3.jpeg',
    },
    {
      title: 'Lorem',
      imageCover: '/images/projects/project4.jpeg',
    },
  ];

  return photos;
};
