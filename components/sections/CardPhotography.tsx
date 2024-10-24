import clsx from 'clsx';
import { HTMLProps } from 'react';
import Media from '../atoms/Media';
import Link from 'next/link';
import { Photo } from '@/services/photos.sevices';
import { urlFor } from '@/sanity/lib/image';

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
      href={`/photography/${photo.slug.current}`}
      className={clsx(
        isIndexActive(indexId) ? 'opacity-100' : 'opacity-20',
        'cursor-content relative h-[25vh] w-auto shrink-0 grow transition-[opacity,filter] duration-300',
        className,
      )}
      {...props}
    >
      <Media
        alt={photo.title}
        className="h-full w-full object-cover"
        ratio="rectangle"
        src={urlFor(photo.mainImage).toString()}
        type="image"
      />
    </Link>
  );
};

export default CardPhotography;
