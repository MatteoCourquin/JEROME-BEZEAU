import clsx from 'clsx';
import { HTMLProps } from 'react';
import Media from '../atoms/Media';

interface CardPhotographyProps extends HTMLProps<HTMLDivElement> {
  indexId: string;
  photo: { title: string; imageCover: string };
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
    <div
      key={indexId}
      className={clsx(
        isIndexActive(indexId) ? 'opacity-100' : 'opacity-20',
        'see-more relative h-[25vh] w-auto shrink-0 grow transition-[opacity,filter] duration-300',
        className,
      )}
      {...props}
    >
      <Media
        alt={photo.title}
        className="h-full w-full object-cover"
        ratio="rectangle"
        src={photo.imageCover}
        type="image"
      />
    </div>
  );
};

export default CardPhotography;
