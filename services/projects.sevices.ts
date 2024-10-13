export type Project = {
  title: string;
  imageCover?: string;
  videoCover?: string;
  types: string[];
};

export const fetchProjects = async () => {
  const projects = [
    {
      title: 'pregen',
      videoCover: '/video/video.webm',
      types: ['branding', 'dev', 'design'],
    },
    {
      title: 'pregen',
      imageCover: '/images/projects/project2.jpeg',
      types: ['branding'],
    },
    {
      title: 'pregen',
      imageCover: '/images/projects/project3.jpeg',
      types: ['dev', 'design'],
    },
    {
      title: 'pregen',
      imageCover: '/images/projects/project4.jpeg',
      types: ['dev', 'design', 'branding'],
    },
  ];

  return projects;
};
