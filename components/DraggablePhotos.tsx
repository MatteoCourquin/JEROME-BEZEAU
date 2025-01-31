import SliderPhotographyDesktop from '@/components/sections/SliderPhotographyDesktop';
import { urlFor } from '@/sanity/lib/image';
import { Photo } from '@/types';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Image from 'next/image';
import { TouchEvent, useCallback, useEffect, useRef, useState } from 'react';

const DRAG_THRESHOLD = 5;

const DraggablePhotos = ({ photo }: { photo: Photo }) => {
  const sectionRef = useRef(null);
  const wrapperGridRef = useRef(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const isFirstMove = useRef(true);
  const initialMousePos = useRef({ x: 0, y: 0 });
  const initialTouchPos = useRef({ x: 0, y: 0 });
  const clickStartPos = useRef({ x: 0, y: 0 });

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

        const maxX = gridRect.width * 0.25;
        const maxY = gridRect.height * 0.25;

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

  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      setIsDragging(true);
      setStartPosition({ x: e.clientX - dragOffset.x, y: e.clientY - dragOffset.y });
      clickStartPos.current = { x: e.clientX, y: e.clientY };
    },
    [dragOffset],
  );

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
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
    },
    [boundaries, isDragging, startPosition],
  );

  const onTouchStart = useCallback(
    (e: TouchEvent) => {
      const [touch] = Array.from(e.touches);

      setIsDragging(true);
      setStartPosition({ x: touch.clientX - dragOffset.x, y: touch.clientY - dragOffset.y });
      clickStartPos.current = { x: touch.clientX, y: touch.clientY };
      initialTouchPos.current = { x: touch.clientX, y: touch.clientY };
      isFirstMove.current = true;
    },
    [dragOffset],
  );

  const onTouchMove = useCallback(
    (e: TouchEvent) => {
      const [touch] = Array.from(e.touches);

      if (isFirstMove.current) {
        initialTouchPos.current = { x: touch.clientX, y: touch.clientY };
        isFirstMove.current = false;
      }

      const deltaX = touch.clientX - initialTouchPos.current.x;
      const deltaY = touch.clientY - initialTouchPos.current.y;

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

      const newX = clampValue(touch.clientX - startPosition.x, boundaries.minX, boundaries.maxX);
      const newY = clampValue(touch.clientY - startPosition.y, boundaries.minY, boundaries.maxY);

      gsap.to(gridRef.current, {
        x: newX,
        y: newY,
        ease: 'power2.out',
        duration: 0.8,
      });

      setDragOffset({ x: newX, y: newY });
    },
    [boundaries, isDragging, startPosition],
  );

  const handleImageClick = useCallback((e: React.MouseEvent, index: number) => {
    const deltaX = Math.abs(e.clientX - clickStartPos.current.x);
    const deltaY = Math.abs(e.clientY - clickStartPos.current.y);

    if (deltaX < DRAG_THRESHOLD && deltaY < DRAG_THRESHOLD) {
      setActiveIndex(index);
      setIsSliderOpen(true);
    }
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        className="cursor-drag relative z-0 h-screen w-screen touch-none select-none overflow-hidden"
        draggable={false}
        onMouseDown={onMouseDown}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={onMouseMove}
        onMouseUp={() => setIsDragging(false)}
        onTouchEnd={() => setIsDragging(false)}
        onTouchMove={onTouchMove}
        onTouchStart={onTouchStart}
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
                  onClick={(e) => handleImageClick(e, index)}
                >
                  <Image
                    alt={photo.title + index}
                    className="pointer-events-none h-full w-full select-none object-contain"
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
      <SliderPhotographyDesktop
        activeIndex={activeIndex}
        isOpen={isSliderOpen}
        photos={photo.gallery}
        setActiveIndex={setActiveIndex}
        setIsOpen={setIsSliderOpen}
      />
    </>
  );
};

export default DraggablePhotos;
