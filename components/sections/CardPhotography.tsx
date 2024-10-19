import clsx from 'clsx';
import Image from 'next/image';

interface CardPhotographyProps extends React.HTMLProps<HTMLDivElement> {
  indexId: string;
  photo: { title: string; imageCover: string };
  isIndexActive: (id: string) => boolean;
  className: string;
}

const CardPhotography: React.FC<CardPhotographyProps> = ({
  indexId,
  photo,
  isIndexActive,
  className,
  ...props
}) => {
  return (
    <div
      key={indexId}
      className={clsx(
        isIndexActive(indexId) ? 'opacity-100' : 'opacity-20',
        'relative aspect-[4/3] h-64 w-auto min-w-[25vw] shrink-0 grow transition-[opacity,filter] duration-300',
        className,
      )}
      {...props}
    >
      <Image
        alt={photo.title}
        className="h-full w-full object-cover"
        height={920}
        src={photo.imageCover}
        width={1080}
      />
    </div>
  );
};

export default CardPhotography;
