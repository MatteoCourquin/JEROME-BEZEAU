import { useLanguage } from '@/providers/language.provider';
import { Photo } from '@/types';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import gsap from 'gsap';
import { throttle } from 'lodash';
import { RefObject, useCallback, useEffect, useRef, useState } from 'react';
import CardPhotographyDesktop from './CardPhotographyDesktop';

const ScrollerPhotographyDesktop = ({ photos }: { photos: Photo[] }) => {
  const { isFrench } = useLanguage();

  const sectionContainerRef = useRef(null);
  const scrollContainer1Ref = useRef<HTMLDivElement>(null);
  const scrollContainer2Ref = useRef<HTMLDivElement>(null);

  const infiniteAnimationRef = useRef<gsap.core.Tween[]>([]);
  const titleRef = useRef(null);
  const animationQueue = useRef<string[]>([]);
  const isAnimating = useRef(false);
  const lastKnownScrollPositionRef = useRef(0);

  const hoverTimeoutRef = useRef<NodeJS.Timeout>();

  const [activePhotoIndex, setActivePhotoIndex] = useState<string | undefined>(undefined);
  const [activeTitle, setActiveTitle] = useState(isFrench ? 'PHOTOGRAPHY' : 'PHOTOGRAPHIE');
  const [isScrollRight, setIsScrollRight] = useState(false);

  const detectScrollDirection = useCallback(
    throttle(() => {
      const currentScrollPosition = window.scrollY;
      const isGoingRight = currentScrollPosition < lastKnownScrollPositionRef.current;

      setIsScrollRight(isGoingRight);

      if (!activePhotoIndex) {
        animateInfinite(scrollContainer1Ref, !isGoingRight);
        animateInfinite(scrollContainer2Ref, isGoingRight);
      }

      lastKnownScrollPositionRef.current = currentScrollPosition;
    }, 200),
    [],
  );

  const animateScroll = () => {
    const scrollContainer1 = scrollContainer1Ref.current;
    const scrollContainer2 = scrollContainer2Ref.current;

    if (!scrollContainer1 || !scrollContainer2 || !sectionContainerRef.current) return;

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionContainerRef.current,
        start: 'top top',
        end: () => `+=${scrollContainer1.scrollWidth}`,
        scrub: true,
        pin: true,
        anticipatePin: 1,
      },
    });

    timeline.to(scrollContainer1, { x: 1000, ease: 'none' });
    timeline.to(scrollContainer2, { x: -1000, ease: 'none' }, '<');
  };

  const animateInfinite = (element: RefObject<HTMLDivElement>, isScrollRight: boolean) => {
    if (!element.current) return;

    const tween = gsap.to(element.current.children, {
      x: isScrollRight ? '100%' : '-100%',
      duration: 100,
      repeat: -1,
      ease: 'none',
      paused: false,
    });

    infiniteAnimationRef.current.push(tween);
  };

  const controlScroll = (action: 'play' | 'pause') => {
    infiniteAnimationRef.current.map((animation) => {
      gsap.to(animation, {
        timeScale: action === 'play' ? 1 : 0,
        duration: 1,
        ease: 'none',
        overwrite: true,
      });
    });
  };

  const isIndexActive = (indexId: string) =>
    activePhotoIndex === undefined || activePhotoIndex === indexId;

  const changeTitle = (newTitle: string) => {
    animationQueue.current = [newTitle];

    if (isAnimating.current) return;
    animateNextTitle();
  };

  const animateNextTitle = () => {
    if (animationQueue.current.length === 0) {
      isAnimating.current = false;
      return;
    }

    isAnimating.current = true;
    const nextTitle = animationQueue.current.shift();

    if (!titleRef.current || !nextTitle) return;

    gsap.to(titleRef.current, {
      yPercent: -100,
      opacity: 0,
      duration: 0.2,
      onComplete: () => {
        setActiveTitle(nextTitle);
        gsap.fromTo(
          titleRef.current,
          { yPercent: 100, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.2,
            ease: 'power3.out',
            onComplete: animateNextTitle,
          },
        );
      },
    });
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      lastKnownScrollPositionRef.current = window.scrollY;
      window.addEventListener('scroll', detectScrollDirection);

      return () => {
        window.removeEventListener('scroll', detectScrollDirection);
        detectScrollDirection.cancel();
      };
    }
  }, []);

  useGSAP(() => {
    animateInfinite(scrollContainer1Ref, !isScrollRight);
    animateInfinite(scrollContainer2Ref, isScrollRight);
    animateScroll();
  });

  return (
    <section ref={sectionContainerRef} className="relative min-h-screen pt-header">
      <div className="my-y-half-default flex items-center justify-center py-y-default">
        <div className="absolute h-fit overflow-hidden text-center uppercase">
          <h1 ref={titleRef}>{activeTitle}</h1>
        </div>
      </div>
      <div
        className="flex w-screen flex-col overflow-hidden"
        onMouseEnter={() => controlScroll('pause')}
        onMouseOver={() => controlScroll('pause')}
        onMouseLeave={() => {
          controlScroll('play');
          changeTitle(isFrench ? 'PHOTOGRAPHIE' : 'PHOTOGRAPHY');
        }}
      >
        {[scrollContainer1Ref, scrollContainer2Ref].map((scrollContainerRef, refIndex) => (
          <div key={refIndex} ref={scrollContainerRef} className="flex w-full justify-center">
            {Array.from({ length: 3 }).map((_, indexWrapper) => (
              <div key={indexWrapper} className="flex shrink-0 bg-black">
                {photos
                  .slice(refIndex * (photos.length / 2), (refIndex + 1) * (photos.length / 2))
                  .map((photo, indexItem) => {
                    const indexId = `${photo.title}-${indexWrapper}-${indexItem}-${refIndex}`;
                    return (
                      <CardPhotographyDesktop
                        key={indexId}
                        className={clsx(refIndex === 0 ? 'pb-2' : 'pt-2', 'px-2')}
                        indexId={indexId}
                        isIndexActive={isIndexActive}
                        photo={photo}
                        onMouseEnter={() => {
                          setActivePhotoIndex(indexId);
                          hoverTimeoutRef.current = setTimeout(() => {
                            changeTitle(photo.title);
                          }, 150);
                        }}
                        onMouseLeave={() => {
                          setActivePhotoIndex(undefined);
                          if (hoverTimeoutRef.current) {
                            clearTimeout(hoverTimeoutRef.current);
                          }
                        }}
                      />
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
