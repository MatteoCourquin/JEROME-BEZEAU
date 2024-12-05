import { Photo } from '@/types';
import clsx from 'clsx';
import { RefObject } from 'react';
import CardPhotographyDesktop from './sections/CardPhotographyDesktop';

type ScrollerRowProps = {
  refIndex: number;
  scrollRef: RefObject<HTMLDivElement>;
  photos: Photo[];
  isIndexActive: (indexId: string) => boolean;
  onMouseEnter: (photo: Photo, indexId: string) => void;
  onMouseLeave: () => void;
};

const ScrollerRow = ({
  refIndex,
  scrollRef,
  photos,
  isIndexActive,
  onMouseEnter,
  onMouseLeave,
}: ScrollerRowProps) => {
  return (
    <div ref={scrollRef} className="flex w-full justify-center">
      {Array.from({ length: 3 }).map((_, indexWrapper) => (
        <div key={indexWrapper} className="flex shrink-0 bg-black">
          {photos
            .slice(refIndex * (photos.length / 2), (refIndex + 1) * (photos.length / 2))
            .map((photo, indexItem) => {
              const indexId = `${photo.title}-${indexWrapper}-${indexItem}-${refIndex}`;
              return (
                <CardPhotographyDesktop
                  key={indexId}
                  className={clsx(refIndex === 0 ? 'pb-2' : 'pt-2', 'slider-item px-2')}
                  indexId={indexId}
                  isIndexActive={isIndexActive}
                  photo={photo}
                  onMouseEnter={() => onMouseEnter(photo, indexId)}
                  onMouseLeave={onMouseLeave}
                />
              );
            })}
        </div>
      ))}
    </div>
  );
};

export default ScrollerRow;
