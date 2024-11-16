import RichText from '@/components/atoms/RichText';
import { LanguageContext } from '@/layout/default';
import { fetchPaths, fetchSingleProject } from '@/services/projects.sevices';
import { Project, SECTIONS_TYPES } from '@/types';
import { useMagnet, useResetMagnet } from '@/utils/animations';
import { formatDateToYear } from '@/utils/functions';
import { GetStaticPropsContext } from 'next';
import { useContext } from 'react';

export default function Page({ project }: { project: Project }) {
  const { isFrench } = useContext(LanguageContext);

  return (
    <>
      <section className="pt-header">
        <div className="grid grid-cols-1 gap-x-[20%] gap-y-y-half-default px-x-default py-y-default lg:grid-cols-[6fr,4fr]">
          <h1 className="uppercase">{project.title}</h1>
          <div className="mt-auto pb-[3%]">
            <p className="text-white-80">{formatDateToYear(project.date)}</p>
          </div>
          <div>
            {project.tags && (
              <div className="flex gap-2 pb-y-half-default">
                {project.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="tag !bg-[#ffffff0a] backdrop-blur-xl"
                    onMouseLeave={(e) => useResetMagnet(e)}
                    onMouseMove={(e) => useMagnet(e, 0.8)}
                  >
                    {isFrench ? tag.labelFr : tag.labelEn}
                  </span>
                ))}
              </div>
            )}
            <RichText value={isFrench ? project.descriptionFr : project.descriptionEn} />
          </div>
          {project.credits && (
            <div className="flex flex-col">
              <p className="pb-10">CREDITS :</p>
              <ul className="flex flex-col gap-3">
                {project.credits.map((credit, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-x-5 transition-[padding-left] hover:pl-3"
                  >
                    <span className="uppercase text-white-40">
                      {isFrench ? credit.role.labelFr : credit.role.labelEn}
                    </span>
                    <div className="h-px grow bg-white-12"></div>
                    {credit.author.websiteUrl ? (
                      <a
                        className="link link_white-80 cursor-button"
                        href={credit.author.websiteUrl}
                        target="_blank"
                      >
                        {credit.author.name}
                      </a>
                    ) : (
                      <p className="text-white-40">{credit.author.name}</p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
      {project.sections && (
        <section className="px-x-default pb-y-default">
          {project.sections.map((section, index) => {
            if (
              section.sectionType === SECTIONS_TYPES.TEXT &&
              section.text.contentEn &&
              section.text.contentFr
            ) {
              return (
                <div key={section.sectionType + index} className="w-full py-y-default md:w-1/2">
                  <RichText value={isFrench ? section.text.contentFr : section.text.contentEn} />
                </div>
              );
            }
            if (section.sectionType === SECTIONS_TYPES.IMAGE && section.image) {
              return (
                <img
                  key={section.sectionType + index}
                  alt={section.sectionType}
                  className="w-full"
                  src={section.image}
                />
              );
            }
            if (section.sectionType === SECTIONS_TYPES.VIDEO && section.video) {
              return (
                <video
                  key={section.sectionType + index}
                  className="h-full w-full object-cover"
                  src={section.video}
                  autoPlay
                  loop
                  muted
                />
              );
            }
          })}
        </section>
      )}
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
