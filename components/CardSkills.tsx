import { useMagnet, useResetMagnet } from '@/hooks/useMagnet';
import { useLanguage } from '@/providers/language.provider';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Image from 'next/image';
import { useRef } from 'react';
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
  const { isFrench } = useLanguage();
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
    }),
  );

  useGSAP(() => {
    gsap.set(cardRef.current, {
      backgroundColor: 'rgba(255, 255, 255, 0.0)',
      borderColor: 'rgba(255, 255, 255, 0.12)',
    });
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
        cardRef.current,
        {
          backgroundColor: 'rgba(255, 255, 255, 0.02)',
          borderColor: 'rgba(255, 255, 255, 0.02)',
        },
        '<',
      )
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
  });

  useGSAP(() => {
    if (isActive) {
      tl.current.play();
    } else {
      tl.current.reverse();
    }
  }, [isActive]);

  return (
    <div
      ref={cardRef}
      className="aspect-1/1 relative flex h-auto cursor-pointer flex-col overflow-hidden border border-white-12"
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
      <div className="inset-0 flex grow flex-col justify-end">
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
