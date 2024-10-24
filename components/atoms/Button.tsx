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
  as: 'a' | 'button';
  target?: '_blank';
  // type?: BUTTON_TYPE;
  // color?: 'black' | 'white';
  href?: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  inForm?: boolean;
  // size?: BUTTON_SIZE;
  isActive?: boolean;
};

const Button = forwardRef<HTMLAnchorElement | HTMLButtonElement | null, ButtonProps>(
  (
    {
      as,
      target,
      // type = BUTTON_TYPE.PRIMARY,
      // color = 'black',
      href,
      children,
      className,
      onClick,
      inForm = false,
      // size = BUTTON_SIZE.M,
    },
    ref,
  ) => {
    const arrowRef = useRef(null);

    const { contextSafe } = useGSAP();
    const animArrow = contextSafe(() => {
      const timelineArrow = gsap.timeline({ paused: true });

      timelineArrow
        .add(
          gsap.to(arrowRef.current, {
            x: 20,
            y: -20,
            duration: 0.15,
            opacity: 0,
          }),
        )
        .add(
          gsap.to(arrowRef.current, {
            x: -20,
            y: 20,
            duration: 0.15,
            opacity: 0,
          }),
        )
        .add(
          gsap.to(arrowRef.current, {
            x: 0,
            y: 0,
            opacity: 1,
            duration: 0.15,
          }),
        )
        .play();
    });
    return (
      <>
        {as === 'a' && href && (
          <Link
            ref={ref as ForwardedRef<HTMLAnchorElement>}
            className={clsx('button cursor-button', className)}
            href={href}
            scroll={false}
            target={target}
            onMouseEnter={animArrow}
            onMouseOut={(e) => useResetMagnet(e)}
            onMouseOver={(e) => useMagnet(e, 1)}
          >
            <div className="pt-0.5">{children}</div>
            <div ref={arrowRef}>
              <IconArrow />
            </div>
          </Link>
        )}
        {as === 'button' && (
          <button
            ref={ref as ForwardedRef<HTMLButtonElement>}
            className={clsx('button cursor-button', className)}
            type={inForm ? 'submit' : 'button'}
            onClick={onClick}
            onMouseEnter={animArrow}
            onMouseOut={(e) => useResetMagnet(e)}
            onMouseOver={(e) => useMagnet(e, 1)}
          >
            <div className="pt-0.5">{children}</div>
            <div ref={arrowRef}>
              <IconArrow />
            </div>
          </button>
        )}
      </>
    );
  },
);

export default Button;
