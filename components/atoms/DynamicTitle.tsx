import React, { useEffect, useRef, useState, useCallback } from 'react';
import { debounce } from 'lodash';
import clsx from 'clsx';

const DynamicTitle = ({ children, className }: { children: string; className?: string }) => {
  const wrapperTitleRef = useRef<HTMLDivElement>(null);
  const [fontSize, setFontSize] = useState(0);

  const calculateFontSize = useCallback(() => {
    if (!wrapperTitleRef.current) return;

    const containerWidth = wrapperTitleRef.current.offsetWidth;
    const coefficient = 1.55;
    const calculatedSize = (containerWidth / children.length) * coefficient;

    setFontSize(calculatedSize);
  }, [children]);

  const debouncedCalculate = useCallback(debounce(calculateFontSize, 150), [calculateFontSize]);

  useEffect(() => {
    calculateFontSize();
    window.addEventListener('resize', debouncedCalculate);

    return () => {
      window.removeEventListener('resize', debouncedCalculate);
      debouncedCalculate.cancel();
    };
  }, [debouncedCalculate]);

  return (
    <div ref={wrapperTitleRef} className={clsx('w-full', className)}>
      <h1
        className="overflow-hidden whitespace-nowrap text-center uppercase"
        style={{
          fontSize: `${fontSize}px`,
          lineHeight: '1.2',
        }}
      >
        {children}
      </h1>
    </div>
  );
};

export default DynamicTitle;
