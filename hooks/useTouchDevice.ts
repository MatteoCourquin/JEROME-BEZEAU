export const useTouchDevice = () => {
  if (typeof window === 'undefined') return;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

export const isTouchDevice = () => {
  if (typeof window === 'undefined') return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};
