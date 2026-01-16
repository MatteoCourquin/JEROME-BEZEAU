import SliderPhotographyDesktop from '@/components/sections/SliderPhotographyDesktop';
import { urlFor } from '@/sanity/lib/image';
import { Photo } from '@/types';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Image from 'next/image';
import { useRef, useState } from 'react';
import InfiniteDragGrid from './InfiniteDragGrid';

const DraggablePhotos = ({ photo }: { photo: Photo }) => {
  const sectionRef = useRef(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(() => {
    gsap
      .timeline()
      .fromTo(sectionRef.current, { scale: 2 }, { scale: 1, duration: 2.2, ease: 'power3.out' })
      .fromTo(gridRef.current, { gap: 200 }, { gap: 50, duration: 2.2, ease: 'power3.out' }, '<');
  });

  const handleImageClick = (index: number) => {
    setActiveIndex(index);
    setIsSliderOpen(true);
  };

  return (
    <>
      <section ref={sectionRef} className="fixed z-0 h-screen w-screen overflow-hidden">
        <h1 className="text-shadow absolute top-y-default z-10 w-full select-none px-x-default py-y-default text-center">
          {photo.title}
        </h1>
        <InfiniteDragGrid unZoomOnDrag>
          <div className="z-10 grid h-screen w-screen grid-cols-4 grid-rows-3 gap-[50px] p-[25px]">
            {photo.gallery.map((image, index) => (
              <div key={index} className="relative h-full w-full">
                <Image
                  alt={photo.title + index}
                  className="h-full w-full object-contain"
                  draggable={false}
                  height={1080}
                  src={urlFor(image).toString()}
                  width={1920}
                  unoptimized
                  onClick={() => handleImageClick(index)}
                />
              </div>
            ))}
          </div>
        </InfiniteDragGrid>
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
