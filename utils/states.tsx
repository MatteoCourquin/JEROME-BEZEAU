export const useTouchDevice = () => {
  if (typeof window === 'undefined') return;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};
