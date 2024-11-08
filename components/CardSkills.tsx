import { useMagnet, useResetMagnet } from '@/utils/animations';
import { IconArrow } from './atoms/Icons';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';

const CardSkills = () => {
  const cardRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const arrowRef = useRef(null);

  const { contextSafe } = useGSAP(() => {
    gsap.set(imageRef.current, {
      yPercent: 100,
      opacity: 0,
    });

    gsap.set(textRef.current, {
      y: 20,
      opacity: 0,
    });
  }, []);

  const openTimeline = contextSafe(() => {
    const timeline = gsap
      .timeline({
        defaults: {
          ease: 'power2.out',
          duration: 0.6,
        },
      })
      .to(imageRef.current, {
        yPercent: 0,
        opacity: 1,
      })
      .to(
        textRef.current,
        {
          y: 0,
          opacity: 1,
        },
        '-=0.3',
      )
      .to(
        arrowRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
        },
        '-=0.4',
      );

    return timeline;
  });

  const closeTimeline = contextSafe(() => {
    const timeline = gsap.timeline({
      defaults: {
        ease: 'power2.in',
        duration: 0.4,
      },
    });

    timeline
      .to(arrowRef.current, {
        y: -10,
        opacity: 0,
      })
      .to(
        textRef.current,
        {
          y: 20,
          opacity: 0,
        },
        '-=0.2',
      )
      .to(
        imageRef.current,
        {
          yPercent: 100,
          opacity: 0,
        },
        '-=0.3',
      );

    return timeline;
  });

  return (
    <div
      ref={cardRef}
      className="relative h-[400px] cursor-pointer overflow-hidden border border-white-40"
      onMouseEnter={() => openTimeline()}
      onMouseLeave={() => closeTimeline()}
      onMouseMove={(e) => useMagnet(e, 1)}
      onMouseOut={(e) => useResetMagnet(e)}
    >
      <div className="relative z-10 p-10">
        <h3 className="heading5 uppercase text-white-40">BRANDING</h3>
        <div ref={arrowRef}>
          <IconArrow className="mt-10 rotate-90 fill-white-40" />
        </div>
        <div ref={textRef}>
          <p className="text-white-40">
            Venenatis ultricies integer nunc at volutpat in iaculis magna massa. Egestas sed a
            venenatis varius.
          </p>
        </div>
      </div>
      <div ref={imageRef} className="absolute inset-0 z-0">
        <Image
          alt="About me"
          className="h-full w-full object-cover"
          height={1080}
          quality={90}
          src="/images/JB.jpeg"
          width={1920}
          priority
        />
      </div>
    </div>
  );
};

export default CardSkills;
