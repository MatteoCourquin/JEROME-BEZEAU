import clsx from 'clsx';
import Link from 'next/link';
import { IconArrow } from './Icons';

const DetailsProject = ({
  isRight,
  title,
  types,
}: {
  isRight: boolean;
  title: string;
  types: string[];
}) => {
  return (
    <div
      className={clsx(
        'flex h-20 w-fit items-center justify-end overflow-hidden rounded-t-full bg-white-40 p-1 backdrop-blur-lg',
        isRight ? 'flex-row rounded-br-full' : '-translate-x-full flex-row-reverse rounded-bl-full',
      )}
    >
      <Link
        href="/contact"
        className={clsx(
          'flex items-center gap-[10px] px-10 text-black',
          isRight ? 'flex-row' : 'flex-row-reverse',
        )}
      >
        <IconArrow className={clsx('!fill-black', isRight ? 'rotate-0' : 'rotate-180')} />
        <span className="whitespace-nowrap pt-0.5">{title}</span>
      </Link>
      <div className={clsx('flex gap-[5px]', isRight ? 'flex-row' : 'flex-row-reverse')}>
        {types.map((type, index) => (
          <p key={index} className="tag">
            {type}
          </p>
        ))}
      </div>
    </div>
  );
};

export default DetailsProject;
