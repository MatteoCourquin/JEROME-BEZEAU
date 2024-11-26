import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export const useIsScreenLoader = () => {
  const pathname = usePathname();
  const [isScreenLoader, setIsScreenLoader] = useState(true);

  useEffect(() => {
    setIsScreenLoader(window.location.origin !== 'http://localhost:3000' && pathname === '/');
  }, []);

  return isScreenLoader;
};
