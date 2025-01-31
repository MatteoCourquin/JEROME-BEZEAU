import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import gsap from 'gsap';
import {
  createElement,
  forwardRef,
  HTMLAttributes,
  MouseEvent,
  MutableRefObject,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';

interface AnimatedTextProps extends HTMLAttributes<HTMLElement> {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  as?:
    | 'heading1'
    | 'heading2'
    | 'heading3'
    | 'heading4'
    | 'heading5'
    | 'heading6'
    | 'subtitle'
    | 'text1'
    | 'text2'
    | 'text3';
  className?: string;
  children: string;
  trigger?: MutableRefObject<HTMLElement | null>;
  isRandomAnim?: boolean;
  isScrubAnim?: boolean;
  havePadding?: boolean;
}

export interface AnimatedTextRef {
  textAnimation: () => gsap.core.Tween;
}

const AnimatedText = forwardRef<AnimatedTextRef, AnimatedTextProps>(
  (
    {
      variant = 'p',
      as,
      className,
      children,
      trigger,
      isScrubAnim = false,
      isRandomAnim = false,
      onMouseEnter,
      onMouseLeave,
      havePadding = true,
      ...props
    },
    ref,
  ) => {
    const { contextSafe } = useGSAP();
    const animatedTextRef = useRef<HTMLElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout>();

    useImperativeHandle(ref, () => ({
      textAnimation: () =>
        gsap.fromTo(
          animatedTextRef.current?.querySelectorAll('.anim-text') || [],
          {
            yPercent: 150,
          },
          {
            yPercent: 0,
            stagger: 0.01,
            duration: 0.8,
            ease: 'power2.out',
          },
        ),
    }));

    useEffect(() => {
      if (isScrubAnim && animatedTextRef.current && trigger?.current) {
        const descriptionWords = animatedTextRef.current.querySelectorAll('.anim-text');

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
    }, [children]);

    const trainAnimEnter = contextSafe(() => {
      if (!animatedTextRef.current) return;
      const letter = animatedTextRef.current.querySelectorAll('.letter-anim');
      gsap.to(letter, {
        yPercent: -100,
        duration: 0.6,
        ease: 'power3.inOut',
        stagger: 0.02,
      });
    });

    const trainAnimLeave = contextSafe(() => {
      if (!animatedTextRef.current) return;
      const letter = animatedTextRef.current.querySelectorAll('.letter-anim');
      gsap.to(letter, {
        yPercent: 0,
        duration: 0.6,
        ease: 'power3.inOut',
        stagger: 0.01,
      });
    });

    const animateRandomLetter = contextSafe(() => {
      if (!animatedTextRef.current) return;
      const letters = animatedTextRef.current.querySelectorAll('.letter-anim');
      const randomIndex = Math.floor(Math.random() * letters.length);
      const letter = letters[randomIndex];

      gsap
        .timeline()
        .to(letter, {
          yPercent: -100,
          duration: 0.8,
          ease: 'power3.inOut',
        })
        .to(letter, {
          yPercent: 0,
          duration: 0,
          ease: 'power3.inOut',
        });

      timeoutRef.current = setTimeout(animateRandomLetter, Math.random() * 3000 + 2000);
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
        ref: animatedTextRef,
        className: clsx(as, className, 'w-fit'),
        onMouseEnter: (e: MouseEvent<HTMLElement>) => {
          trainAnimEnter();
          onMouseEnter?.(e);
        },
        onMouseLeave: (e: MouseEvent<HTMLElement>) => {
          trainAnimLeave();
          onMouseLeave?.(e);
        },
        ...props,
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
                    <span
                      className={clsx('red-500 relative inline-block', havePadding && 'pt-[40%]')}
                    >
                      {letter}
                    </span>
                    <span
                      className={clsx(
                        'blue-500 absolute left-0 top-0 inline-block translate-y-full',
                        havePadding && 'pt-[40%]',
                      )}
                    >
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
