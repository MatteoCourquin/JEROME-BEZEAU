import Hint from '@/components/Hint';
import { useMagnet, useResetMagnet } from '@/hooks/useMagnet';
import { useLanguage } from '@/providers/language.provider';
import { useRef } from 'react';
import TimeDisplay from '../TimeHint';
import clsx from 'clsx';
import { useGSAP } from '@gsap/react';

const Location = ({ className }: { className?: string }) => {
  const { isFrench } = useLanguage();
  const containerHintRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // gsap
  }, []);

  return (
    <div
      ref={containerHintRef}
      className={clsx(className, 'relative flex w-fit flex-col gap-[18px]')}
    >
      <div className="flex items-center gap-3">
        <div
          className="relative mb-1 h-2 w-2"
          onMouseLeave={(e) => useResetMagnet(e)}
          onMouseMove={(e) => useMagnet(e, 1)}
        >
          <div className="absolute h-full w-full bg-green"></div>
          <div className="absolute h-full w-full animate-ping bg-green"></div>
        </div>
        <h3 className="text2 text-white-40">{isFrench ? 'DISPONIBLE' : 'AVAILABLE FOR WORK'}</h3>
      </div>
      {isFrench ? (
        <p>
          À Paris <br /> & à distance
        </p>
      ) : (
        <p>
          In Paris <br /> & remotely
        </p>
      )}
      <Hint container={containerHintRef}>
        <TimeDisplay isFrench={isFrench} />
      </Hint>
    </div>
  );
};

export default Location;
