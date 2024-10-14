import { fetchPhotos, Photo } from '@/services/photos.sevices';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Image from 'next/image';
import { RefObject, useEffect, useRef, useState } from 'react';

gsap.registerPlugin(ScrollTrigger);

export default function PagePhotography({ photos }: { photos: Photo[] }) {
  const sectionContainerRef = useRef(null);
  const scrollContainer1Ref = useRef<HTMLDivElement>(null);
  const scrollContainer2Ref = useRef<HTMLDivElement>(null);

  const [isScrollRight, setIsScrollRight] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const detectScrollDirection = () => {
    setIsScrollRight(window.scrollY < lastScrollY);
    setLastScrollY(window.scrollY);
  };

  const animateScroll = () => {
    const scrollContainer1 = scrollContainer1Ref.current;
    const scrollContainer2 = scrollContainer2Ref.current;

    if (!scrollContainer1 || !scrollContainer2 || !sectionContainerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionContainerRef.current,
        start: 'top top',
        end: () => `+=${scrollContainer1.scrollWidth}`,
        scrub: true,
        pin: true,
        anticipatePin: 1,
      },
    });

    tl.to(scrollContainer1, {
      x: 200,
      ease: 'none',
    });

    tl.to(
      scrollContainer2,
      {
        x: -200,
        ease: 'none',
      },
      '<',
    );
  };

  const animateInfinite = (element: RefObject<HTMLDivElement>, isScrollRight: boolean) => {
    if (!element.current) return;

    gsap.to(element.current.children, {
      x: isScrollRight ? '100%' : '-100%',
      duration: 40,
      repeat: -1,
      ease: 'none',
    });
  };

  useGSAP(() => {
    if (!scrollContainer1Ref.current || !scrollContainer2Ref.current) return;
    animateInfinite(scrollContainer1Ref, !isScrollRight);
    animateInfinite(scrollContainer2Ref, isScrollRight);
  }, [isScrollRight]);

  useGSAP(() => {
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
        <h1 className="text-center">PHOTOGRAPHY</h1>
      </div>
      <div className="flex w-screen flex-col gap-4">
        <div ref={scrollContainer1Ref} className="flex w-full justify-center">
          {Array.from({ length: 3 }).map((_, index) => (
            <div className="flex shrink-0 gap-4 pl-4" key={index}>
              {photos.map((photo, index) => (
                <div
                  key={photo.title + index}
                  className="relative aspect-video h-64 w-auto min-w-[25vw] shrink-0 grow"
                >
                  <Image
                    src={photo.imageCover}
                    width={1080}
                    height={920}
                    alt={photo.title}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
        <div ref={scrollContainer2Ref} className="flex w-full justify-center">
          {Array.from({ length: 3 }).map((_, index) => (
            <div className="flex shrink-0 gap-4 pl-4" key={index}>
              {photos.map((photo, index) => (
                <div
                  key={photo.title + index}
                  className="relative aspect-video h-64 w-auto min-w-[25vw] shrink-0 grow"
                >
                  <Image
                    src={photo.imageCover}
                    width={1080}
                    height={920}
                    alt={photo.title}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export async function getStaticProps() {
  const photos = await fetchPhotos();

  return {
    props: {
      photos,
    },
  };
}
