import { useTouchDevice } from '@/hooks/useTouchDevice';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import gsap from 'gsap';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

enum CURSOR_STATE {
  DEFAULT = 'DEFAULT',
  SEE_MORE = 'SEE_MORE',
  BUTTON = 'BUTTON',
}

const Cursor = () => {
  if (useTouchDevice()) return null;

  const { contextSafe } = useGSAP();
  const pathname = usePathname();
  const pointerRef = useRef<HTMLDivElement>(null);

  const [cursorState, setCursorState] = useState(CURSOR_STATE.DEFAULT);

  const changeToSeeMore = useCallback(() => setCursorState(CURSOR_STATE.SEE_MORE), []);
  const changeToButton = useCallback(() => setCursorState(CURSOR_STATE.BUTTON), []);
  const changeToDefault = useCallback(() => setCursorState(CURSOR_STATE.DEFAULT), []);

  const moveCursor = contextSafe((e: MouseEvent) => {
    const pointer = pointerRef.current;
    if (!pointer) return;

    pointer.style.opacity = '1';
    gsap.to(pointer, {
      duration: 0.1,
      x: e.clientX,
      y: e.clientY,
    });
  });

  const hideCursor = useCallback(() => {
    if (!pointerRef.current) return;
    pointerRef.current.style.opacity = '0';
  }, []);

  const manageCursorEvents = useCallback(
    (event: 'addEventListener' | 'removeEventListener') => {
      const seeMoreElements = document.querySelectorAll('.cursor-see-more');
      const buttonElements = document.querySelectorAll('.cursor-button');

      [
        { elements: seeMoreElements, handler: changeToSeeMore },
        { elements: buttonElements, handler: changeToButton },
      ].forEach(({ elements, handler }) => {
        elements.forEach((el) => {
          el[event]('mouseenter', handler);
          el[event]('mouseleave', changeToDefault);
        });
      });
    },
    [changeToSeeMore, changeToButton, changeToDefault],
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      manageCursorEvents('removeEventListener');
      manageCursorEvents('addEventListener');
    });

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseout', hideCursor);
    manageCursorEvents('addEventListener');
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseout', hideCursor);
      manageCursorEvents('removeEventListener');
      observer.disconnect();
    };
  }, [moveCursor, hideCursor, manageCursorEvents]);

  useEffect(() => {
    setCursorState(CURSOR_STATE.DEFAULT);
  }, [pathname]);

  return (
    <div ref={pointerRef} className="pointer-events-none fixed left-0 top-0 z-[9999] opacity-0">
      <div
        className={clsx(
          'pointer-events-none absolute h-[120px] w-[120px] -translate-x-1/2 -translate-y-1/2 transition-all',
          cursorState === CURSOR_STATE.DEFAULT && 'scale-[0.1] grayscale backdrop-invert',
          cursorState === CURSOR_STATE.BUTTON && 'scale-50 rounded-full border-2 border-white-80',
          cursorState === CURSOR_STATE.SEE_MORE &&
            'scale-[1] rounded-full bg-white-40 backdrop-blur-lg',
        )}
      >
        <span
          className={clsx(
            'pointer-events-none inline-block w-full text-center leading-[120px]',
            cursorState === CURSOR_STATE.SEE_MORE ? 'scale-100' : 'scale-0',
          )}
        >
          SEE MORE
        </span>
      </div>
    </div>
  );
};

export default Cursor;
