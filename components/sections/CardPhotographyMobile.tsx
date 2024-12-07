import { Photo } from '@/types';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import gsap from 'gsap';
import Image from 'next/image';
import Link from 'next/link';
import { HTMLProps, useRef } from 'react';

interface CardPhotographyProps extends HTMLProps<HTMLAnchorElement> {
  photo: Photo;
  className?: string;
}

const CardPhotographyMobile = ({ photo, className, ...props }: CardPhotographyProps) => {
  const wrapperRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      wrapperRef.current,
      { xPercent: 60 },
      {
        xPercent: -30,
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      },
    );
  }, []);

  return (
    <Link
      ref={wrapperRef}
      href={'/photography/' + photo.slug.current}
      scroll={false}
      className={clsx(
        'cursor-see-more aspect-4/3 relative h-auto w-full shrink-0 grow transition-[opacity,filter] duration-300',
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

export default CardPhotographyMobile;
