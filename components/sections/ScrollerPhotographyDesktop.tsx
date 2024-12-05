import { useLanguage } from '@/providers/language.provider';
import { Photo } from '@/types';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import gsap from 'gsap';
import { throttle } from 'lodash';
import { RefObject, useCallback, useEffect, useRef, useState } from 'react';
import CardPhotographyDesktop from './CardPhotographyDesktop';
import AnimatedTitle, { AnimatedTitleRef } from '../AnimatedTitlePhoto';

const ScrollerPhotographyDesktop = ({ photos }: { photos: Photo[] }) => {
  const { isFrench } = useLanguage();
  const defaultTitle = isFrench ? 'PHOTOGRAPHIE' : 'PHOTOGRAPHY';

  const refs = {
    section: useRef(null),
    scroll1: useRef<HTMLDivElement>(null),
    scroll2: useRef<HTMLDivElement>(null),
    infiniteAnimation: useRef<gsap.core.Tween[]>([]),
    lastScrollPosition: useRef(0),
    hoverTimeout: useRef<NodeJS.Timeout>(),
  };

  const titleRef = useRef<AnimatedTitleRef>(null);

  const [activePhotoIndex, setActivePhotoIndex] = useState<string | undefined>(undefined);
  const [activeTitle, setActiveTitle] = useState(defaultTitle);
  const [isScrollRight, setIsScrollRight] = useState(false);

  const createInfiniteAnimation = (element: RefObject<HTMLDivElement>, isScrollRight: boolean) => {
    if (!element.current) return null;

    return gsap.to(element.current.children, {
      x: isScrollRight ? '100%' : '-100%',
      duration: 100,
      repeat: -1,
      ease: 'none',
      paused: false,
    });
  };

  const detectScrollDirection = useCallback(
    throttle(() => {
      const currentScrollPosition = window.scrollY;
      const isGoingRight = currentScrollPosition < refs.lastScrollPosition.current;

      setIsScrollRight(isGoingRight);

      if (!activePhotoIndex) {
        const anim1 = createInfiniteAnimation(refs.scroll1, !isGoingRight);
        const anim2 = createInfiniteAnimation(refs.scroll2, isGoingRight);
        if (anim1) refs.infiniteAnimation.current.push(anim1);
        if (anim2) refs.infiniteAnimation.current.push(anim2);
      }

      refs.lastScrollPosition.current = currentScrollPosition;
    }, 200),
    [activePhotoIndex],
  );

  const controlScroll = (action: 'play' | 'pause') => {
    refs.infiniteAnimation.current.forEach((animation) => {
      gsap.to(animation, {
        timeScale: action === 'play' ? 1 : 0,
        duration: 1,
        ease: 'none',
        overwrite: true,
      });
    });
  };

  useGSAP(() => {
    gsap.from([refs.scroll1.current, refs.scroll2.current], {
      xPercent: (index) => [-200, 200][index],
      duration: 1.8,
      ease: 'power3.out',
    });

    const anim1 = createInfiniteAnimation(refs.scroll1, !isScrollRight);
    const anim2 = createInfiniteAnimation(refs.scroll2, isScrollRight);
    if (anim1) refs.infiniteAnimation.current.push(anim1);
    if (anim2) refs.infiniteAnimation.current.push(anim2);

    if (refs.section.current && refs.scroll1.current && refs.scroll2.current) {
      const sliderItem1 = refs.scroll1.current.querySelectorAll('.slider-item');
      const sliderItem2 = refs.scroll2.current.querySelectorAll('.slider-item');

      gsap
        .timeline({
          scrollTrigger: {
            trigger: refs.section.current,
            start: 'top top',
            end: () => `+=${refs.scroll1.current?.scrollWidth || 0}`,
            scrub: true,
            pin: true,
            anticipatePin: 1,
          },
        })
        .to(refs.scroll1.current, { x: 1000, ease: 'none' })
        .to(refs.scroll2.current, { x: -1000, ease: 'none' }, '<')
        .to(sliderItem1, { x: -200, ease: 'none' }, '<')
        .to(sliderItem2, { x: 0, ease: 'none' }, '<');
    }
  });

  useEffect(() => {
    refs.lastScrollPosition.current = window.scrollY;
    window.addEventListener('scroll', detectScrollDirection);
    return () => {
      window.removeEventListener('scroll', detectScrollDirection);
      detectScrollDirection.cancel();
    };
  }, [detectScrollDirection]);

  const handleMouseEnter = (photo: Photo, indexId: string) => {
    setActivePhotoIndex(indexId);
    refs.hoverTimeout.current = setTimeout(() => {
      titleRef.current?.changeTitle(photo.title);
    }, 150);
  };

  const handleMouseLeave = () => {
    setActivePhotoIndex(undefined);
    if (refs.hoverTimeout.current) {
      clearTimeout(refs.hoverTimeout.current);
    }
  };

  const isIndexActive = (indexId: string) =>
    activePhotoIndex === undefined || activePhotoIndex === indexId;

  return (
    <section ref={refs.section} className="relative min-h-screen pt-header">
      <AnimatedTitle ref={titleRef} title={activeTitle} onTitleChange={setActiveTitle} />
      <div
        className="flex w-screen flex-col overflow-hidden"
        onMouseEnter={() => controlScroll('pause')}
        onMouseOver={() => controlScroll('pause')}
        onMouseLeave={() => {
          controlScroll('play');
          titleRef.current?.changeTitle(defaultTitle);
        }}
      >
        {[refs.scroll1, refs.scroll2].map((scrollContainerRef, refIndex) => (
          <div key={refIndex} ref={scrollContainerRef} className="flex w-full justify-center">
            {Array.from({ length: 3 }).map((_, indexWrapper) => (
              <div key={indexWrapper} className="flex shrink-0 bg-black">
                {photos
                  .slice(refIndex * (photos.length / 2), (refIndex + 1) * (photos.length / 2))
                  .map((photo, indexItem) => {
                    const indexId = `${photo.title}-${indexWrapper}-${indexItem}-${refIndex}`;
                    return (
                      <div
                        key={indexId}
                        className={clsx(
                          isIndexActive(indexId) ? 'opacity-100' : 'opacity-20',
                          refIndex === 0 ? 'pb-2' : 'pt-2',
                          'aspect-4/3 cursor-see-more h-[25vh] w-auto !overflow-hidden px-2 transition-opacity duration-300',
                        )}
                        onMouseEnter={() => handleMouseEnter(photo, indexId)}
                        onMouseLeave={handleMouseLeave}
                      >
                        <div className="h-full w-full overflow-hidden">
                          <div
                            className={clsx(
                              'slider-item h-full !w-[calc(100%+200px)]',
                              refIndex === 0 ? 'translate-x-0' : 'translate-x-[-200px]',
                            )}
                          >
                            <CardPhotographyDesktop photo={photo} />
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ScrollerPhotographyDesktop;
