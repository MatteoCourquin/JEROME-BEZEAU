import { gsap } from 'gsap';
import { MouseEvent } from 'react';
import { useTouchDevice } from './states';

export const useMagnet = (event: MouseEvent<HTMLElement>, speed: number) => {
  if (useTouchDevice()) return;
  const bounding = event.currentTarget.getBoundingClientRect();
  gsap.to(event.currentTarget, {
    duration: 1,
    x: ((event.clientX - bounding.left) / event.currentTarget.offsetWidth - 0.5) * (30 * speed),
    y: ((event.clientY - bounding.top) / event.currentTarget.offsetHeight - 0.5) * (30 * speed),
  });
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

export const useRotateHover = (element: HTMLDivElement, speed: number) => {
  gsap.to(element, {
    rotation: '+=360',
    ease: 'power1.inOut',
    duration: speed,
    repeat: 0,
  });
};

export const useParallax = (element: HTMLDivElement | null, speed: number) => {
  if (!element) return;
  const updateParallax = () => {
    const scrollY = window.scrollY;
    gsap.to(element, {
      y: -scrollY * speed,
      ease: 'power1.out',
    });
  };

  window.addEventListener('scroll', updateParallax);

  return () => window.removeEventListener('scroll', updateParallax);
};
