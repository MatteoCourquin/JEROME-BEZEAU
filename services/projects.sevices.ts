export type Video = {
  webm?: string;
  mp4?: string;
};

export type Project = {
  title: string;
  imageCover?: string;
  videoCover?: Video;
  types: string[];
};

export const fetchProjects = async () => {
  const projects = [
    {
      title: 'pregen',
      videoCover: {
        webm: '/video/video.webm',
        mp4: '/video/video.mp4',
      },
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
