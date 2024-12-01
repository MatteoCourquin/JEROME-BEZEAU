import { useEffect } from 'react';

export const useShortcut = (key: string, callback: (e: globalThis.KeyboardEvent) => void) => {
  useEffect(() => {
    const handleKeyPress = (e: globalThis.KeyboardEvent): void => {
      if (e.code === key) {
        e.preventDefault();
        callback(e);
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [key, callback]);
};
