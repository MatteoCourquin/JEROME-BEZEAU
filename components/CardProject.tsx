import { Project } from '@/services/projects.sevices';
import { BREAKPOINTS } from '@/tailwind.config';
import { useTouchDevice } from '@/utils/states';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import gsap from 'gsap';
import CustomEase from 'gsap/dist/CustomEase';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { MouseEvent, useEffect, useRef, useState } from 'react';
import DetailsProject from './DetailsProject';
import Media from './atoms/Media';

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
  const wrapperImageRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  const [isRight, setIsRight] = useState(false);
  const [isActive, setIsActive] = useState(false);

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
      ease: CustomEase.create(
        'custom',
        'M0,0 C-0.017,0.362 0.253,0.691 0.44,0.822 0.655,0.972 0.818,1.001 1,1 ',
      ),
      // ease: 'power2.out',
      scrollTrigger: {
        trigger: cardRef.current,
        start: 'top 70%',
        end: 'bottom 50%',
        toggleActions: 'play none none reverse',
        scrub: true,
      },
    });
  }, [wrapperImageRef]);

  const handleMouseMove = contextSafe((e: MouseEvent<HTMLDivElement>, duration: number) => {
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
  }, [imageRef]);

  return (
    <div
      ref={cardRef}
      className={clsx('relative aspect-square overflow-hidden', className)}
      onClick={() => setIsActive(!isActive)}
    >
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
          types={project.types}
        />
      </div>
      <div
        ref={wrapperImageRef}
        className={clsx(originTransform, 'absolute h-full w-full scale-0 overflow-hidden')}
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
        {project.imageCover && (
          <Media
            ref={imageRef}
            alt={project.title}
            className="absolute bottom-0 !h-[calc(100%+200px)] w-full object-cover"
            ratio="square"
            sizes="xl"
            src={project.imageCover}
            type="image"
          />
        )}
        {project.videoCover && (
          <Media
            alt="video"
            className="h-full w-full object-cover"
            src={project.videoCover.webm || project.videoCover.mp4}
            type="video"
            autoPlay
            loop
            muted
          />
        )}
      </div>
    </div>
  );
};

export default CardProject;
