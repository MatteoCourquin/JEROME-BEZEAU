import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import {
  createElement,
  MutableRefObject,
  useRef,
  forwardRef,
  useImperativeHandle,
  useLayoutEffect,
} from 'react';

interface AnimatedTextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
  className?: string;
  children: string;
  trigger?: MutableRefObject<HTMLElement | null>;
  isTriggerAnim?: boolean;
  isScrubAnim?: boolean;
}

export interface AnimatedTextRef {
  textAnimation: () => void;
}

const AnimatedText = forwardRef<AnimatedTextRef, AnimatedTextProps>(
  (
    { variant = 'p', className, children, trigger, isTriggerAnim = false, isScrubAnim = false },
    ref,
  ) => {
    const descriptionRef = useRef<HTMLElement>(null);
    const { contextSafe } = useGSAP();

    useLayoutEffect(() => {
      if (descriptionRef.current) {
        const descriptionWords = descriptionRef.current.querySelectorAll('.anim-text');
        gsap.set(descriptionWords, { yPercent: 100 });
      }
    }, []);

    const triggerAnimation = contextSafe(() => {
      if (!descriptionRef.current) return;

      const descriptionWords = descriptionRef.current.querySelectorAll('.anim-text');
      const tl = gsap.timeline();

      tl.to(descriptionWords, {
        yPercent: 0,
        stagger: 0.01,
        duration: 0.8,
        ease: 'power2.out',
      });

      return tl;
    });

    useImperativeHandle(ref, () => ({
      textAnimation: triggerAnimation,
    }));

    useGSAP(() => {
      ScrollTrigger.refresh();

      if (isScrubAnim && descriptionRef.current && trigger?.current) {
        const descriptionWords = descriptionRef.current.querySelectorAll('.anim-text');

        gsap.set(descriptionWords, { opacity: 0.12 });

        gsap.to(descriptionWords, {
          opacity: 0.4,
          stagger: 0.3,
          duration: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: trigger.current,
            start: 'top top',
            end: 'bottom 80%',
            scrub: true,
          },
        });
      }

      if (isTriggerAnim && trigger?.current) {
        const tl = triggerAnimation();
        if (tl) {
          ScrollTrigger.create({
            trigger: trigger.current,
            start: 'top 50%',
            toggleActions: 'play none none reverse',
            animation: tl,
          });
        }
      }
    }, []);

    return createElement(
      variant,
      {
        ref: descriptionRef,
        className: clsx(className),
      },
      children.split(' ').map((word, index) => (
        <span key={word + index} className="inline-block overflow-hidden">
          <span className="anim-text inline-block">
            {word}
            {index !== children.split(' ').length - 1 && '\u00A0'}
          </span>
        </span>
      )),
    );
  },
);

export default AnimatedText;
