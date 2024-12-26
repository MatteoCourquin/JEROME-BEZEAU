import Hint from '@/components/Hint';
import { useMagnet, useResetMagnet } from '@/hooks/useMagnet';
import { useLanguage } from '@/providers/language.provider';
import clsx from 'clsx';
import gsap from 'gsap';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import TimeDisplay from '../TimeHint';

export interface AnimatedLocationRef {
  locationAnimation: () => gsap.core.Tween;
}

const Location = forwardRef<AnimatedLocationRef, { className?: string }>(({ className }, ref) => {
  const { isFrench } = useLanguage();
  const containerHintRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    locationAnimation: () =>
      gsap.from(containerHintRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
      }),
  }));

  return (
    <div
      ref={containerHintRef}
      className={clsx(className, 'relative flex w-fit flex-col gap-[18px]')}
    >
      <div className="flex items-center gap-3">
        <div
          className="relative mb-1 h-2 w-2"
          onMouseLeave={useResetMagnet}
          onMouseMove={(e) => useMagnet(e, 1)}
        >
          <div className="absolute h-full w-full bg-green"></div>
          <div className="absolute h-full w-full animate-ping bg-green"></div>
        </div>
        <h3 className="text2 text-white-40">{isFrench ? 'DISPONIBLE' : 'AVAILABLE FOR WORK'}</h3>
      </div>
      <p className="overflow-hidden">
        <span>
          {isFrench ? (
            <>
              À Paris <br /> & à distance
            </>
          ) : (
            <>
              In Paris <br /> & remotely
            </>
          )}
        </span>
      </p>
      <Hint container={containerHintRef}>
        <TimeDisplay isFrench={isFrench} />
      </Hint>
    </div>
  );
});

export default Location;
