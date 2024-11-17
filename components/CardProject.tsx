import { BREAKPOINTS } from '@/tailwind.config';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import gsap from 'gsap';
import CustomEase from 'gsap/dist/CustomEase';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';
import { MouseEvent, useEffect, useRef, useState } from 'react';
import DetailsProject from './DetailsProject';
import { Project } from '@/types';
import { useTouchDevice } from '@/hooks/useTouchDevice';
import Video from './atoms/Video';

gsap.registerPlugin(ScrollTrigger, CustomEase);

const CardProject = ({
  project,
  className,
  originTransform,
}: {
  project: Project;
  className?: string;
  originTransform: string;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const wrapperImageRef = useRef<HTMLAnchorElement>(null);
  const imageRef = useRef(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  const [isRight, setIsRight] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const { contextSafe } = useGSAP();

  const updateIsRight = contextSafe(() => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const windowCenterX = window.innerWidth / 2;

    setIsRight(centerX < windowCenterX);

    if (window.innerWidth <= BREAKPOINTS.MD) {
      gsap.to(detailsRef.current, {
        scale: 0,
        duration: 0.2,
        ease: 'power2.out',
      });
    }
  });

  useEffect(() => {
    updateIsRight();
    window.addEventListener('resize', updateIsRight);

    return () => {
      window.removeEventListener('resize', updateIsRight);
    };
  });

  useGSAP(() => {
    if (!wrapperImageRef.current) return;

    gsap.to(wrapperImageRef.current, {
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
    });
  });

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
    <div ref={cardRef} className={clsx('relative aspect-square overflow-hidden', className)}>
      <div
        ref={detailsRef}
        className={clsx(
          isRight ? '-translate-x-0 justify-start' : '-translate-x-full justify-end',
          'pointer-events-none fixed z-50 flex',
        )}
      >
        <DetailsProject
          isActive={isActive}
          isRight={isRight}
          title={project.title}
          types={project.tags}
        />
      </div>
      <Link
        ref={wrapperImageRef}
        href={'/work/' + project.slug.current}
        scroll={false}
        className={clsx(
          originTransform,
          'cursor-button absolute h-full w-full scale-0 overflow-hidden',
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
        {project.mainVideo ? (
          <Video
            className="absolute bottom-0 aspect-square h-full w-full object-cover"
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
      </Link>
    </div>
  );
};

export default CardProject;
