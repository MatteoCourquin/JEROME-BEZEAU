import clsx from 'clsx';
import Image from 'next/image';
import { forwardRef, HTMLProps, Ref, VideoHTMLAttributes } from 'react';

interface MediaProps extends HTMLProps<HTMLImageElement | HTMLVideoElement> {
  src: string;
  alt: string;
  ratio?: 'square' | 'rectangle';
  type: 'image' | 'video';
  sizes?: 'sm' | 'md' | 'lg' | 'xl';
}

const Media = forwardRef<HTMLImageElement | HTMLVideoElement, MediaProps>(
  ({ src, alt = '', sizes = 'md', ratio = 'square', type = 'image', ...props }, ref) => {
    const getSizes = (size: 'sm' | 'md' | 'lg' | 'xl', ratio: 'square' | 'rectangle') => {
      const sizes = {
        square: {
          sm: { width: 800, height: 800 },
          md: { width: 1200, height: 1200 },
          lg: { width: 1500, height: 1500 },
          xl: { width: 1800, height: 1800 },
        },
        rectangle: {
          sm: { width: 800, height: 600 },
          md: { width: 1024, height: 768 },
          lg: { width: 1600, height: 1200 },
          xl: { width: 1920, height: 1440 },
        },
      };

      if (sizes[ratio]) {
        return sizes[ratio][size];
      }

      throw new Error('Invalid ratio');
    };

    return (
      <>
        {type === 'video' && (
          <video
            ref={ref as Ref<HTMLVideoElement>}
            {...(props as VideoHTMLAttributes<HTMLVideoElement>)}
            className={clsx(
              ratio === 'square' ? 'aspect-square' : 'aspect-[4/3]',
              'h-full w-full object-cover',
              props.className,
            )}
            autoPlay
            loop
            muted
          >
            <source src={src} type="video/mp4" />
            Votre navigateur ne supporte pas la vidéo.
          </video>
        )}
        {type === 'image' && (
          <Image
            ref={ref as Ref<HTMLImageElement>}
            {...(props as VideoHTMLAttributes<HTMLImageElement>)}
            alt={alt}
            height={getSizes(sizes, ratio).height}
            src={src}
            width={getSizes(sizes, ratio).width}
            className={clsx(
              ratio === 'square' ? 'aspect-square' : 'aspect-[4/3]',
              'h-full w-full object-cover',
              props.className,
            )}
            unoptimized
          />
        )}
      </>
    );
  },
);

export default Media;
