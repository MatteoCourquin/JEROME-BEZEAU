import { LanguageContext } from '@/layout/default';
import { useMagnet, useResetMagnet } from '@/utils/animations';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Image from 'next/image';
import { useContext, useEffect, useRef } from 'react';
import { IconArrow } from './atoms/Icons';

interface CardSkillsProps {
  title: {
    en: string;
    fr: string;
  };
  description: {
    en: string;
    fr: string;
  };
  imageSrc: string;
  isActive?: boolean;
  onHover?: () => void;
  onLeave?: () => void;
  onMouseEnter?: () => void;
}

const CardSkills = ({
  title,
  description,
  imageSrc,
  isActive,
  onHover,
  onLeave,
  onMouseEnter,
}: CardSkillsProps) => {
  const { isFrench } = useContext(LanguageContext);
  const cardRef = useRef(null);
  const titleRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const arrowRef = useRef(null);
  const tl = useRef<GSAPTimeline>(
    gsap.timeline({
      defaults: {
        ease: 'power2.out',
        duration: 0.6,
      },
      paused: true,
    }),
  );

  const { contextSafe } = useGSAP(() => {
    gsap.set(titleRef.current, {
      opacity: 0.4,
    });
    gsap.set(imageRef.current, {
      height: '0%',
    });
    gsap.set(textRef.current, {
      y: 20,
      opacity: 0,
    });

    tl.current
      .to(arrowRef.current, {
        y: 10,
        opacity: 0,
        duration: 0.4,
      })
      .to(
        imageRef.current,
        {
          height: '100%',
        },
        '<',
      )
      .to(
        titleRef.current,
        {
          opacity: 0.8,
        },
        '<',
      )
      .to(
        textRef.current,
        {
          y: 0,
          opacity: 1,
        },
        '-=0.4',
      );
  }, []);

  const handleMouseEnter = contextSafe(() => {
    tl.current.play();
  });

  const handleMouseLeave = contextSafe(() => {
    tl.current.reverse();
  });

  useEffect(() => {
    if (isActive) {
      handleMouseEnter();
    } else {
      handleMouseLeave();
    }
  }, [isActive]);

  return (
    <div
      ref={cardRef}
      className="relative flex h-[400px] cursor-pointer flex-col overflow-hidden border border-white-40 bg-black"
      onMouseEnter={() => onMouseEnter?.()}
      onMouseMove={(e) => useMagnet(e, 1)}
      onMouseOver={() => onHover?.()}
      onMouseLeave={(e) => {
        useResetMagnet(e);
        onLeave?.();
      }}
    >
      <div className="relative z-10 p-10">
        <h3 ref={titleRef} className="heading5 uppercase text-white opacity-40">
          {isFrench ? title.fr : title.en}
        </h3>
        <div ref={arrowRef} className="absolute">
          <IconArrow className="mt-10 rotate-90 !fill-white-40" />
        </div>
        <div ref={textRef}>
          <p className="pt-5 text-white-40">{isFrench ? description.fr : description.en}</p>
        </div>
      </div>
      <div className="inset-0 -z-10 flex grow flex-col justify-end">
        <div ref={imageRef} className="w-full">
          <Image
            alt="About me"
            className="h-full w-full object-cover object-bottom"
            height={1080}
            quality={90}
            src={imageSrc}
            width={1920}
            unoptimized
          />
        </div>
      </div>
    </div>
  );
};

export default CardSkills;
