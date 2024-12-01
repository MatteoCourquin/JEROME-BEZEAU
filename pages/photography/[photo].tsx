import SliderPhotography from '@/components/sections/SliderPhotography';
import { urlFor } from '@/sanity/lib/image';
import { fetchPaths, fetchSinglePhoto } from '@/services/photos.sevices';
import { Photo } from '@/types';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { GetStaticPropsContext } from 'next';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export default function Page({ photo }: { photo: Photo }) {
  const sectionRef = useRef(null);
  const wrapperGridRef = useRef(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const isFirstMove = useRef(true);
  const initialMousePos = useRef({ x: 0, y: 0 });

  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [boundaries, setBoundaries] = useState({ minX: 0, maxX: 0, minY: 0, maxY: 0 });

  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(() => {
    gsap
      .timeline()
      .fromTo(sectionRef.current, { scale: 2 }, { scale: 1, duration: 2.2, ease: 'power3.out' })
      .fromTo(gridRef.current, { gap: 200 }, { gap: 50, duration: 2.2, ease: 'power3.out' }, '<');
  });

  useEffect(() => {
    const calculateBoundaries = () => {
      if (gridRef.current && wrapperGridRef.current) {
        const gridRect = gridRef.current.getBoundingClientRect();

        const maxX = gridRect.width * 0.5;
        const maxY = gridRect.height * 0.5;

        setBoundaries({
          minX: -maxX,
          maxX: maxX,
          minY: -maxY,
          maxY: maxY,
        });
      }
    };

    calculateBoundaries();
    window.addEventListener('resize', calculateBoundaries);
    return () => window.removeEventListener('resize', calculateBoundaries);
  }, []);

  const clampValue = (value: number, min: number, max: number) => {
    return Math.min(Math.max(value, min), max);
  };

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartPosition({ x: e.clientX - dragOffset.x, y: e.clientY - dragOffset.y });
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (isFirstMove.current) {
      initialMousePos.current = { x: e.clientX, y: e.clientY };
      isFirstMove.current = false;
    }

    const deltaX = e.clientX - initialMousePos.current.x;
    const deltaY = e.clientY - initialMousePos.current.y;

    const parallaxScale = 0.05;
    const limitedDeltaX = clampValue(
      -(deltaX * parallaxScale),
      boundaries.minX / 2,
      boundaries.maxX / 2,
    );
    const limitedDeltaY = clampValue(
      -(deltaY * parallaxScale),
      boundaries.minY / 2,
      boundaries.maxY / 2,
    );

    gsap.to(wrapperGridRef.current, {
      x: limitedDeltaX,
      y: limitedDeltaY,
      ease: 'power2.out',
      duration: 0.8,
    });

    if (!isDragging || !gridRef.current) return;

    const newX = clampValue(e.clientX - startPosition.x, boundaries.minX, boundaries.maxX);
    const newY = clampValue(e.clientY - startPosition.y, boundaries.minY, boundaries.maxY);

    gsap.to(gridRef.current, {
      x: newX,
      y: newY,
      ease: 'power2.out',
      duration: 0.8,
    });

    setDragOffset({ x: newX, y: newY });
  };

  const onMouseLeave = () => {
    setIsDragging(false);
    isFirstMove.current = true;
    gsap.to(wrapperGridRef.current, {
      x: 0,
      y: 0,
      ease: 'power2.out',
      duration: 0.8,
    });
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        className="cursor-drag relative z-0 h-screen w-screen select-none overflow-hidden"
        draggable={false}
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
        onMouseMove={onMouseMove}
        onMouseUp={() => setIsDragging(false)}
      >
        <h1 className="text-shadow absolute top-y-default z-10 w-full select-none px-x-default py-y-default text-center">
          {photo.title}
        </h1>
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pt-header"
          draggable={false}
        >
          <div ref={wrapperGridRef} draggable={false}>
            <div
              ref={gridRef}
              className="-z-10 grid grid-cols-[repeat(4,28vw)] grid-rows-[repeat(3,28vw)] gap-[50px]"
              draggable={false}
            >
              {photo.gallery.map((image, index) => (
                <div
                  key={index}
                  className="flex h-full w-full items-center justify-center"
                  onClick={() => {
                    setActiveIndex(index);
                    setIsSliderOpen(true);
                  }}
                >
                  <Image
                    alt={photo.title + index}
                    className="pointer-events-none h-auto w-full select-none"
                    draggable={false}
                    height={1080}
                    src={urlFor(image).toString()}
                    width={1920}
                    unoptimized
                    onContextMenu={(e) => e.preventDefault()}
                    onDragStart={(e) => e.preventDefault()}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <SliderPhotography
        activeIndex={activeIndex}
        isOpen={isSliderOpen}
        photos={photo.gallery}
        setActiveIndex={setActiveIndex}
        setIsOpen={setIsSliderOpen}
      />
    </>
  );
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const { params } = context;

  const photo = await fetchSinglePhoto(params);

  return {
    props: {
      photo,
      params,
    },
  };
};

export const getStaticPaths = async () => {
  const paths = (await fetchPaths()).map((photo: Photo) => ({
    params: { photo: photo.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};
