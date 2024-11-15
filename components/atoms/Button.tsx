import { useMagnet, useResetMagnet } from '@/utils/animations';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import gsap from 'gsap';
import Link from 'next/link';
import { ForwardedRef, forwardRef, ReactNode, useRef } from 'react';
import { IconArrow } from './Icons';

export enum BUTTON_SIZE {
  S = 's',
  M = 'm',
  L = 'l',
}

export enum BUTTON_TYPE {
  PRIMARY = 'primary',
  ICON = 'icon',
}

type ButtonProps = {
  type: 'a' | 'button' | 'submit';
  target?: '_blank';
  href?: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  isActive?: boolean;
};

const Button = forwardRef<HTMLAnchorElement | HTMLButtonElement | null, ButtonProps>(
  ({ type, target, href, children, className, onClick }, ref) => {
    const arrowRef = useRef(null);

    const { contextSafe } = useGSAP();
    const animArrow = contextSafe(() => {
      const timelineArrow = gsap.timeline({ paused: true });

      timelineArrow
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

    return (
      <>
        {type === 'a' && href && (
          <Link
            ref={ref as ForwardedRef<HTMLAnchorElement>}
            className={clsx('button cursor-button', className)}
            href={href}
            scroll={false}
            target={target}
            onMouseEnter={animArrow}
            onMouseLeave={(e) => useResetMagnet(e)}
            onMouseMove={(e) => useMagnet(e, 1)}
          >
            <div className="pt-0.5">{children}</div>
            <div ref={arrowRef}>
              <IconArrow />
            </div>
          </Link>
        )}
        {type === 'button' ||
          (type === 'submit' && (
            <button
              ref={ref as ForwardedRef<HTMLButtonElement>}
              className={clsx('button cursor-button', className)}
              type={type}
              onClick={onClick}
              onMouseEnter={animArrow}
              onMouseLeave={(e) => useResetMagnet(e)}
              onMouseMove={(e) => useMagnet(e, 1)}
            >
              <div className="pt-0.5">{children}</div>
              <div ref={arrowRef}>
                <IconArrow />
              </div>
            </button>
          ))}
      </>
    );
  },
);

export default Button;
