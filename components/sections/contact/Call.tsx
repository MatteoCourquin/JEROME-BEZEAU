import Hint from '@/components/Hint';
import { LanguageContext } from '@/layout/default';
import { useMagnet, useResetMagnet } from '@/utils/animations';
import clsx from 'clsx';
import { useContext, useRef } from 'react';
import TimeDisplay from '../TimeHint';

const Call = ({ className }: { className?: string }) => {
  const { isFrench } = useContext(LanguageContext);
  const containerHintRef = useRef(null);
  return (
    <div ref={containerHintRef} className={clsx('w-fit', className)}>
      <h6 className="text2 pb-[18px] text-white-40">
        {isFrench ? 'APPELEZ-MOI :' : 'GIVE ME A CALL :'}
      </h6>
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
