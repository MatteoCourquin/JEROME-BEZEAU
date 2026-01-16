import { isTouchDevice } from '@/hooks/useTouchDevice';
import { CURSOR_STATE, useCursor } from '@/providers/cursor.provider';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import gsap from 'gsap';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef } from 'react';
import { IconChevron } from './atoms/Icons';

const Cursor = () => {
  const { contextSafe } = useGSAP();
  const pathname = usePathname();
  const { cursorState, isActive, setIsActive, changeToPointer, changeToDefault, setCursorState } =
    useCursor();
  const pointerRefs = {
    primary: useRef<HTMLDivElement>(null),
    secondary: useRef<HTMLDivElement>(null),
  };
  const observerRef = useRef<MutationObserver | null>(null);

  const cursorStateHandlers = {
    changeToButton: useCallback(() => changeToPointer(), []),
    changeToDefault: useCallback(() => changeToDefault(), []),
  };

  const cursorHandlers = {
    moveCursor: contextSafe((e: MouseEvent) => {
      if (!pointerRefs.primary.current || !pointerRefs.secondary.current) return;
      pointerRefs.primary.current.style.opacity = '1';
      pointerRefs.secondary.current.style.opacity = '1';
      gsap.to([pointerRefs.primary.current, pointerRefs.secondary.current], {
        duration: (i: number) => 0.3 * (i + 1),
        x: e.clientX,
        y: e.clientY,
        ease: 'power2.out',
      });
    }),
    handleMouseDown: useCallback(() => {
      setIsActive(true);
    }, []),
    handleMouseUp: useCallback(() => {
      setIsActive(false);
    }, []),
  };

  const manageCursorEvents = useCallback(
    (event: 'addEventListener' | 'removeEventListener') => {
      const elements = {
        button: document.querySelectorAll('.cursor-pointer'),
      };

      Object.entries({
        button: cursorStateHandlers.changeToButton,
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
    // Ne pas ajouter les event listeners sur les appareils tactiles
    if (isTouchDevice()) return;

    observerRef.current = new MutationObserver(() => {
      manageCursorEvents('removeEventListener');
      manageCursorEvents('addEventListener');
    });

    const { moveCursor, handleMouseDown, handleMouseUp } = cursorHandlers;

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    manageCursorEvents('addEventListener');
    observerRef.current.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      manageCursorEvents('removeEventListener');
      observerRef.current?.disconnect();
    };
  }, [cursorHandlers, manageCursorEvents]);

  useEffect(() => {
    setTimeout(() => {
      setCursorState(CURSOR_STATE.DEFAULT);
    }, 500);
  }, [pathname, setCursorState]);

  if (isTouchDevice()) return null;

  return (
    <>
      <div
        ref={pointerRefs.primary}
        className={clsx(
          'pointer-events-none fixed left-0 top-0 z-[9999] flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center mix-blend-difference',
        )}
      >
        <div
          className={clsx(
            'h-2 w-2 rounded-full bg-white transition-all',
            isActive && 'scale-75',
            cursorState === CURSOR_STATE.POINTER && 'scale-150',
            cursorState === CURSOR_STATE.JOYSTICK && 'scale-0',
          )}
        />
        <div
          className={clsx(
            cursorState === CURSOR_STATE.JOYSTICK ? 'scale-100' : 'scale-0',
            'absolute transition-transform duration-300',
          )}
        >
          DRAG
        </div>
      </div>
      <div
        ref={pointerRefs.secondary}
        className={clsx(
          'pointer-events-none fixed left-0 top-0 z-[9999] flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center mix-blend-difference',
        )}
      >
        <div
          className={clsx(
            'h-10 w-10 rounded-full border border-white transition-all',
            cursorState === CURSOR_STATE.DEFAULT && 'scale-100',
            cursorState === CURSOR_STATE.POINTER && 'scale-0',
            cursorState === CURSOR_STATE.JOYSTICK && 'scale-0',
          )}
        />
        <div
          className={clsx(
            'absolute flex items-center justify-center transition-transform duration-300',
            cursorState === CURSOR_STATE.JOYSTICK ? 'scale-100' : 'scale-0',
          )}
        >
          <IconChevron
            className="absolute h-4 w-4 translate-x-20 fill-white opacity-40"
            direction="right"
          />
          <IconChevron
            className="absolute h-4 w-4 translate-y-20 fill-white opacity-40"
            direction="down"
          />
          <IconChevron
            className="absolute h-4 w-4 -translate-x-20 fill-white opacity-40"
            direction="left"
          />
          <IconChevron
            className="absolute h-4 w-4 -translate-y-20 fill-white opacity-40"
            direction="up"
          />
        </div>
      </div>
    </>
  );
};

export default Cursor;
