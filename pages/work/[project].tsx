import { LanguageContext } from '@/layout/default';
import { fetchPaths, fetchSingleProject, Project } from '@/services/projects.sevices';
import { formatDateToYear } from '@/utils/functions';
import { GetStaticPropsContext } from 'next';
import { useContext, useEffect } from 'react';

export default function Page({ project }: { project: Project }) {
  const { isFrench } = useContext(LanguageContext);

  useEffect(() => {
    console.info(formatDateToYear(project.date));
  }, []);

  return (
    <section className="pt-header">
      <div className="grid grid-cols-2 gap-5 px-x-default py-y-default">
        <div className="flex flex-col gap-y-y-default">
          <h1 className="uppercase">{project.title}</h1>
          <p className="text-white-80">{formatDateToYear(project.date)}</p>
          <div>
            <h3 className="heading5">Egestas sit non elementum etiam viverra volut magna ?</h3>
            <p className="pt-7">
              Adipiscing aenean integer mattis aliquam proin aliquam convallis sit. Nulla pretium
              nibh fringilla praesent mi at nunc. Mattis sit eu dignissim at. Leo facilisis justo
              laoreet posuere nisl elementum nisi. Varius amet adipiscing eu mauris malesuada
              adipiscing tempor.
            </p>
          </div>
        </div>
        <div className="flex flex-col">
          <p>CREDITS</p>
          <ul>
            <li className="flex items-center gap-x-5">
              <span className="text-white-40">CODE</span>
              <div className="h-px grow bg-white-12"></div>
              <a href="">Matteo Courquin</a>
            </li>
          </ul>
        </div>
      </div>
    </section>
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
