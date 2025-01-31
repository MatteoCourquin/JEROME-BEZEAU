import { useMagnet, useResetMagnet } from '@/hooks/useMagnet';
import { useShortcut } from '@/hooks/useShortcut';
import { urlFor } from '@/sanity/lib/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import type { Image as SanityImage } from 'sanity';
import Button from '../atoms/Button';
import { IconArrow } from '../atoms/Icons';

type SliderPhotographyProps = {
  photos: SanityImage[];
  activeIndex: number;
  setActiveIndex: (value: number | ((prevValue: number) => number)) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const SliderPhotographyDesktop = ({
  photos,
  activeIndex,
  setActiveIndex,
  isOpen,
  setIsOpen,
}: SliderPhotographyProps) => {
  const containerRef = useRef(null);
  const backgroundRef = useRef(null);
  const wrapperImagesRef = useRef(null);
  const imagesRefs = useRef<(HTMLImageElement | null)[]>([]);

  const buttonPreviousRef = useRef(null);
  const buttonNextRef = useRef(null);

  const timelineRef = useRef<gsap.core.Timeline>(gsap.timeline({ paused: true }));

  useGSAP(() => {
    timelineRef.current
      .fromTo(containerRef.current, { display: 'none' }, { display: 'flex', duration: 0.1 })
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
        wrapperImagesRef.current,
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

  const goToSlide = (isNext: boolean) => {
    const currentImage = imagesRefs.current[activeIndex];
    const nextIndex = (activeIndex + (isNext ? 1 : -1) + photos.length) % photos.length;
    const nextImage = imagesRefs.current[nextIndex];

    if (!currentImage || !nextImage) return;

    gsap
      .timeline()
      .to(wrapperImagesRef.current, {
        scaleX: 0,
        transformOrigin: isNext ? 'left center' : 'right center',
        ease: 'power2.inOut',
        onUpdate: () => {
          const currentScale = gsap.getProperty(wrapperImagesRef.current, 'scaleX');
          if (currentScale !== 0) {
            imagesRefs.current.forEach((img, index) => {
              if (img) {
                gsap.set(img, {
                  scaleX: 1 / Number(currentScale),
                  transformOrigin: isNext ? 'left center' : 'right center',
                  visibility: index === activeIndex ? 'visible' : 'hidden',
                });
              }
            });
          }
        },
      })
      .add(() => {
        imagesRefs.current.forEach((img, index) => {
          if (img) {
            gsap.set(img, {
              scaleX: 1,
              visibility: index === nextIndex ? 'visible' : 'hidden',
            });
          }
        });
        setActiveIndex(nextIndex);
      })
      .set(wrapperImagesRef.current, {
        transformOrigin: isNext ? 'right center' : 'left center',
      })
      .to(wrapperImagesRef.current, {
        scaleX: 1,
        ease: 'power2.inOut',
        onUpdate: () => {
          const currentScale = gsap.getProperty(wrapperImagesRef.current, 'scaleX');
          if (currentScale !== 0) {
            imagesRefs.current.forEach((img, index) => {
              if (img && index === nextIndex) {
                gsap.set(img, {
                  scaleX: 1 / Number(currentScale),
                  transformOrigin: isNext ? 'right center' : 'left center',
                });
              }
            });
          }
        },
      });
  };

  const goToNext = () => goToSlide(true);
  const goToPrevious = () => goToSlide(false);
  const handleClose = () => setIsOpen(false);

  useShortcut('Escape', handleClose);
  useShortcut('ArrowRight', goToNext);
  useShortcut('ArrowLeft', goToPrevious);

  useEffect(() => {
    if (!timelineRef.current) return;

    if (isOpen) {
      timelineRef.current.play();
    } else {
      timelineRef.current.reverse();
    }
  }, [isOpen]);

  useEffect(() => {
    imagesRefs.current = imagesRefs.current.slice(0, photos.length);
  }, [photos.length]);

  return (
    <div
      ref={containerRef}
      className="fixed bottom-0 z-50 hidden h-[calc(100vh-100px)] w-screen items-center gap-x-11 overflow-hidden px-x-default py-y-default"
    >
      <div
        ref={backgroundRef}
        className="absolute inset-0 -z-10 h-full w-full backdrop-blur-lg"
        onClick={handleClose}
      />

      <Button
        ref={buttonPreviousRef}
        aria-label="Previous image"
        className="group/button-next absolute left-x-double-default z-10 shrink-0 lg:static"
        isIcon={true}
        type="button"
        onClick={goToPrevious}
      >
        <IconArrow className="rotate-180 transition-colors group-hover/button-next:fill-black" />
      </Button>

      <div
        className="relative flex h-full w-full items-center justify-center"
        onClick={handleClose}
        onMouseLeave={useResetMagnet}
        onMouseMove={(e) => useMagnet(e, 1)}
      >
        <div ref={wrapperImagesRef} className="h-full w-full overflow-hidden">
          {photos.map((photo, index) => (
            <Image
              key={index}
              ref={(el) => {
                if (!imagesRefs.current) return;
                imagesRefs.current[index] = el;
              }}
              alt="Picture of project photography"
              className="pointer-events-none absolute h-full w-full select-none object-contain"
              height={1080}
              priority={true}
              src={urlFor(photo).toString()}
              style={{ visibility: index === activeIndex ? 'visible' : 'hidden' }}
              width={1920}
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
            />
          ))}
        </div>
      </div>

      <Button
        ref={buttonNextRef}
        aria-label="Next image"
        className="group/button-previous absolute right-x-double-default z-10 shrink-0 lg:static"
        isIcon={true}
        type="button"
        onClick={goToNext}
      >
        <IconArrow className="group-hover/button-previous:fill-black" />
      </Button>
    </div>
  );
};

export default SliderPhotographyDesktop;
