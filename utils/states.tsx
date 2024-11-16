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

type TimeUnit = {
  hours: number;
  minutes: string;
  seconds: string;
  period?: string;
};

export const useFormattedTime = (isEnglish = false): TimeUnit => {
  const [time, setTime] = useState<TimeUnit>({
    hours: 0,
    minutes: '00',
    seconds: '00',
    period: 'AM',
  });

  useEffect(() => {
    const formatTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');

      return {
        hours: isEnglish ? hours % 12 || 12 : hours,
        minutes,
        seconds,
        period: hours >= 12 ? 'PM' : 'AM',
      };
    };

    setTime(formatTime());

    const interval = setInterval(() => {
      setTime(formatTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [isEnglish]);

  return time;
};
