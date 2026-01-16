import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import gsap from 'gsap';
// import { SplitText } from 'gsap/SplitText';
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
  startColor?: string;
  endColor?: string;
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
      trigger: _trigger,
      isScrubAnim = false,
      isRandomAnim = false,
      onMouseEnter,
      onMouseLeave,
      havePadding = true,
      startColor = '#ffffff66',
      endColor = '#ffffff1f',
      ...props
    },
    ref,
  ) => {
    const { contextSafe } = useGSAP();
    const animatedTextRef = useRef<HTMLElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout>();
    const splitInstanceRef = useRef<SplitText | null>(null);
    const timelineRef = useRef<gsap.core.Timeline | null>(null);

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

    // const scrollAnimation = contextSafe(() => {
    //   if (!animatedTextRef.current) return;

    //   const splitWord = new SplitText(animatedTextRef.current, {
    //     type: 'words',
    //   });

    //   splitInstanceRef.current = splitWord;

    //   const words = splitWord.words || [];
    //   if (!words.length) return;

    //   words.forEach((word, index) => {
    //     const element = word as HTMLElement;
    //     element.style.position = 'relative';
    //     element.style.overflow = 'hidden';
    //     element.style.display = 'inline-block';
    //     element.style.background = `linear-gradient(to right, ${startColor}, ${startColor} 50%, ${endColor} 50%)`;
    //     element.style.backgroundClip = 'text';
    //     element.style.webkitBackgroundClip = 'text';
    //     element.style.webkitTextFillColor = 'transparent';
    //     element.style.backgroundPosition = '100% 100%';
    //     element.style.backgroundSize = '200% 100%';

    //     // Ajouter un espace après chaque mot sauf le dernier
    //     if (index < words.length - 1) {
    //       element.style.marginRight = '0.25em';
    //     }
    //   });

    //   gsap.set(words, { backgroundPosition: '100% 100%' });

    //   const tl = gsap.timeline({
    //     scrollTrigger: {
    //       trigger: animatedTextRef.current,
    //       start: 'top 80%',
    //       end: 'bottom 30%',
    //       scrub: true,
    //     },
    //   });

    //   timelineRef.current = tl;

    //   words.forEach((word) => {
    //     tl.to(word, {
    //       backgroundPosition: '0% 100%',
    //       ease: 'none',
    //       duration: 1,
    //     });
    //   });
    // });

    const cleanup = contextSafe(() => {
      if (splitInstanceRef.current) {
        splitInstanceRef.current.revert();
        splitInstanceRef.current = null;
      }
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
    });

    useGSAP(() => {
      if (isScrubAnim) {
        cleanup();
        // scrollAnimation();
      }
      return () => {
        cleanup();
      };
    }, [isScrubAnim, children, startColor, endColor]);

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
                      aria-hidden="true"
                      className={clsx(
                        'blue-500 absolute left-0 top-0 inline-block translate-y-full select-none',
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
