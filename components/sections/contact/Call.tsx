import Hint from '@/components/Hint';
import { useMagnet, useResetMagnet } from '@/hooks/useMagnet';
import { useLanguage } from '@/providers/language.provider';
import clsx from 'clsx';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import TimeDisplay from '../TimeHint';
import gsap from 'gsap';

export interface AnimatedCallRef {
  callAnimation: () => void;
}

const Call = forwardRef<AnimatedCallRef, { className?: string }>(({ className }, ref) => {
  const { isFrench } = useLanguage();
  const containerHintRef = useRef(null);

  useImperativeHandle(ref, () => ({
    callAnimation: () =>
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
      className={clsx('relative flex w-fit flex-col gap-[18px]', className)}
    >
      <h3 className="text2 text-white-40">{isFrench ? 'APPELEZ-MOI :' : 'GIVE ME A CALL :'}</h3>
      <a
        className="link link_white-80 inline-block w-fit"
        href="tel:+33664583272"
        onMouseLeave={(e) => useResetMagnet(e)}
        onMouseMove={(e) => useMagnet(e, 1)}
      >
        (+33) 6 64 58 32 72
      </a>
      <Hint container={containerHintRef}>
        <TimeDisplay isFrench={isFrench} />
      </Hint>
    </div>
  );
});

export default Call;
