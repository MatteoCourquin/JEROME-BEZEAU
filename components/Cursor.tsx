import { useTouchDevice } from '@/utils/states';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';

const Cursor = () => {
  if (useTouchDevice()) return null;

  const { contextSafe } = useGSAP();

  const cursorRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  const moveCursor = contextSafe((e: MouseEvent) => {
    if (!cursorRef.current) return;

    cursorRef.current.style.opacity = '1';

    gsap.to(cursorRef.current, {
      duration: 0.1,
      x: e.clientX,
      y: e.clientY,
    });
  });

  const hideCursor = () => {
    if (!cursorRef.current) return;
    cursorRef.current.style.opacity = '0';
  };

  const handleHoverLink = () => {
    gsap
      .timeline()
      .to(pointerRef.current, {
        rotation: -90,
        x: -12,
        duration: 0.3,
      })
      .to(pointerRef.current, {
        width: 60,
        height: 60,
        x: -30,
        y: -30,
        borderRadius: 999,
        border: '1px solid #ffffffcc',
        filter: 'grayscale(0%)',
        backdropFilter: 'invert(0%)',
        duration: 0.3,
        delay: 0.2,
        ease: 'power3.out',
      });
  };

  const handleHoverSeeMore = () => {
    gsap
      .timeline()
      .to(pointerRef.current, {
        rotation: -90,
        x: -12,
        duration: 0.3,
      })
      .to(pointerRef.current, {
        width: 120,
        height: 120,
        x: -60,
        y: -60,
        borderRadius: 999,
        filter: 'grayscale(0%)',
        backdropFilter: 'blur(16px) invert(0%)',
        background: '#ffffff66',
        duration: 0.3,
        delay: 0.2,
        ease: 'power3.out',
      })
      .to(
        textRef.current,
        {
          opacity: 1,
          duration: 0.3,
          ease: 'power3.out',
        },
        // '-=0.3',
      );
  };

  const resetCursorState = () => {
    gsap
      .timeline()
      .to(textRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.out',
      })
      .to(pointerRef.current, {
        rotation: 0,
        x: -6,
        y: -6,
        width: 12,
        height: 12,
        borderRadius: 0,
        background: '#ffffff00',
        border: 'none',
        filter: 'grayscale(100%)',
        backdropFilter: 'invert(100%)',
        duration: 0.3,
        ease: 'power2.out',
      });
  };

  useEffect(() => {
    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseout', hideCursor);

    document.querySelectorAll('.see-more').forEach((el) => {
      el.addEventListener('mouseover', handleHoverSeeMore);
      el.addEventListener('mouseleave', resetCursorState);
    });

    document.querySelectorAll('a').forEach((el) => {
      el.addEventListener('mouseover', handleHoverLink);
      el.addEventListener('mouseleave', resetCursorState);
    });
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] -translate-x-1/2 -translate-y-1/2 opacity-0"
      >
        <div
          ref={pointerRef}
          className={clsx(
            'pointer-events-none absolute h-[12px] w-[12px] grayscale backdrop-invert',
          )}
        >
          <span
            ref={textRef}
            className="inline-block w-full rotate-90 text-center leading-[120px] opacity-0"
          >
            SEE MORE
          </span>
        </div>
      </div>
    </>
  );
};

export default Cursor;
