import { fetchPaths, fetchSinglePhoto, Photo } from '@/services/photos.sevices';
import gsap from 'gsap';
import { GetStaticPropsContext } from 'next';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export default function Page({ photo }: { photo: Photo }) {
  const wrapperGridRef = useRef(null);
  const gridRef = useRef(null);

  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartPosition({ x: e.clientX - dragOffset.x, y: e.clientY - dragOffset.y });
  };

  const onMouseMove = (e: React.MouseEvent) => {
    gsap.to(wrapperGridRef.current, {
      x: -(e.clientX / 10),
      y: -(e.clientY / 10),
      ease: 'power2.out',
      duration: 0.8,
    });

    if (!isDragging || !gridRef.current) return;

    const newX = e.clientX - startPosition.x;
    const newY = e.clientY - startPosition.y;

    gsap.to(gridRef.current, {
      x: newX,
      y: newY,
      ease: 'power2.out',
      duration: 0.8,
    });

    setDragOffset({ x: newX, y: newY });
  };

  useEffect(() => {
    window.addEventListener('mouseup', () => setIsDragging(false));
    return () => {
      window.removeEventListener('mouseup', () => setIsDragging(false));
    };
  }, []);

  return (
    <section
      className="relative z-0 h-screen w-screen overflow-hidden"
      onMouseDown={onMouseDown}
      onMouseLeave={() => setIsDragging(false)}
      onMouseMove={onMouseMove}
      onMouseUp={() => setIsDragging(false)}
    >
      <h1 className="text-shadow absolute top-y-default z-10 w-full select-none px-x-default py-y-default text-center">
        {photo.title}
      </h1>

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pt-header">
        <div ref={wrapperGridRef}>
          <div
            ref={gridRef}
            className="-z-10 grid grid-cols-[repeat(4,28vw)] grid-rows-[repeat(3,28vw)] gap-[50px]"
          >
            {new Array(12).fill(photo.mainImage).map((image, index) => (
              <Image
                key={index}
                alt={photo.title + index}
                className="h-auto w-full select-none"
                draggable={false}
                height={1080}
                src={image}
                width={1920}
                unoptimized
              />
            ))}
          </div>
        </div>
      </div>
    </section>
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
