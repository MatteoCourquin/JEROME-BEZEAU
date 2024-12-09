import { useTouchDevice } from '@/hooks/useTouchDevice';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import gsap from 'gsap';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState, memo } from 'react';
import {
  IconChevronBottom,
  IconChevronLeft,
  IconChevronRight,
  IconChevronTop,
} from './atoms/Icons';

enum CURSOR_STATE {
  DEFAULT = 'DEFAULT',
  SEE_MORE = 'SEE_MORE',
  BUTTON = 'BUTTON',
  DRAG = 'DRAG',
}

const CursorArrows = memo(({ isActive }: { isActive: boolean }) => (
  <>
    <div
      className={clsx(
        'pointer-events-none absolute left-1/2 top-0 -translate-x-1/2',
        !isActive && 'arrow-top',
      )}
    >
      <IconChevronTop
        className={clsx(
          'pointer-events-none transition-transform duration-75',
          isActive && 'translate-y-2',
        )}
      />
    </div>
    <div
      className={clsx(
        'pointer-events-none absolute right-0 top-1/2 -translate-y-1/2',
        !isActive && 'arrow-right',
      )}
    >
      <IconChevronRight
        className={clsx(
          'pointer-events-none transition-transform duration-75',
          isActive && '-translate-x-2',
        )}
      />
    </div>
    <div
      className={clsx(
        'pointer-events-none absolute bottom-0 right-1/2 translate-x-1/2',
        !isActive && 'arrow-bottom',
      )}
    >
      <IconChevronBottom
        className={clsx(
          'pointer-events-none transition-transform duration-75',
          isActive && '-translate-y-2',
        )}
      />
    </div>
    <div
      className={clsx(
        'pointer-events-none absolute bottom-1/2 left-0 translate-y-1/2',
        !isActive && 'arrow-left',
      )}
    >
      <IconChevronLeft
        className={clsx(
          'pointer-events-none transition-transform duration-75',
          isActive && 'translate-x-2',
        )}
      />
    </div>
  </>
));

const Cursor = memo(() => {
  if (useTouchDevice()) return null;

  const { contextSafe } = useGSAP();
  const pathname = usePathname();
  const pointerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<MutationObserver | null>(null);

  const [cursorState, setCursorState] = useState(CURSOR_STATE.DEFAULT);
  const [isActive, setIsActive] = useState(false);

  const cursorStateHandlers = {
    changeToSeeMore: useCallback(() => setCursorState(CURSOR_STATE.SEE_MORE), []),
    changeToButton: useCallback(() => setCursorState(CURSOR_STATE.BUTTON), []),
    changeToDefault: useCallback(() => setCursorState(CURSOR_STATE.DEFAULT), []),
    changeToDrag: useCallback(() => setCursorState(CURSOR_STATE.DRAG), []),
  };

  const cursorHandlers = {
    moveCursor: contextSafe((e: MouseEvent) => {
      if (!pointerRef.current) return;
      pointerRef.current.style.opacity = '1';
      gsap.to(pointerRef.current, {
        duration: 0.1,
        x: e.clientX,
        y: e.clientY,
      });
    }),

    hideCursor: useCallback(() => {
      if (!pointerRef.current) return;
      pointerRef.current.style.opacity = '0';
    }, []),

    handleMouseDown: useCallback(() => setIsActive(true), []),
    handleMouseUp: useCallback(() => setIsActive(false), []),
  };

  const manageCursorEvents = useCallback(
    (event: 'addEventListener' | 'removeEventListener') => {
      const elements = {
        seeMore: document.querySelectorAll('.cursor-see-more'),
        button: document.querySelectorAll('.cursor-button'),
        drag: document.querySelectorAll('.cursor-drag'),
      };

      Object.entries({
        seeMore: cursorStateHandlers.changeToSeeMore,
        button: cursorStateHandlers.changeToButton,
        drag: cursorStateHandlers.changeToDrag,
      }).forEach(([key, handler]) => {
        elements[key as keyof typeof elements].forEach((el) => {
          el[event]('mouseover', handler);
          el[event]('mouseleave', cursorStateHandlers.changeToDefault);
        });
      });
    },
    [cursorStateHandlers],
  );

  useEffect(() => {
    observerRef.current = new MutationObserver(() => {
      manageCursorEvents('removeEventListener');
      manageCursorEvents('addEventListener');
    });

    const { moveCursor, hideCursor, handleMouseDown, handleMouseUp } = cursorHandlers;

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseout', hideCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    manageCursorEvents('addEventListener');
    observerRef.current.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseout', hideCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      manageCursorEvents('removeEventListener');
      observerRef.current?.disconnect();
    };
  }, [cursorHandlers, manageCursorEvents]);

  useEffect(() => {
    setTimeout(() => {
      setCursorState(CURSOR_STATE.DEFAULT);
    }, 1400);
  }, [pathname]);

  return (
    <div ref={pointerRef} className="pointer-events-none fixed left-0 top-0 z-[9999] opacity-0">
      <div
        className={clsx(
          'pointer-events-none absolute h-[120px] w-[120px] -translate-x-1/2 -translate-y-1/2 transition-all',
          cursorState === CURSOR_STATE.DEFAULT && 'scale-[0.1] grayscale backdrop-invert',
          cursorState === CURSOR_STATE.BUTTON && 'scale-50 rounded-full border-2 border-white-80',
          cursorState === CURSOR_STATE.SEE_MORE &&
            'scale-100 rounded-full bg-white-40 backdrop-blur-lg',
          cursorState === CURSOR_STATE.DRAG && 'scale-100 bg-transparent',
        )}
      >
        {cursorState === CURSOR_STATE.DRAG && <CursorArrows isActive={isActive} />}
        <span
          className={clsx(
            'pointer-events-none inline-block w-full scale-0 text-center leading-[120px] text-white',
            (cursorState === CURSOR_STATE.SEE_MORE || cursorState === CURSOR_STATE.DRAG) &&
              'scale-100',
          )}
        >
          {cursorState === CURSOR_STATE.SEE_MORE ? 'SEE MORE' : 'DRAG'}
        </span>
      </div>
    </div>
  );
});

export default Cursor;
