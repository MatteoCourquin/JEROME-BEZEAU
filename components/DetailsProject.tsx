import Link from 'next/link';
import { IconArrow } from './Icons';
import clsx from 'clsx';
import { forwardRef } from 'react';

type TypographyProps = {
  title: string;
  types: string[];
  className?: string;
};

const DetailsProject = forwardRef<HTMLDivElement, TypographyProps>(
  ({ title, types, className }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          className,
          'z-50 flex h-20 w-fit scale-0 items-center justify-end overflow-hidden rounded-t-full rounded-br-full bg-white-40 p-1 backdrop-blur-lg',
        )}
      >
        <Link href="/contact" className="flex items-center gap-[10px] px-10 text-black">
          <span className="whitespace-nowrap pt-0.5">{title}</span>
          <IconArrow className="!fill-black" />
        </Link>
        <div className="flex gap-[5px]">
          {types.map((type, index) => (
            <p key={index} className="tag">
              {type}
            </p>
          ))}
        </div>
      </div>
    );
  },
);

export default DetailsProject;
