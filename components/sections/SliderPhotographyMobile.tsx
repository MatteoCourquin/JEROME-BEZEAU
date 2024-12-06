import { useShortcut } from '@/hooks/useShortcut';
import { urlFor } from '@/sanity/lib/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import type { Image as SanityImage } from 'sanity';
import 'swiper/css';
import 'swiper/css/effect-creative';
import { EffectCreative } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';

type SliderPhotographyProps = {
  photos: SanityImage[];
  activeIndex: number;
  setActiveIndex: (value: number | ((prevValue: number) => number)) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const SliderPhotographyMobile = ({
  photos,
  activeIndex,
  setActiveIndex,
  isOpen,
  setIsOpen,
}: SliderPhotographyProps) => {
  const containerRef = useRef(null);
  const backgroundRef = useRef(null);
  const swiperRef = useRef(null);

  const timelineRef = useRef<gsap.core.Timeline>(gsap.timeline({ paused: true }));

  const swiperInstanceRef = useRef<SwiperType | null>(null);

  useGSAP(() => {
    timelineRef.current
      .fromTo(containerRef.current, { display: 'none' }, { display: 'flex', duration: 0.1 })
      .fromTo(
        backgroundRef.current,
        { backdropFilter: 'blur(0px)' },
        { backdropFilter: 'blur(16px)', duration: 0.4 },
      )
      .fromTo(
        swiperRef.current,
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
      );
  }, []);

  const handleClose = () => setIsOpen(false);

  useShortcut('Escape', handleClose);

  useEffect(() => {
    if (!timelineRef.current) return;
    if (isOpen) {
      timelineRef.current.play();
    } else {
      timelineRef.current.reverse();
    }
  }, [isOpen]);

  useEffect(() => {
    if (swiperInstanceRef.current && swiperInstanceRef.current.activeIndex !== activeIndex) {
      swiperInstanceRef.current.slideTo(activeIndex);
    }
  }, [activeIndex]);

  useEffect(() => {
    if (isOpen && swiperInstanceRef.current) {
      setTimeout(() => {
        swiperInstanceRef.current?.update();
      }, 100);
    }
  }, [isOpen]);

  return (
    <div
      ref={containerRef}
      className="fixed bottom-0 z-50 hidden h-[calc(100vh-100px)] w-screen items-center overflow-hidden px-x-default py-y-default"
    >
      <div
        ref={backgroundRef}
        className="absolute inset-0 -z-10 h-full w-full backdrop-blur-lg"
        onClick={handleClose}
      />

      <div className="relative flex h-full w-full items-center justify-center">
        <div ref={swiperRef} className="h-full w-full">
          <Swiper
            className="h-full w-full"
            effect="creative"
            grabCursor={true}
            initialSlide={activeIndex}
            modules={[EffectCreative]}
            creativeEffect={{
              prev: {
                shadow: false,
                translate: [0, 0, -400],
                opacity: 0,
              },
              next: {
                translate: ['100%', 0, 0],
                opacity: 0,
              },
            }}
            onSlideChange={(swiper) => {
              setActiveIndex(swiper.activeIndex);
            }}
            onSwiper={(swiper) => {
              swiperInstanceRef.current = swiper;
            }}
          >
            {photos.map((photo, index) => (
              <SwiperSlide key={index} className="h-full w-full">
                <Image
                  alt="Picture of project photography"
                  className="h-full w-full select-none object-contain"
                  height={1080}
                  src={urlFor(photo).toString()}
                  width={1920}
                  onContextMenu={(e) => e.preventDefault()}
                  onDragStart={(e) => e.preventDefault()}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default SliderPhotographyMobile;
