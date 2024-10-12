import { Project } from '@/services/projects.sevices';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Image from 'next/image';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const CardProject = ({ project, className }: { project: Project; className?: string }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!cardRef.current) return;

    gsap.to(cardRef.current, {
      scale: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: cardRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
        scrub: true,
      },
    });
  }, [cardRef]);

  return (
    <div ref={cardRef} className={clsx('relative aspect-square', className)}>
      {project.imageCover && (
        <Image
          className="absolute h-full w-full object-cover"
          src={project.imageCover}
          width={1080}
          height={1080}
          alt=""
        />
      )}
      {project.videoCover && (
        <video
          className="absolute h-full w-full object-cover"
          src={project.videoCover}
          autoPlay
          muted
          loop
        />
      )}
    </div>
  );
};

export default CardProject;
