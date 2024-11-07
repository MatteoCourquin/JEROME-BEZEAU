import { Photo } from '@/services/photos.sevices';
import clsx from 'clsx';
import Link from 'next/link';
import { HTMLProps } from 'react';
import Media from '../atoms/Media';

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
        'cursor-see-more relative h-[25vh] w-auto shrink-0 grow transition-[opacity,filter] duration-300',
        className,
      )}
      {...props}
    >
      <Media
        alt={photo.title}
        className="h-full w-full object-cover"
        ratio="rectangle"
        src={photo.mainImage}
        type="image"
      />
    </Link>
  );
};

export default CardPhotography;
