export type Project = {
  tile: string;
  imageCover: string;
  type: string[];
};

export const fetchProjects = async () => {
  const projects = [
    {
      tile: 'pregen',
      imageCover: '/images/projects/project1.jpeg',
      type: ['branding', 'branding', 'branding'],
    },
    {
      tile: 'pregen',
      imageCover: '/images/projects/project2.jpeg',
      type: ['branding', 'branding', 'branding'],
    },
    {
      tile: 'pregen',
      imageCover: '/images/projects/project3.jpeg',
      type: ['branding', 'branding', 'branding'],
    },
    {
      tile: 'pregen',
      imageCover: '/images/projects/project4.jpeg',
      type: ['branding', 'branding', 'branding'],
    },
  ];

  return projects;
};
