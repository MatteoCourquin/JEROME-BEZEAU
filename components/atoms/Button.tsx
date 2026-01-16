import { useMagnet, useResetMagnet } from '@/hooks/useMagnet';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
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
    const arrowRefs = {
      first: useRef(null),
      second: useRef(null),
    };
    const textRef = useRef(null);

    const timelineRef = useRef<gsap.core.Timeline | null>(null);

    const { contextSafe } = useGSAP();

    const setupAnimation = contextSafe(() => {
      const splitText = new SplitText(textRef.current, {
        type: 'chars, words',
      });

      timelineRef.current = gsap
        .timeline({ paused: true, defaults: { duration: 0.6, ease: 'power3.inOut' } })
        .to(arrowRefs.second.current, {
          scale: 0,
        })
        .to(
          splitText.chars,
          {
            x: 24,
          },
          '-=0.5',
        )
        .to(
          arrowRefs.first.current,
          {
            scale: 1,
          },
          '-=0.5',
        );
    });

    useGSAP(() => {
      setupAnimation();
    }, []);

    const Tag = type === 'a' ? Link : ('button' as ElementType);

    return (
      <Tag
        ref={ref}
        className={clsx(
          'cursor-button group/button flex h-fit w-fit overflow-hidden rounded-full border-[1px] border-white-80 uppercase text-white-80 transition-colors duration-300 hover:border-transparent hover:bg-white-80 hover:text-black',
          disabled && 'opacity-50',
          className,
        )}
        onMouseMove={(e: MouseEvent<HTMLElement>) => useMagnet(e, 1)}
        onMouseEnter={() => {
          timelineRef.current?.play();
        }}
        onMouseLeave={() => {
          timelineRef.current?.reverse();
        }}
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
              <div ref={arrowRefs.first} className="absolute origin-bottom-left scale-0">
                <IconArrow className="-rotate-45 transition-colors duration-300 group-hover/button:!fill-black" />
              </div>
              <div ref={textRef} className="pt-0.5">
                {children}
              </div>
              <div ref={arrowRefs.second} className="origin-top-right">
                <IconArrow className="-rotate-45 transition-colors duration-300 group-hover/button:!fill-black" />
              </div>
            </>
          )}
        </div>
      </Tag>
    );
  },
);

export default Button;
