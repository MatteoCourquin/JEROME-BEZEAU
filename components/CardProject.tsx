import { Project } from '@/services/projects.sevices';
import { BREAKPOINTS } from '@/tailwind.config';
import { useTouchDevice } from '@/utils/states';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Image from 'next/image';
import { MouseEvent, useEffect, useRef, useState } from 'react';
import DetailsProject from './DetailsProject';

gsap.registerPlugin(ScrollTrigger);

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
  const wrapperImageRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  const [isRight, setIsRight] = useState(false);

  const { contextSafe } = useGSAP();

  useEffect(() => {
    const updateIsRight = () => {
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
    };

    updateIsRight();
    window.addEventListener('resize', updateIsRight);

    return () => {
      window.removeEventListener('resize', updateIsRight);
    };
  }, []);

  useGSAP(() => {
    if (!wrapperImageRef.current) return;

    gsap.to(wrapperImageRef.current, {
      scale: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: cardRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
        scrub: true,
      },
    });
  }, [wrapperImageRef]);

  const handleMouseMove = contextSafe((e: MouseEvent<HTMLDivElement>) => {
    if (!detailsRef.current || useTouchDevice() || window.innerWidth <= BREAKPOINTS.MD) return;

    gsap.to(detailsRef.current, {
      left: e.clientX + (isRight ? 10 : -10),
      top: e.clientY - 90,
      duration: 0.8,
      ease: 'power4.out',
    });
  });

  const handleMouseOut = contextSafe(() => {
    if (!detailsRef.current || useTouchDevice() || window.innerWidth <= BREAKPOINTS.MD) return;

    gsap.to(detailsRef.current, {
      scale: 0,
      duration: 0.2,
      ease: 'power2.out',
    });
  });

  const handleMouseEnter = contextSafe((e: MouseEvent<HTMLDivElement>) => {
    if (!detailsRef.current || useTouchDevice() || window.innerWidth <= BREAKPOINTS.MD) return;

    detailsRef.current.style.left = e.clientX + (isRight ? 10 : -10) + 'px';
    detailsRef.current.style.top = e.clientY - 90 + 'px';

    gsap.to(detailsRef.current, {
      scale: 1,
      duration: 0.2,
      ease: 'power2.out',
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
  }, [imageRef]);

  return (
    <div
      onMouseMove={(e) => {
        handleMouseMove(e);
        handleMouseEnter(e);
      }}
      onMouseOut={handleMouseOut}
      ref={cardRef}
      className={clsx('group/card-project relative aspect-square overflow-hidden', className)}
    >
      <div ref={detailsRef} className="pointer-events-none fixed z-50 origin-bottom-left scale-0">
        <DetailsProject isRight={isRight} title={project.title} types={project.types} />
      </div>
      <div
        className={clsx(originTransform, 'absolute -z-10 h-full w-full scale-0 overflow-hidden')}
        ref={wrapperImageRef}
      >
        {project.imageCover && (
          <Image
            className="absolute bottom-0 h-[calc(100%+200px)] w-full object-cover"
            ref={imageRef}
            src={project.imageCover}
            width={1080}
            height={1080}
            alt=""
          />
        )}
        {project.videoCover && (
          <video
            className="h-full w-full object-cover"
            src={project.videoCover.webm}
            autoPlay
            muted
            loop
          />
        )}
      </div>
    </div>
  );
};

export default CardProject;
