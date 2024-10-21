import { useTouchDevice } from '@/utils/states';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';

enum CURSOR_STATE {
  DEFAULT = 'DEFAULT',
  SEE_MORE = 'SEE_MORE',
  LINK = 'LINK',
}

const Cursor = () => {
  if (useTouchDevice()) return null;

  const { contextSafe } = useGSAP();

  const pointerRef = useRef<HTMLDivElement>(null);

  const [cursorState, setCursorState] = useState(CURSOR_STATE.DEFAULT);

  const moveCursor = contextSafe((e: MouseEvent) => {
    if (!pointerRef.current) return;

    pointerRef.current.style.opacity = '1';

    gsap.to(pointerRef.current, {
      duration: 0.1,
      x: e.clientX,
      y: e.clientY,
    });
  });

  const hideCursor = () => {
    if (!pointerRef.current) return;
    pointerRef.current.style.opacity = '0';
  };

  const changeCursorState = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('.see-more')) {
      setCursorState(CURSOR_STATE.SEE_MORE);
    } else if (target.closest('a')) {
      setCursorState(CURSOR_STATE.LINK);
    } else {
      setCursorState(CURSOR_STATE.DEFAULT);
    }
  };

  useEffect(() => {
    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseout', hideCursor);
    window.addEventListener('mouseover', changeCursorState); // Detect hover state

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseout', hideCursor);
      window.removeEventListener('mouseover', changeCursorState);
    };
  }, []);

  return (
    <>
      <div ref={pointerRef} className="pointer-events-none fixed left-0 top-0 z-[9999] opacity-0">
        <div
          className={clsx(
            'absolute h-[120px] w-[120px] -translate-x-1/2 -translate-y-1/2 transition-[transform,border-radius,backdrop-filter,filter]',
            cursorState === CURSOR_STATE.DEFAULT && 'scale-[0.1] grayscale backdrop-invert',
            cursorState === CURSOR_STATE.LINK && 'scale-50 rounded-full border-2',
            cursorState === CURSOR_STATE.SEE_MORE &&
              'scale-[1] rounded-full bg-white-40 backdrop-blur-lg',
          )}
        >
          <span
            className={clsx(
              cursorState === CURSOR_STATE.SEE_MORE ? 'scale-100' : 'scale-0',
              'inline-block w-full text-center leading-[120px]',
            )}
          >
            SEE MORE
          </span>
        </div>
      </div>
    </>
  );
};

export default Cursor;
