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
      types: ['branding', 'branding', 'branding'],
    },
    {
      title: 'pregen',
      imageCover: '/images/projects/project2.jpeg',
      types: ['branding', 'branding', 'branding'],
    },
    {
      title: 'pregen',
      imageCover: '/images/projects/project3.jpeg',
      types: ['branding', 'branding', 'branding'],
    },
    {
      title: 'pregen',
      imageCover: '/images/projects/project4.jpeg',
      types: ['branding', 'branding', 'branding'],
    },
  ];

  return projects;
};
