import AnimatedText, { AnimatedTextRef } from '@/components/atoms/AnimatedText';
import RichText from '@/components/atoms/RichText';
import Tag, { TAG_VARIANT } from '@/components/atoms/Tag';
import Video from '@/components/atoms/Video';
import Credits, { AnimatedCreditRef } from '@/components/Credits';
import { useMatchMedia } from '@/hooks/useCheckScreenSize';
import { useLanguage } from '@/providers/language.provider';
import { fetchPaths, fetchSingleProject } from '@/services/projects.sevices';
import { BREAKPOINTS } from '@/tailwind.config';
import { Project, SECTIONS_TYPES } from '@/types';
import { formatDateToYear } from '@/utils';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { GetStaticPropsContext } from 'next';
import Image from 'next/image';
import { useRef } from 'react';

export default function Page({ project }: { project: Project }) {
  const { isFrench } = useLanguage();
  const isTablet = useMatchMedia(BREAKPOINTS.MD);

  const titleRef = useRef<AnimatedTextRef>(null);
  const yearRef = useRef<AnimatedTextRef>(null);
  const tagsRef = useRef<HTMLDivElement>(null);
  const creditsRefs = useRef<Array<AnimatedCreditRef | null>>([]);
  const descriptionWrapperRef = useRef(null);

  const descriptionRef = useRef(null);

  useGSAP(() => {
    const animTitle = titleRef.current?.textAnimation();
    const animYear = yearRef.current?.textAnimation();

    if (!animTitle || !animYear) return;
    const timeline = gsap
      .timeline({
        delay: 1.6,
      })
      .add(animTitle, '-=0.4')
      .add(animYear, '-=0.4');

    if (project.tags && tagsRef.current) {
      const { children } = tagsRef.current;
      timeline.fromTo(
        children,
        {
          scale: 0,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.3,
          ease: 'power3.out',
          stagger: 0.1,
        },
        '-=0.4',
      );
    }

    if (project.credits) {
      creditsRefs.current.map((ref, index) => {
        const anim = ref?.textAnimation();
        if (!anim) return;
        timeline.add(anim, index === 0 ? '-=0.6' : '-=0.9');
      });
    }

    if (project.descriptionEn || (project.descriptionFr && descriptionRef.current)) {
      gsap.set(descriptionWrapperRef.current, {
        scaleX: 0,
        transformOrigin: 'left center',
      });

      gsap.set(descriptionRef.current, {
        scaleX: 1,
        transformOrigin: 'left center',
      });

      timeline.to(
        descriptionWrapperRef.current,
        {
          scaleX: 1,
          duration: 0.8,
          ease: 'power2.inOut',
          onUpdate: () => {
            const currentScale = gsap.getProperty(descriptionWrapperRef.current, 'scaleX');
            if (currentScale !== 0) {
              gsap.set(descriptionRef.current, {
                scaleX: 1 / Number(currentScale),
                transformOrigin: 'left center',
              });
            }
          },
        },
        '-=1.2',
      );
    }
  }, []);

  return (
    <>
      <section className="min-h-screen overflow-hidden pt-header">
        <div className="grid grid-cols-1 gap-y-half-default gap-x-5 px-x-default pb-y-default pt-y-half-default lg:grid-cols-12">
          <div className="uppercase lg:col-span-6">
            <AnimatedText
              ref={titleRef}
              className="w-full translate-y-[25%] whitespace-nowrap text-center uppercase md:text-left"
              isRandomAnim={true}
              variant="h1"
              style={{
                fontSize: isTablet
                  ? `calc(120vw / ${project.title.length})`
                  : 'clamp(2.5rem, 6vw, 8rem)',
                lineHeight: isTablet
                  ? `calc(120vw / ${project.title.length})`
                  : 'clamp(2.5rem, 6vw, 8rem)',
              }}
            >
              {project.title}
            </AnimatedText>
          </div>
          <div className="mt-auto pb-[3%] lg:col-span-4 lg:-col-end-1">
            <AnimatedText ref={yearRef} className="translate-y-[30%] text-white-80" variant="p">
              {formatDateToYear(project.date).toString()}
            </AnimatedText>
          </div>
          {project.tags && (
            <div className="smoother-x-black absolute -left-x-default w-screen sm:left-0 sm:block lg:col-span-6">
              <div
                ref={tagsRef}
                className="no-scrollbar flex gap-2 overflow-scroll px-x-default py-3 sm:overflow-visible sm:p-0 sm:px-0"
              >
                {project.tags.map((tag, index) => (
                  <Tag
                    key={tag.value.current + index}
                    className="origin-left"
                    variant={TAG_VARIANT.LIGHT}
                  >
                    {isFrench ? tag.labelFr : tag.labelEn}
                  </Tag>
                ))}
              </div>
            </div>
          )}
          <div className="lg:col-span-6">
            <div ref={descriptionWrapperRef} className="origin-left overflow-hidden">
              <div ref={descriptionRef} className="w-full origin-left pt-y-half-default">
                <RichText
                  className="whitespace-normal"
                  value={isFrench ? project.descriptionFr : project.descriptionEn}
                />
              </div>
            </div>
          </div>
          {project.credits && (
            <div className="row-start-4 flex flex-col pt-y-half-default sm:pt-0 lg:col-span-4 lg:-col-end-1 lg:row-span-2 lg:row-start-2">
              <p className="pb-10">CREDITS :</p>
              <ul className="flex flex-col gap-3">
                {project.credits.map((credit, index) => (
                  <Credits
                    key={credit.author.name + index}
                    ref={(el) => {
                      creditsRefs.current[index] = el;
                    }}
                    author={credit.author.name}
                    href={credit.author.websiteUrl}
                    role={isFrench ? credit.role.labelFr : credit.role.labelEn}
                  />
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
                <Image
                  key={section.sectionType + index}
                  alt={section.sectionType}
                  className="w-full"
                  height={1080}
                  src={section.image}
                  width={1920}
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
