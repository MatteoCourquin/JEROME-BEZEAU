import { fetchPaths, fetchSingleProject, Project } from '@/services/projects.sevices';
import { GetStaticPropsContext } from 'next';
import { useEffect } from 'react';

export default function Page({ project }: { project: Project }) {
  useEffect(() => {
    console.info(project);
  }, []);

  return (
    <>
      <div></div>
    </>
  );
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const { params } = context;

  const project = await fetchSingleProject(params);

  return {
    props: {
      project,
      params,
    },
  };
};

export const getStaticPaths = async () => {
  const paths = (await fetchPaths()).map((project: Project) => ({
    params: { project: project.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};
