import { useMatchMedia } from '@/hooks/useCheckScreenSize';
import { BREAKPOINTS } from '@/tailwind.config';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';

const Background = () => {
  const isMobile = useMatchMedia(BREAKPOINTS.SM);
  const isTablet = useMatchMedia(BREAKPOINTS.LG);

  const [columnsNumbers, setColumnsNumbers] = useState(12);

  const getColumnsNumber = () => {
    if (isMobile) return 4;
    if (isTablet) return 6;
    return 12;
  };

  useEffect(() => {
    setColumnsNumbers(getColumnsNumber());
  }, [isMobile, isTablet]);

  return (
    <div
      className={clsx(
        'fixed inset-0 -z-10 grid h-screen w-screen grid-cols-12 gap-x-5 px-x-default',
        `grid-cols-${columnsNumbers}`,
      )}
    >
      {[...Array(columnsNumbers)].map((_, i) => (
        <div
          key={i}
          className="relative h-full border-x border-dashed border-[#808080] opacity-15"
        ></div>
      ))}
    </div>
  );
};

export default Background;
