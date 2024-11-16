import { gsap } from 'gsap';

export const useParallax = (
  element: HTMLDivElement | null,
  speed: number,
  direction?: 'bottom' | 'top',
  minWidth = 0,
) => {
  if (!element) return;

  const updateParallax = () => {
    if (window.innerWidth < minWidth) {
      gsap.to(element, { y: 0, ease: 'none' });
      return;
    }

    const { scrollY } = window;
    gsap.to(element, {
      y: direction === 'bottom' ? scrollY * speed : -(scrollY * speed),
      ease: 'none',
    });
  };

  window.addEventListener('scroll', updateParallax);
  window.addEventListener('resize', updateParallax);

  return () => {
    window.removeEventListener('scroll', updateParallax);
    window.removeEventListener('resize', updateParallax);
  };
};
