import { useMagnet, useResetMagnet } from '@/hooks/useMagnet';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import gsap from 'gsap';
import Link from 'next/link';
import {
  ComponentPropsWithRef,
  ElementType,
  forwardRef,
  MouseEvent,
  ReactNode,
  useRef,
} from 'react';
import { IconArrow } from './Icons';

interface ButtonProps extends Omit<ComponentPropsWithRef<'button'>, 'type'> {
  type: 'a' | 'button' | 'submit';
  isIcon?: boolean;
  target?: '_blank';
  href?: string;
  children: ReactNode;
  className?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ type, target, href, children, isIcon, disabled, className, onClick, ...props }, ref) => {
    const arrowRef = useRef(null);

    const { contextSafe } = useGSAP();
    const animArrow = contextSafe(() => {
      gsap
        .timeline({ paused: true })
        .to(arrowRef.current, {
          x: 20,
          y: -20,
          duration: 0.15,
          opacity: 0,
        })
        .to(arrowRef.current, {
          x: -20,
          y: 20,
          duration: 0.15,
          opacity: 0,
        })
        .to(arrowRef.current, {
          x: 0,
          y: 0,
          opacity: 1,
          duration: 0.15,
        })
        .play();
    });

    const Tag = type === 'a' ? Link : ('button' as ElementType);

    return (
      <Tag
        ref={ref}
        className={clsx(
          'cursor-button group/button flex h-fit w-fit overflow-hidden rounded-full border-[1px] border-white-80 uppercase text-white-80 transition-colors duration-300 hover:border-transparent hover:bg-white-80 hover:text-black',
          disabled && 'opacity-50',
          className,
        )}
        onMouseEnter={animArrow}
        onMouseLeave={useResetMagnet}
        onMouseMove={(e: MouseEvent<HTMLElement>) => useMagnet(e, 1)}
        {...(type === 'a'
          ? {
              href,
              scroll: false,
              target,
            }
          : {
              type,
              onClick,
              ...props,
            })}
      >
        <div
          className={clsx(
            'flex h-10 items-center',
            isIcon ? 'w-10 justify-center' : 'w-auto flex-nowrap gap-[10px] whitespace-nowrap px-5',
          )}
          onMouseLeave={useResetMagnet}
          onMouseMove={(e: MouseEvent<HTMLElement>) => useMagnet(e, 0.5)}
        >
          {isIcon ? (
            children
          ) : (
            <>
              <div className="pt-0.5">{children}</div>
              <div ref={arrowRef} className="-rotate-45">
                <IconArrow className="transition-colors duration-300 group-hover/button:!fill-black" />
              </div>
            </>
          )}
        </div>
      </Tag>
    );
  },
);

export default Button;
