import { useTouchDevice } from '@/utils/states';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import gsap from 'gsap';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

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

  const attachCursorEvents = () => {
    document.querySelectorAll('.cursor-see-more').forEach((el) => {
      el.addEventListener('mouseover', () => setCursorState(CURSOR_STATE.SEE_MORE));
      el.addEventListener('mouseleave', () => setCursorState(CURSOR_STATE.DEFAULT));
    });

    document.querySelectorAll('.cursor-button').forEach((el) => {
      el.addEventListener('mouseover', () => setCursorState(CURSOR_STATE.BUTTON));
      el.addEventListener('mouseleave', () => setCursorState(CURSOR_STATE.DEFAULT));
    });
  };

  const detachCursorEvents = () => {
    document.querySelectorAll('.cursor-see-more').forEach((el) => {
      el.removeEventListener('mouseover', () => setCursorState(CURSOR_STATE.SEE_MORE));
      el.removeEventListener('mouseleave', () => setCursorState(CURSOR_STATE.DEFAULT));
    });

    document.querySelectorAll('.cursor-button').forEach((el) => {
      el.removeEventListener('mouseover', () => setCursorState(CURSOR_STATE.BUTTON));
      el.removeEventListener('mouseleave', () => setCursorState(CURSOR_STATE.DEFAULT));
    });
  };

  useEffect(() => {
    setCursorState(CURSOR_STATE.DEFAULT);
    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseout', hideCursor);

    attachCursorEvents();

    const observer = new MutationObserver(() => {
      detachCursorEvents();
      attachCursorEvents();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseout', hideCursor);

      detachCursorEvents();
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    setCursorState(CURSOR_STATE.DEFAULT);
  }, [pathname]);

  return (
    <>
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
              cursorState === CURSOR_STATE.SEE_MORE ? 'scale-100' : 'scale-0',
              'pointer-events-none inline-block w-full text-center leading-[120px]',
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
