import { useMatchMedia } from '@/hooks/useCheckScreenSize';
import { useTouchDevice } from '@/hooks/useTouchDevice';
import { useLanguage } from '@/providers/language.provider';
import { BREAKPOINTS } from '@/tailwind.config';
import { Project } from '@/types';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import gsap from 'gsap';
import CustomEase from 'gsap/dist/CustomEase';
import Image from 'next/image';
import Link from 'next/link';
import { forwardRef, MouseEvent, useEffect, useImperativeHandle, useRef, useState } from 'react';
import Tag, { TAG_VARIANT } from './atoms/Tag';
import Video from './atoms/Video';
import DetailsProject from './DetailsProject';

interface CardProjectProps {
  project: Project;
  className?: string;
  originTransform: string;
}

export interface AnimatedCardRef {
  cardAnimation: () => gsap.core.Tween;
}

const CardProject = forwardRef<AnimatedCardRef, CardProjectProps>(
  ({ project, className, originTransform }, ref) => {
    const { isFrench } = useLanguage();
    const isTablet = useMatchMedia(BREAKPOINTS.MD);

    const cardRef = useRef<HTMLDivElement>(null);
    const wrapperImageRef = useRef<HTMLAnchorElement>(null);
    const containerImageRef = useRef(null);
    const imageRef = useRef(null);
    const detailsRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef(null);
    const tagsRef = useRef<HTMLDivElement>(null);

    const [isRight, setIsRight] = useState(false);
    const [isActive, setIsActive] = useState(false);

    const { contextSafe } = useGSAP();

    const updateIsRight = contextSafe(() => {
      if (!cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const windowCenterX = window.innerWidth / 2;

      setIsRight(centerX < windowCenterX);

      if (isTablet) {
        gsap.to(detailsRef.current, {
          scale: 0,
          duration: 0.2,
          ease: 'power2.out',
        });
      }
    });

    useImperativeHandle(ref, () => ({
      cardAnimation: () =>
        gsap.fromTo(
          containerImageRef.current,
          {
            scale: 0,
          },
          {
            scale: 1,
            duration: 0.6,
            ease: 'power2.out',
          },
        ),
    }));

    useEffect(() => {
      updateIsRight();
      window.addEventListener('resize', updateIsRight);

      return () => {
        window.removeEventListener('resize', updateIsRight);
      };
    });

    useGSAP(() => {
      if (!wrapperImageRef.current) return;

      gsap.fromTo(
        wrapperImageRef.current,
        {
          scale: 0,
        },
        {
          scale: 1,
          ease: CustomEase.create(
            'custom',
            'M0,0 C-0.017,0.362 0.253,0.691 0.44,0.822 0.655,0.972 0.818,1.001 1,1 ',
          ),
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 80%',
            end: 'bottom 60%',
            toggleActions: 'play none none reverse',
            scrub: true,
          },
        },
      );
    });

    useGSAP(() => {
      if (!isTablet || !tagsRef.current) return;
      const { children } = tagsRef.current;

      gsap
        .timeline({
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'bottom 90%',
            end: 'bottom top',
            toggleActions: 'play none none reverse',
          },
        })
        .from(titleRef.current, {
          y: -100,
          ease: 'power3.out',
        })
        .fromTo(
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
            stagger: 0.12,
          },
        );
    }, [isTablet]);

    const handleMouseMove = contextSafe((e: MouseEvent<HTMLAnchorElement>, duration: number) => {
      if (!detailsRef.current || useTouchDevice() || window.innerWidth <= BREAKPOINTS.MD) return;

      gsap.to(detailsRef.current, {
        left: e.clientX + (isRight ? 10 : -10),
        top: e.clientY - 90,
        duration: duration,
        ease: 'power4.out',
      });
    });

    useGSAP(() => {
      if (!imageRef.current) return;

      gsap.to(imageRef.current, {
        y: 200,
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top bottom',
          end: 'bottom top',
          toggleActions: 'play none none reverse',
          scrub: true,
        },
      });
    });

    return (
      <>
        {!isTablet && (
          <div
            ref={detailsRef}
            className={clsx(
              isRight ? '-translate-x-0 justify-start' : '-translate-x-full justify-end',
              'pointer-events-none fixed z-50 hidden md:flex',
            )}
          >
            <DetailsProject
              isActive={isActive}
              isRight={isRight}
              tags={project.tags}
              title={project.title}
            />
          </div>
        )}
        <div className={className}>
          <div ref={cardRef} className="relative aspect-square overflow-hidden">
            <Link
              ref={wrapperImageRef}
              aria-label={'View project ' + project.title}
              href={'/work/' + project.slug.current}
              scroll={false}
              className={clsx(
                originTransform,
                'cursor-button absolute h-full w-full overflow-hidden',
              )}
              onMouseOut={() => setIsActive(false)}
              onMouseEnter={(e) => {
                handleMouseMove(e, 0);
                setIsActive(true);
              }}
              onMouseMove={(e) => {
                handleMouseMove(e, 0.8);
                setIsActive(true);
              }}
            >
              <div
                ref={containerImageRef}
                className={clsx(originTransform, 'aspect-square h-full w-full overflow-hidden')}
              >
                {project.mainVideo ? (
                  <Video
                    className="absolute bottom-0 h-full w-full object-cover"
                    poster={project.mainImage}
                  >
                    <source src={project.mainVideo} type="video/webm" />
                    <source src={project.mainVideo} type="video/mp4" />
                  </Video>
                ) : (
                  <Image
                    ref={imageRef}
                    alt={project.title}
                    className="absolute bottom-0 aspect-square !h-[calc(100%+200px)] w-full object-cover"
                    height={1200}
                    src={project.mainImage}
                    width={1200}
                    unoptimized
                  />
                )}
              </div>
            </Link>
          </div>
          <div className="flex flex-col pb-20 pt-5 md:hidden">
            <div className="h-fit overflow-hidden">
              <h2 ref={titleRef} className="text-2xl font-bold">
                {project.title}
              </h2>
            </div>
            <div className="relative w-full">
              {project.tags && (
                <div className="smoother-x-black absolute -left-x-default w-screen">
                  <div
                    ref={tagsRef}
                    className="no-scrollbar flex gap-[5px] overflow-x-scroll px-x-default py-5"
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
            </div>
          </div>
        </div>
      </>
    );
  },
);

export default CardProject;
