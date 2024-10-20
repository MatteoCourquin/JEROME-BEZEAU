import { Photo } from '@/services/photos.sevices';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { RefObject, useEffect, useRef, useState } from 'react';
import CardPhotography from './CardPhotography';

gsap.registerPlugin(ScrollTrigger);

const SliderPhotography = ({ photos }: { photos: Photo[] }) => {
  const sectionContainerRef = useRef(null);
  const scrollContainer1Ref = useRef<HTMLDivElement>(null);
  const scrollContainer2Ref = useRef<HTMLDivElement>(null);

  const infiniteAnimationRef = useRef<gsap.core.Tween[]>([]);
  const titleRef = useRef(null);
  const animationQueue = useRef<string[]>([]);
  const isAnimating = useRef(false);

  const hoverTimeoutRef = useRef<NodeJS.Timeout>();

  const [activePhotoIndex, setActivePhotoIndex] = useState<string | undefined>(undefined);
  const [activeTitle, setActiveTitle] = useState('PHOTOGRAPHY');
  const [isScrollRight, setIsScrollRight] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const detectScrollDirection = () => {
    setIsScrollRight(window.scrollY < lastScrollY);
    setLastScrollY(window.scrollY);

    if (activePhotoIndex) return;
    animateInfinite(scrollContainer1Ref, window.scrollY > lastScrollY);
    animateInfinite(scrollContainer2Ref, window.scrollY < lastScrollY);
  };

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

    timeline.to(scrollContainer1, { x: 200, ease: 'none' });
    timeline.to(scrollContainer2, { x: -200, ease: 'none' }, '<');
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

  const controlAnimation = (action: 'play' | 'pause') => {
    infiniteAnimationRef.current.map((animation) => {
      gsap.to(animation, {
        timeScale: action === 'play' ? 1 : 0,
        duration: 0.5,
        ease: 'power.out',
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

  useGSAP(() => {
    animateInfinite(scrollContainer1Ref, !isScrollRight);
    animateInfinite(scrollContainer2Ref, isScrollRight);
    animateScroll();
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', detectScrollDirection);

    return () => {
      window.removeEventListener('scroll', detectScrollDirection);
    };
  }, [lastScrollY]);

  return (
    <section ref={sectionContainerRef} className="relative min-h-screen pt-[100px]">
      <div className="flex h-[30vh] items-center justify-center">
        <div className="h-fit overflow-hidden text-center uppercase">
          <h1 ref={titleRef}>{activeTitle}</h1>
        </div>
      </div>
      <div
        className="flex w-screen flex-col overflow-hidden"
        onMouseOver={() => controlAnimation('pause')}
        onMouseLeave={() => {
          controlAnimation('play');
          changeTitle('PHOTOGRAPHY');
        }}
      >
        {[scrollContainer1Ref, scrollContainer2Ref].map((scrollContainerRef, refIndex) => (
          <div key={refIndex} ref={scrollContainerRef} className="flex w-full justify-center">
            {Array.from({ length: 3 }).map((_, indexWrapper) => (
              <div key={indexWrapper} className="flex shrink-0">
                {photos
                  .slice(refIndex * (photos.length / 2), (refIndex + 1) * (photos.length / 2))
                  .map((photo, indexItem) => {
                    const indexId = `${photo.title}-${indexWrapper}-${indexItem}-${refIndex}`;
                    return (
                      <CardPhotography
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

export default SliderPhotography;
