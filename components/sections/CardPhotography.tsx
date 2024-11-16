import { Photo } from '@/services/photos.sevices';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { HTMLProps } from 'react';

interface CardPhotographyProps extends HTMLProps<HTMLAnchorElement> {
  indexId: string;
  photo: Photo;
  isIndexActive: (id: string) => boolean;
  className: string;
}

const CardPhotography = ({
  indexId,
  photo,
  isIndexActive,
  className,
  ...props
}: CardPhotographyProps) => {
  return (
    <Link
      key={indexId}
      href={'/photography/' + photo.slug.current}
      className={clsx(
        isIndexActive(indexId) ? 'opacity-100' : 'opacity-20',
        'cursor-see-more aspect-4/3 relative h-[25vh] w-auto shrink-0 grow transition-[opacity,filter] duration-300',
        className,
      )}
      {...props}
    >
      <Image
        alt={photo.title}
        className="h-full w-full object-cover"
        height={900}
        src={photo.mainImage}
        width={1200}
        unoptimized
      />
    </Link>
  );
};

export default CardPhotography;
