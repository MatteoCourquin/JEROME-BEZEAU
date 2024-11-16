import { gsap } from 'gsap';
import { throttle } from 'lodash';
import { MouseEvent } from 'react';
import { useTouchDevice } from './states';

const throttledMagnet = throttle((event: MouseEvent<HTMLElement>, speed: number) => {
  const element = event.currentTarget;
  if (!element) return;

  try {
    const bounding = element.getBoundingClientRect();
    gsap.to(element, {
      duration: 1,
      x: ((event.clientX - bounding.left) / element.offsetWidth - 0.5) * (30 * speed),
      y: ((event.clientY - bounding.top) / element.offsetHeight - 0.5) * (30 * speed),
    });
  } catch (error) {
    console.error('Erreur dans magnetManager:', error);
  }
}, 5);

export const useMagnet = (event: MouseEvent<HTMLElement>, speed: number) => {
  if (!event.currentTarget || useTouchDevice()) return;
  throttledMagnet(event, speed);
};

export const useResetMagnet = (event: MouseEvent<HTMLElement>) => {
  if (useTouchDevice()) return;
  gsap.to(event.currentTarget, {
    duration: 1,
    ease: 'elastic.out',
    x: 0,
    y: 0,
  });
};

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
