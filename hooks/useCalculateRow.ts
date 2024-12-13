import { useEffect, useState } from 'react';

export const useCalculateRows = () => {
  const [rowCount, setRowCount] = useState(31);

  useEffect(() => {
    const calculateRowCount = () => {
      const lineHeight = 56;
      const screenHeight = window.innerHeight;

      let count = Math.floor(screenHeight / lineHeight);

      count = count % 2 === 0 ? count + 1 : count;

      count += 4;

      setRowCount(count);
    };

    calculateRowCount();
    window.addEventListener('resize', calculateRowCount);

    return () => window.removeEventListener('resize', calculateRowCount);
  }, []);

  return rowCount;
};
