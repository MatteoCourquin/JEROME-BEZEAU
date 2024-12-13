import { useMatchMedia } from '@/hooks/useCheckScreenSize';
import { BREAKPOINTS } from '@/tailwind.config';
import { getFirstName } from '@/utils';
import { forwardRef, HTMLAttributes, useImperativeHandle, useRef } from 'react';
import gsap from 'gsap';

interface CreditProps extends HTMLAttributes<HTMLElement> {
  role: string;
  author: string;
  href: string;
}

export interface AnimatedCreditRef {
  textAnimation: () => gsap.core.Timeline;
}

const Credits = forwardRef<AnimatedCreditRef, CreditProps>(
  ({ role, author, href, ...props }, ref) => {
    const isSmallMobile = useMatchMedia(BREAKPOINTS.XS);

    const roleContainerRef = useRef(null);
    const roleRef = useRef(null);
    const lineRef = useRef(null);
    const authorContainerRef = useRef(null);
    const authorLinkRef = useRef(null);
    const authorTextRef = useRef(null);

    useImperativeHandle(ref, () => ({
      textAnimation: () => {
        const timeline = gsap.timeline();

        timeline
          .to(roleContainerRef.current, {
            width: 'auto',
            duration: 0.8,
            ease: 'power2.inOut',
          })
          .from(
            lineRef.current,
            {
              scaleX: 0,
              duration: 0.8,
              ease: 'power2.inOut',
            },
            '-=0.6',
          )
          .to(
            authorContainerRef.current,
            {
              width: 'auto',
              duration: 0.8,
              ease: 'power2.inOut',
            },
            '-=0.6',
          );

        return timeline;
      },
    }));

    return (
      <li {...props} className="flex items-center gap-x-3 transition-[padding-left] hover:pl-3">
        <p
          ref={roleContainerRef}
          className="relative w-0 shrink-0 overflow-hidden uppercase text-white-40"
        >
          <span ref={roleRef} className="inline-block whitespace-nowrap">
            {role}
          </span>
        </p>
        <div ref={lineRef} className="h-px min-w-4 grow origin-left bg-white-12"></div>
        {href ? (
          <a
            ref={authorContainerRef}
            className="link link_white-80 cursor-button w-0 overflow-hidden text-ellipsis whitespace-nowrap"
            href={href}
            target="_blank"
          >
            <span
              ref={authorLinkRef}
              className="inline-block w-full overflow-hidden text-ellipsis whitespace-nowrap"
            >
              {isSmallMobile ? getFirstName(author) : author}
            </span>
          </a>
        ) : (
          <p
            ref={authorContainerRef}
            className="w-0 overflow-hidden text-ellipsis whitespace-nowrap text-white-40"
          >
            <span
              ref={authorTextRef}
              className="inline-block w-full overflow-hidden text-ellipsis whitespace-nowrap"
            >
              {isSmallMobile ? getFirstName(author) : author}
            </span>
          </p>
        )}
      </li>
    );
  },
);

export default Credits;
