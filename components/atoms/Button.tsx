import { useMagnet, useResetMagnet } from '@/hooks/useMagnet';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import gsap from 'gsap';
import Link from 'next/link';
import { ForwardedRef, forwardRef, ReactNode, useRef } from 'react';
import { IconArrow } from './Icons';

interface ButtonProps {
  type: 'a' | 'button' | 'submit';
  target?: '_blank';
  href?: string;
  disabled?: boolean;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  isActive?: boolean;
}

const Button = forwardRef<HTMLAnchorElement | HTMLButtonElement | null, ButtonProps>(
  ({ type, target, href, children, disabled, className, onClick }, ref) => {
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
              disabled={disabled}
              type={type}
              className={clsx('button cursor-button', className, {
                'cursor-not-allowed opacity-50': disabled,
              })}
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
