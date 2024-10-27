import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export const useTouchDevice = () => {
  if (typeof window === 'undefined') return;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

export const useIsScreenLoader = (): boolean => {
  const pathname = usePathname();
  const [isScreenLoader, setIsScreenLoader] = useState(true);

  useEffect(() => {
    setIsScreenLoader(window.location.origin !== 'http://localhost:3000' && pathname === '/');
  }, []);

  return isScreenLoader;
};
