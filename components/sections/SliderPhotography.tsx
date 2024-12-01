import { useShortcut } from '@/hooks/useShortcut';
import { urlFor } from '@/sanity/lib/image';
import { useGSAP } from '@gsap/react';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import gsap from 'gsap';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import type { Image as SanityImage } from 'sanity';
import Button from '../atoms/Button';
import { IconArrow } from '../atoms/Icons';
import { useMagnet, useResetMagnet } from '@/hooks/useMagnet';

type SliderPhotographyProps = {
  photos: SanityImage[];
  activeIndex: number;
  setActiveIndex: (value: number | ((prevValue: number) => number)) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const SliderPhotography = ({
  photos,
  activeIndex,
  setActiveIndex,
  isOpen,
  setIsOpen,
}: SliderPhotographyProps) => {
  const containerRef = useRef(null);
  const backgroundRef = useRef(null);
  const wrapperImageRef = useRef(null);
  const imageRef = useRef(null);

  const buttonPreviousRef = useRef(null);
  const buttonNextRef = useRef(null);

  const timelineRef = useRef<gsap.core.Timeline>(gsap.timeline({ paused: true }));

  useShortcut('Escape', () => {
    setIsOpen(false);
  });
  useShortcut('ArrowRight', () => goToNext());
  useShortcut('ArrowLeft', () => goToPrevious());

  useGSAP(() => {
    timelineRef.current
      .fromTo(
        containerRef.current,
        { visibility: 'hidden' },
        { visibility: 'visible', duration: 0 },
      )
      .fromTo(
        backgroundRef.current,
        {
          backdropFilter: 'blur(0px)',
        },
        {
          backdropFilter: 'blur(16px)',
          duration: 0.4,
        },
      )
      .fromTo(
        wrapperImageRef.current,
        {
          opacity: 0,
          transformOrigin: 'center center',
          scale: 0.9,
        },
        {
          opacity: 1,
          transformOrigin: 'center center',
          scale: 1,
          ease: 'back.out(1.7)',
          duration: 0.6,
        },
        '-=0.2',
      )
      .fromTo(
        buttonPreviousRef.current,
        { x: '200%', opacity: 0 },
        { x: 0, opacity: 1, ease: 'power2.out', duration: 0.4 },
        '-=0.2',
      )
      .fromTo(
        buttonNextRef.current,
        { x: '-200%', opacity: 0 },
        { x: 0, opacity: 1, ease: 'power2.out', duration: 0.4 },
        '<',
      );
  }, []);

  const goToNext = () => {
    gsap
      .timeline()
      .to(wrapperImageRef.current, {
        scaleX: 0,
        transformOrigin: 'left center',
        ease: 'power2.inOut',
        onUpdate: () => {
          const currentScale = gsap.getProperty(wrapperImageRef.current, 'scaleX');
          if (currentScale !== 0) {
            gsap.set(imageRef.current, {
              scaleX: 1 / Number(currentScale),
              transformOrigin: 'left center',
            });
          }
        },
      })
      .add(() => {
        gsap.set(imageRef.current, { scaleX: 1 });
        setActiveIndex((prev) => {
          const nextIndex = prev + 1;
          return nextIndex >= photos.length ? 0 : nextIndex;
        });
      })
      .set(wrapperImageRef.current, {
        transformOrigin: 'right center',
      })
      .to(wrapperImageRef.current, {
        scaleX: 1,
        ease: 'power2.inOut',
        onUpdate: () => {
          const currentScale = gsap.getProperty(wrapperImageRef.current, 'scaleX');
          if (currentScale !== 0) {
            gsap.set(imageRef.current, {
              scaleX: 1 / Number(currentScale),
              transformOrigin: 'right center',
            });
          }
        },
      });
  };

  const goToPrevious = () => {
    gsap
      .timeline()
      .to(wrapperImageRef.current, {
        scaleX: 0,
        transformOrigin: 'right center',
        ease: 'power2.inOut',
        onUpdate: () => {
          const currentScale = gsap.getProperty(wrapperImageRef.current, 'scaleX');
          if (currentScale !== 0) {
            gsap.set(imageRef.current, {
              scaleX: 1 / Number(currentScale),
              transformOrigin: 'right center',
            });
          }
        },
      })
      .add(() => {
        gsap.set(imageRef.current, { scaleX: 1 });
        setActiveIndex((prev) => {
          const nextIndex = prev - 1;
          return nextIndex < 0 ? photos.length - 1 : nextIndex;
        });
      })
      .set(wrapperImageRef.current, {
        transformOrigin: 'left center',
      })
      .to(wrapperImageRef.current, {
        scaleX: 1,
        ease: 'power2.inOut',
        onUpdate: () => {
          const currentScale = gsap.getProperty(wrapperImageRef.current, 'scaleX');
          if (currentScale !== 0) {
            gsap.set(imageRef.current, {
              scaleX: 1 / Number(currentScale),
              transformOrigin: 'left center',
            });
          }
        },
      });
  };

  useEffect(() => {
    if (!timelineRef.current) return;

    if (isOpen) {
      timelineRef.current.play();
    } else {
      timelineRef.current.reverse();
    }
  }, [isOpen]);

  return (
    <div
      ref={containerRef}
      className="invisible fixed bottom-0 z-50 flex h-[calc(100vh-100px)] w-screen items-center gap-x-11 overflow-hidden px-x-default py-y-default"
    >
      <div
        ref={backgroundRef}
        className="absolute inset-0 -z-10 h-full w-full backdrop-blur-lg"
        onClick={() => setIsOpen(false)}
      />

      <Button
        ref={buttonPreviousRef}
        aria-label="Next image"
        className="group/button-next shrink-0"
        isIcon={true}
        type="button"
        onClick={goToPrevious}
      >
        <IconArrow className="rotate-180 transition-colors group-hover/button-next:fill-black" />
      </Button>

      <div
        className="relative flex h-full w-full items-center justify-center"
        onClick={() => setIsOpen(false)}
        onMouseLeave={useResetMagnet}
        onMouseMove={(e) => useMagnet(e, 1)}
      >
        <div ref={wrapperImageRef} className="h-full w-full overflow-hidden">
          <Image
            ref={imageRef}
            alt="Picture of project photography"
            className="pointer-events-none h-full w-full select-none object-contain"
            height={1080}
            src={urlFor(photos[activeIndex] as SanityImageSource).toString()}
            width={1920}
            onContextMenu={(e) => e.preventDefault()}
            onDragStart={(e) => e.preventDefault()}
          />
        </div>
      </div>

      <Button
        ref={buttonNextRef}
        aria-label="Previous image"
        className="group/button-previous shrink-0"
        isIcon={true}
        type="button"
        onClick={goToNext}
      >
        <IconArrow className="group-hover/button-previous:fill-black" />
      </Button>
    </div>
  );
};

export default SliderPhotography;
