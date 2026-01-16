import { isTouchDevice } from '@/hooks/useTouchDevice';
import { useCursor } from '@/providers/cursor.provider';
import clsx from 'clsx';
import gsap from 'gsap';
import {
  Children,
  ReactElement,
  ReactNode,
  cloneElement,
  forwardRef,
  isValidElement,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';

type Point = { x: number; y: number };

interface InfiniteDragGridProps {
  children: ReactNode;
  className?: string;
  onAnimate?: (e: { velocity: number }) => void;
  unZoomOnDrag?: boolean;
}

export interface InfiniteDragGridHandle {
  getVelocity: () => number;
}

const GRID_SIZE = 5;
const OFFSETS = [-2, -1, 0, 1, 2];
const LERP_SPEED = 0.08;
const VELOCITY_SMOOTH = 0.15;
const MAX_VELOCITY = 6000;
const MIN_SCALE = 0.8;
const SCALE_FACTOR = 0.4;
const MIN_DELTA_TIME = 1 / 120;
const LONG_PRESS_DELAY = 100; // ms
const JOYSTICK_SPEED = 800; // pixels per second

const wrap = (value: number, size: number) => {
  if (!size) return 0;
  const result = value % size;
  return result < 0 ? result + size : result;
};

const InfiniteDragGrid = forwardRef<InfiniteDragGridHandle, InfiniteDragGridProps>(
  ({ children, className, onAnimate, unZoomOnDrag = false }, ref) => {
    const { changeToJoystick, changeToDefault } = useCursor();

    // Refs
    const containerRef = useRef<HTMLDivElement>(null);
    const measureTileRef = useRef<HTMLDivElement>(null);
    const clonesRef = useRef<HTMLDivElement[]>([]);
    const contentWrapperRef = useRef<HTMLDivElement>(null);
    const onAnimateRef = useRef(onAnimate);

    // State refs
    const velocityRef = useRef(0);
    const previousPositionRef = useRef<Point>({ x: 0, y: 0 });
    const sizeRef = useRef({ width: 0, height: 0 });
    const longPressTimerRef = useRef<number | null>(null);
    const dragRef = useRef({
      isDragging: false,
      isJoystickActive: false,
      start: { x: 0, y: 0 } as Point,
      startOffset: { x: 0, y: 0 } as Point,
      current: { x: 0, y: 0 } as Point,
      target: { x: 0, y: 0 } as Point,
      pointerStart: { x: 0, y: 0 } as Point,
      pointerCurrent: { x: 0, y: 0 } as Point,
      joystickSpeed: { x: 0, y: 0 } as Point,
    });

    // Update callback ref without re-rendering
    onAnimateRef.current = onAnimate;

    useImperativeHandle(ref, () => ({ getVelocity: () => velocityRef.current }), []);

    const childArray = useMemo(() => Children.toArray(children), [children]);

    useEffect(() => {
      const container = containerRef.current;
      const measureTile = measureTileRef.current;

      if (typeof window === 'undefined' || !container || !measureTile) {
        return undefined;
      }

      const state = dragRef.current;
      let rafId: number;
      let lastTime = performance.now();

      // Size observer
      const updateSize = () => {
        if (!measureTile) return;
        const rect = measureTile.getBoundingClientRect();
        sizeRef.current = { width: rect.width, height: rect.height };
      };

      const resizeObserver = window.ResizeObserver ? new window.ResizeObserver(updateSize) : null;

      if (resizeObserver) {
        resizeObserver.observe(measureTile);
        updateSize();
      }

      // Event handlers
      const activateJoystick = (pointerId: number) => {
        if (isTouchDevice()) return;
        state.isJoystickActive = true;
        state.isDragging = true;
        container.setPointerCapture(pointerId);
        container.classList.add('cursor-grabbing');
        document.body.style.userSelect = 'none';
        changeToJoystick();
      };

      const deactivateJoystick = (pointerId?: number) => {
        if (longPressTimerRef.current) {
          window.clearTimeout(longPressTimerRef.current);
          longPressTimerRef.current = null;
        }

        if (pointerId && container.hasPointerCapture(pointerId)) {
          container.releasePointerCapture(pointerId);
        }

        state.isJoystickActive = false;
        state.isDragging = false;
        state.joystickSpeed = { x: 0, y: 0 };
        container.classList.remove('cursor-grabbing');
        document.body.style.userSelect = '';

        if (!isTouchDevice()) {
          changeToDefault();
        }
      };

      const handlePointerDown = (e: globalThis.PointerEvent) => {
        if (isTouchDevice()) return;
        state.pointerStart = { x: e.clientX, y: e.clientY };
        state.pointerCurrent = { x: e.clientX, y: e.clientY };

        longPressTimerRef.current = window.setTimeout(() => {
          activateJoystick(e.pointerId);
        }, LONG_PRESS_DELAY);
      };

      const handlePointerMove = (e: globalThis.PointerEvent) => {
        state.pointerCurrent = { x: e.clientX, y: e.clientY };

        if (state.isJoystickActive) {
          e.preventDefault();

          // Calculer la distance depuis le point de départ (centre du joystick)
          const deltaX = e.clientX - state.pointerStart.x;
          const deltaY = e.clientY - state.pointerStart.y;

          // Normaliser la vitesse basée sur la distance (max 200px = vitesse max)
          const maxDistance = 200;
          const normalizedX = Math.max(-1, Math.min(1, deltaX / maxDistance));
          const normalizedY = Math.max(-1, Math.min(1, deltaY / maxDistance));

          // Appliquer une courbe pour un meilleur contrôle
          state.joystickSpeed = {
            x: normalizedX * Math.abs(normalizedX) * JOYSTICK_SPEED,
            y: normalizedY * Math.abs(normalizedY) * JOYSTICK_SPEED,
          };
        } else if (!state.isDragging) {
          // Si on bouge avant le long press, annuler le timer
          if (longPressTimerRef.current) {
            window.clearTimeout(longPressTimerRef.current);
            longPressTimerRef.current = null;
          }
        }
      };

      const handlePointerUp = (e?: globalThis.PointerEvent) => {
        const pointerId = e?.pointerId;
        deactivateJoystick(pointerId);
      };

      const handleWheel = (e: globalThis.WheelEvent) => {
        e.preventDefault();
        state.target.x -= e.deltaX;
        state.target.y -= e.deltaY;
      };

      // Render loop
      const render = () => {
        const { width, height } = sizeRef.current;
        const now = performance.now();
        const deltaTime = Math.max((now - lastTime) / 1000, MIN_DELTA_TIME);
        lastTime = now;

        // Si le joystick est actif, appliquer la vitesse constante
        if (state.isJoystickActive) {
          state.target.x += state.joystickSpeed.x * deltaTime;
          state.target.y += state.joystickSpeed.y * deltaTime;
        }

        // Update position with lerp
        state.current.x += (state.target.x - state.current.x) * LERP_SPEED;
        state.current.y += (state.target.y - state.current.y) * LERP_SPEED;

        // Calculate and smooth velocity
        const dx = state.current.x - previousPositionRef.current.x;
        const dy = state.current.y - previousPositionRef.current.y;
        const instantVelocity = Math.hypot(dx, dy) / deltaTime;
        velocityRef.current += (instantVelocity - velocityRef.current) * VELOCITY_SMOOTH;

        // Apply zoom effect
        if (unZoomOnDrag && contentWrapperRef.current) {
          const velocityFactor = Math.min(1, velocityRef.current / MAX_VELOCITY);
          const scale = Math.max(MIN_SCALE, 1 - velocityFactor * SCALE_FACTOR);
          gsap.to(contentWrapperRef.current, { scale, duration: 0.18, overwrite: 'auto' });
        }

        // Notify parent of velocity change (normalized between 0 and 1)
        if (onAnimateRef.current && instantVelocity > 0.1) {
          const normalizedVelocity = Math.min(1, velocityRef.current / MAX_VELOCITY);
          onAnimateRef.current({ velocity: normalizedVelocity });
        }

        previousPositionRef.current = { x: state.current.x, y: state.current.y };

        // Update clone positions
        if (width && height) {
          const offsetX = wrap(state.current.x, width);
          const offsetY = wrap(state.current.y, height);
          const baseX = offsetX - width * 2;
          const baseY = offsetY - height * 2;

          clonesRef.current.forEach((clone, index) => {
            if (!clone) return;
            const ix = index % GRID_SIZE;
            const iy = Math.floor(index / GRID_SIZE);
            clone.style.transform = `translate3d(${baseX + ix * width}px, ${baseY + iy * height}px, 0)`;
          });
        }

        rafId = requestAnimationFrame(render);
      };

      // Setup event listeners
      container.addEventListener('pointerdown', handlePointerDown);
      container.addEventListener('pointermove', handlePointerMove);
      container.addEventListener('wheel', handleWheel, { passive: false });
      window.addEventListener('pointerup', handlePointerUp);
      window.addEventListener('pointercancel', handlePointerUp);

      // Start animation loop
      rafId = requestAnimationFrame(render);

      // Cleanup
      return () => {
        if (longPressTimerRef.current) {
          window.clearTimeout(longPressTimerRef.current);
          longPressTimerRef.current = null;
        }
        resizeObserver?.disconnect();
        container.removeEventListener('pointerdown', handlePointerDown);
        container.removeEventListener('pointermove', handlePointerMove);
        container.removeEventListener('wheel', handleWheel);
        window.removeEventListener('pointerup', handlePointerUp);
        window.removeEventListener('pointercancel', handlePointerUp);
        cancelAnimationFrame(rafId);
        document.body.style.userSelect = '';
        if (!isTouchDevice()) {
          changeToDefault();
        }
      };
    }, [unZoomOnDrag, changeToJoystick, changeToDefault]);

    const renderChildren = (cloneKey: string) =>
      childArray.map((child, index) => {
        if (typeof child === 'string' || typeof child === 'number') {
          return (
            <span key={`${cloneKey}-${index}`} className="inline-block">
              {child}
            </span>
          );
        }

        if (isValidElement(child)) {
          const element = child as ReactElement;
          return cloneElement(element, { key: `${cloneKey}-${element.key ?? index}` });
        }

        return null;
      });

    return (
      <section
        ref={containerRef}
        className={clsx(
          'relative h-screen w-full cursor-grab touch-none select-none overflow-hidden',
          className,
        )}
      >
        <div ref={contentWrapperRef} className="h-full w-full">
          {OFFSETS.map((offsetY, rowIndex) =>
            OFFSETS.map((offsetX, colIndex) => {
              const cloneIndex = rowIndex * GRID_SIZE + colIndex;
              const isCenter = offsetX === 0 && offsetY === 0;

              return (
                <div
                  key={`${offsetX}-${offsetY}`}
                  ref={(el) => {
                    if (el) clonesRef.current[cloneIndex] = el;
                  }}
                  className="absolute left-0 top-0 will-change-transform"
                >
                  <div ref={isCenter ? measureTileRef : undefined} className="h-full w-full">
                    {renderChildren(`${cloneIndex}`)}
                  </div>
                </div>
              );
            }),
          )}
        </div>
      </section>
    );
  },
);

export default InfiniteDragGrid;
