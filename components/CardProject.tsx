import { Project } from '@/services/projects.sevices';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Image from 'next/image';
import { MouseEvent, useEffect, useRef, useState } from 'react';
import DetailsProject from './DetailsProject';
import { useTouchDevice } from '@/utils/states';

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
    if (!detailsRef.current || useTouchDevice()) return;

    gsap.to(detailsRef.current, {
      left: e.clientX + (isRight ? 10 : -10),
      top: e.clientY - 90,
      duration: 0.8,
      ease: 'power4.out',
    });
  });

  const handleMouseOut = contextSafe(() => {
    if (!detailsRef.current || useTouchDevice()) return;

    gsap.to(detailsRef.current, {
      scale: 0,
      duration: 0.2,
      ease: 'power2.out',
    });
  });

  const handleMouseEnter = contextSafe((e: MouseEvent<HTMLDivElement>) => {
    if (!detailsRef.current || useTouchDevice()) return;

    detailsRef.current.style.left = e.clientX + (isRight ? 10 : -10) + 'px';
    detailsRef.current.style.top = e.clientY - 90 + 'px';

    gsap.to(detailsRef.current, {
      scale: 1,
      duration: 0.2,
      ease: 'power2.out',
    });
  });

  return (
    <div
      onMouseMove={(e) => {
        handleMouseMove(e);
        handleMouseEnter(e);
      }}
      onMouseOut={handleMouseOut}
      ref={cardRef}
      className={clsx('group/card-project relative aspect-square', className)}
    >
      <div ref={detailsRef} className="pointer-events-none fixed z-50 origin-bottom-left scale-0">
        <DetailsProject isRight={isRight} title={project.title} types={project.types} />
      </div>
      <div
        className={clsx(originTransform, 'absolute -z-10 h-full w-full scale-0 object-cover')}
        ref={wrapperImageRef}
      >
        {project.imageCover && (
          <Image
            className="h-full w-full object-cover"
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
