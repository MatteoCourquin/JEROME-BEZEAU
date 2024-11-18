import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { createElement, MutableRefObject, useEffect, useRef } from 'react';

const AnimatedText = ({
  variant = 'p',
  className,
  text,
  trigger,
  isTriggerAnim = false,
  isScrubAnim = false,
}: {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
  className?: string;
  text: string;
  trigger: MutableRefObject<HTMLElement | null>;
  isTriggerAnim?: boolean;
  isScrubAnim?: boolean;
}) => {
  const descriptionRef = useRef<HTMLElement>(null);

  const { contextSafe } = useGSAP();

  const triggerAnim = contextSafe(() => {
    if (!descriptionRef.current || !trigger.current) return;

    const descriptionWords = descriptionRef.current.querySelectorAll('.anim-text');

    gsap.fromTo(
      descriptionWords,
      {
        y: 100,
      },
      {
        y: 0,
        stagger: 0.01,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: trigger.current,
          start: 'top 50%',
          toggleActions: 'play none none reverse',
        },
      },
    );
  });

  const scrollScrubAnim = contextSafe(() => {
    if (!descriptionRef.current || !trigger.current) return;

    const descriptionWords = descriptionRef.current.querySelectorAll('.anim-text');

    gsap.set(descriptionWords, {
      opacity: 0.12,
    });

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
  });

  useEffect(() => {
    ScrollTrigger.refresh();

    if (isTriggerAnim) {
      triggerAnim();
    }
    if (isScrubAnim) {
      scrollScrubAnim();
    }
  }, []);

  return createElement(
    variant,
    {
      ref: descriptionRef,
      className: clsx(className),
    },
    text.split(' ').map((word, index) => (
      <span key={word + index} className="inline-block overflow-hidden">
        <span className="anim-text inline-block">
          {word}
          {index !== text.split(' ').length - 1 && '\u00A0'}
        </span>
      </span>
    )),
  );
};

export default AnimatedText;
