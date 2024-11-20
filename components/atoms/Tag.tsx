import { HTMLAttributes, ReactNode } from 'react';
import { useMagnet, useResetMagnet } from '@/hooks/useMagnet';
import clsx from 'clsx';

export enum TAG_VARIANT {
  DARK = 'DARK',
  LIGHT = 'LIGHT',
}

interface TagProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: TAG_VARIANT;
}

const Tag = ({ children, variant = TAG_VARIANT.LIGHT, className, ...props }: TagProps) => {
  return (
    <button
      className={clsx(
        'h-[70px] min-w-20 shrink-0 rounded-full uppercase text-white-80 backdrop-blur-xl',
        variant === TAG_VARIANT.DARK && 'bg-black',
        variant === TAG_VARIANT.LIGHT && '!bg-[#ffffff0a]',
        className,
      )}
      onMouseMove={(e) => useMagnet(e, 0.8)}
      onMouseOut={(e) => useResetMagnet(e)}
      {...props}
    >
      <span
        className="flex h-full w-full items-center justify-center whitespace-nowrap px-5"
        onMouseMove={(e) => useMagnet(e, 0.4)}
        onMouseOut={(e) => useResetMagnet(e)}
      >
        {children}
      </span>
    </button>
  );
};

export default Tag;
