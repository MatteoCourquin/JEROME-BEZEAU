import { Project } from '@/services/projects.sevices';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Image from 'next/image';
import { MouseEvent, useRef } from 'react';
import DetailsProject from './DetailsProject';

gsap.registerPlugin(ScrollTrigger);

const CardProject = ({
  project,
  className,
  originTrasnform,
}: {
  project: Project;
  className?: string;
  originTrasnform: string;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const wrapperImageRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

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

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!detailsRef.current || !cardRef.current) return;

    const { left, top } = cardRef.current.getBoundingClientRect();

    gsap.to(detailsRef.current, {
      x: e.clientX - left + 10,
      y: e.clientY - top - 90,
      duration: 0.2,
      ease: 'power2.out',
    });
  };

  const handleMouseOut = () => {
    if (!detailsRef.current) return;

    gsap.to(detailsRef.current, {
      scale: 0,
      duration: 0.2,
      ease: 'power2.out',
    });
  };

  const handleMouseEnter = () => {
    if (!detailsRef.current) return;

    gsap.to(detailsRef.current, {
      scale: 1,
      duration: 0.2,
      ease: 'power2.out',
    });
  };

  return (
    <div
      onMouseMove={(e) => {
        handleMouseMove(e);
        handleMouseEnter();
      }}
      onMouseOut={() => handleMouseOut()}
      ref={cardRef}
      className={clsx('group/card-project relative aspect-square', className)}
    >
      <DetailsProject
        className="absolute origin-bottom-left scale-0"
        ref={detailsRef}
        title={project.title}
        types={project.types}
      />
      <div
        className={clsx(originTrasnform, 'absolute -z-10 h-full w-full scale-0 object-cover')}
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
            src={project.videoCover}
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
