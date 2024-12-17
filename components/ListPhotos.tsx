import { urlFor } from '@/sanity/lib/image';
import { Photo } from '@/types';
import Image from 'next/image';
import { useState } from 'react';
import SliderPhotographyMobile from './sections/SliderPhotographyMobile';

const ListPhotos = ({ photo }: { photo: Photo }) => {
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleImageClick = (index: number) => {
    setActiveIndex(index);
    setIsSliderOpen(true);
  };

  return (
    <>
      <section className="px-x-default py-y-default">
        <h1 className="w-full py-y-default">{photo.title}</h1>
        <div className="flex flex-col gap-y-default">
          {photo.gallery.map((image, index) => (
            <div key={index} onClick={() => handleImageClick(index)}>
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
      </section>
      <SliderPhotographyMobile
        activeIndex={activeIndex}
        isOpen={isSliderOpen}
        photos={photo.gallery}
        setActiveIndex={setActiveIndex}
        setIsOpen={setIsSliderOpen}
      />
    </>
  );
};

export default ListPhotos;
