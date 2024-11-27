import Hint from '@/components/Hint';
import { useMagnet, useResetMagnet } from '@/hooks/useMagnet';
import { useLanguage } from '@/providers/language.provider';
import clsx from 'clsx';
import { useRef } from 'react';
import TimeDisplay from '../TimeHint';

const Call = ({ className }: { className?: string }) => {
  const { isFrench } = useLanguage();
  const containerHintRef = useRef(null);
  return (
    <div
      ref={containerHintRef}
      className={clsx('relative flex w-fit flex-col gap-[18px]', className)}
    >
      <h6 className="text2 text-white-40">{isFrench ? 'APPELEZ-MOI :' : 'GIVE ME A CALL :'}</h6>
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
};

export default Call;
