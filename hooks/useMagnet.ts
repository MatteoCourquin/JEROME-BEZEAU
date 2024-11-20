import { gsap } from 'gsap';
import { MouseEvent } from 'react';
import { useTouchDevice } from './useTouchDevice';

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
