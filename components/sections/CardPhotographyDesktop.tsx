import { Photo } from '@/types';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { HTMLProps } from 'react';

interface CardPhotographyProps extends HTMLProps<HTMLAnchorElement> {
  photo: Photo;
  className?: string;
}

const CardPhotographyDesktop = ({ photo, className, ...props }: CardPhotographyProps) => {
  return (
    <Link
      className={clsx('relative h-full w-full', className)}
      href={'/photography/' + photo.slug.current}
      scroll={false}
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

export default CardPhotographyDesktop;
