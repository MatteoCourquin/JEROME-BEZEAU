import { LanguageContext } from '@/layout/default';
import { useMagnet, useResetMagnet } from '@/utils/animations';
import { useContext } from 'react';

const Loaction = ({ className }: { className?: string }) => {
  const { isFrench } = useContext(LanguageContext);
  return (
    <div className={className}>
      <div className="flex items-center gap-3 pb-[18px]">
        <div
          className="relative mb-1 h-2 w-2"
          onMouseLeave={(e) => useResetMagnet(e)}
          onMouseMove={(e) => useMagnet(e, 1)}
        >
          <div className="absolute h-full w-full bg-green"></div>
          <div className="absolute h-full w-full animate-ping bg-green"></div>
        </div>
        <h6 className="text2">{isFrench ? 'DISPONIBLE' : 'AVAILABLE FOR WORK'}</h6>
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
    </div>
  );
};

export default Loaction;
