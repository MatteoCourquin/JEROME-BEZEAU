import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import {
  createElement,
  forwardRef,
  MutableRefObject,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
} from 'react';

interface AnimatedTextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  className?: string;
  children: string;
  trigger?: MutableRefObject<HTMLElement | null>;
  isRandomAnim?: boolean;
  isTriggerAnim?: boolean;
  isScrubAnim?: boolean;
}

export interface AnimatedTextRef {
  textAnimation: () => void;
}

const AnimatedText = forwardRef<AnimatedTextRef, AnimatedTextProps>(
  (
    {
      variant = 'p',
      as,
      className,
      children,
      trigger,
      isTriggerAnim = false,
      isScrubAnim = false,
      isRandomAnim = false,
    },
    ref,
  ) => {
    const descriptionRef = useRef<HTMLElement>(null);
    const { contextSafe } = useGSAP();
    const timeoutRef = useRef<NodeJS.Timeout>();

    useLayoutEffect(() => {
      if (descriptionRef.current) {
        const descriptionWords = descriptionRef.current.querySelectorAll('.anim-text');
        gsap.set(descriptionWords, { yPercent: 150 });
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

    useEffect(() => {
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
            start: 'top 80%',
            toggleActions: 'play none none reverse',
            animation: tl,
          });
        }
      }
    }, []);

    const trainAnimEnter = contextSafe(() => {
      if (!descriptionRef.current) return;

      const letter = descriptionRef.current?.querySelectorAll('.letter-anim');

      gsap.to(letter, {
        yPercent: -100,
        duration: 0.6,
        ease: 'power3.inOut',
        stagger: 0.02,
      });
    });

    const trainAnimLeave = contextSafe(() => {
      if (!descriptionRef.current) return;

      const letter = descriptionRef.current?.querySelectorAll('.letter-anim');

      gsap.to(letter, {
        yPercent: 0,
        duration: 0.6,
        ease: 'power3.inOut',
        stagger: 0.02,
      });
    });

    const animateRandomLetter = contextSafe(() => {
      if (!descriptionRef.current) return;

      const letters = descriptionRef.current.querySelectorAll('.letter-anim');
      if (letters.length === 0) return;

      const randomIndex = Math.floor(Math.random() * letters.length);
      const letter = letters[randomIndex];

      gsap
        .timeline()
        .to(letter, {
          yPercent: -100,
          duration: 0.6,
          ease: 'power3.inOut',
        })
        .to(letter, {
          yPercent: 0,
          duration: 0,
          ease: 'power3.inOut',
        });

      timeoutRef.current = setTimeout(animateRandomLetter, Math.random() * 2000 + 1000);
    });

    useEffect(() => {
      if (isRandomAnim) {
        animateRandomLetter();
      }

      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }, [isRandomAnim]);

    return createElement(
      variant,
      {
        ref: descriptionRef,
        className: clsx(as, className, 'w-fit'),
        onMouseEnter: trainAnimEnter,
        onMouseLeave: trainAnimLeave,
      },
      children.split(' ').map((word, wordIndex) => (
        <span key={word + wordIndex} className="inline-block overflow-hidden">
          <span className="anim-text inline-block overflow-hidden">
            {isRandomAnim
              ? word.split('').map((letter, letterIndex) => (
                  <span
                    key={`${wordIndex}-${letterIndex}`}
                    className="letter-anim relative inline-block"
                  >
                    <span className="red-500 relative inline-block">{letter}</span>
                    <span className="blue-500 absolute left-0 top-0 inline-block translate-y-full">
                      {letter}
                    </span>
                  </span>
                ))
              : word}
            {wordIndex !== children.split(' ').length - 1 && '\u00A0'}
          </span>
        </span>
      )),
    );
  },
);

export default AnimatedText;
