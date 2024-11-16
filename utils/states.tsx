import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export const useTouchDevice = () => {
  if (typeof window === 'undefined') return;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

export const useIsScreenLoader = () => {
  const pathname = usePathname();
  const [isScreenLoader, setIsScreenLoader] = useState(false);

  useEffect(() => {
    setIsScreenLoader(window.location.origin !== 'http://localhost:3000' && pathname === '/');
  }, []);

  return isScreenLoader;
};

export const useFormattedTime = (isEnglish = false) => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const formatTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');

      return isEnglish
        ? `IT IS ${hours % 12 || 12}:${minutes} ${hours >= 12 ? 'PM' : 'AM'} HERE!`
        : `IL EST ${hours}H${minutes} ICI !`;
    };

    setTime(formatTime());

    const interval = setInterval(() => {
      setTime(formatTime());
    }, 60000);

    return () => clearInterval(interval);
  }, [isEnglish]);

  return time;
};
