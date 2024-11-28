import DynamicTitle from '@/components/atoms/DynamicTitle';
import RichText from '@/components/atoms/RichText';
import Tag, { TAG_VARIANT } from '@/components/atoms/Tag';
import Video from '@/components/atoms/Video';
import { useMatchMedia } from '@/hooks/useCheckScreenSize';
import { useLanguage } from '@/providers/language.provider';
import { fetchPaths, fetchSingleProject } from '@/services/projects.sevices';
import { BREAKPOINTS } from '@/tailwind.config';
import { Project, SECTIONS_TYPES } from '@/types';
import { formatDateToYear, getFirstName } from '@/utils';
import { GetStaticPropsContext } from 'next';
import Image from 'next/image';

export default function Page({ project }: { project: Project }) {
  const { isFrench } = useLanguage();

  const isSmallMobile = useMatchMedia(BREAKPOINTS.SM);
  const isTablet = useMatchMedia(BREAKPOINTS.MD);
  const isDesktop = useMatchMedia(BREAKPOINTS.LG);

  return (
    <>
      <section className="overflow-hidden pt-header">
        <div className="grid grid-cols-1 gap-x-[20%] gap-y-y-half-default py-y-default lg:grid-cols-[6fr,4fr] lg:px-x-default">
          {isTablet ? (
            <DynamicTitle coefficient={1.2}>{project.title}</DynamicTitle>
          ) : (
            <h1 className="pl-x-default uppercase lg:pl-0">{project.title}</h1>
          )}
          <div className="mt-auto pb-[3%] pl-x-default lg:pl-0">
            <p className="text-white-80">{formatDateToYear(project.date)}</p>
          </div>
          <div>
            {project.tags && (
              <div className="smoother-x-black">
                <div className="no-scrollbar flex gap-2 overflow-scroll px-x-default lg:px-0">
                  {project.tags.map((tag, index) => (
                    <Tag key={tag.value.current + index} variant={TAG_VARIANT.LIGHT}>
                      {isFrench ? tag.labelFr : tag.labelEn}
                    </Tag>
                  ))}
                </div>
              </div>
            )}
            {!isDesktop && (
              <RichText
                className="pt-y-half-default"
                value={isFrench ? project.descriptionFr : project.descriptionEn}
              />
            )}
          </div>
          {project.credits && (
            <div className="flex flex-col px-x-default lg:p-0">
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
                        className="link link_white-80 cursor-button whitespace-nowrap"
                        href={credit.author.websiteUrl}
                        target="_blank"
                      >
                        {isSmallMobile ? getFirstName(credit.author.name) : credit.author.name}
                      </a>
                    ) : (
                      <p className="whitespace-nowrap text-white-40">
                        {isSmallMobile ? getFirstName(credit.author.name) : credit.author.name}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {isDesktop && (
            <RichText
              className="px-x-default pt-y-half-default"
              value={isFrench ? project.descriptionFr : project.descriptionEn}
            />
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
                <Image
                  key={section.sectionType + index}
                  alt={section.sectionType}
                  className="w-full"
                  src={section.image}
                  unoptimized
                />
              );
            }
            if (section.sectionType === SECTIONS_TYPES.VIDEO && section.video) {
              return (
                <Video key={section.sectionType + index} className="h-full w-full object-cover">
                  <source src={section.video} type="video/webm" />
                  <source src={section.video} type="video/mp4" />
                </Video>
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
