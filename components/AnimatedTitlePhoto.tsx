import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { forwardRef, useImperativeHandle, useRef } from 'react';

const TITLE_ANIMATION_DURATION = 0.2;

type AnimatedTitleProps = {
  title: string;
  onTitleChange: (newTitle: string) => void;
};

export type AnimatedTitleRef = {
  changeTitle: (newTitle: string) => void;
};

const AnimatedTitle = forwardRef<AnimatedTitleRef, AnimatedTitleProps>(
  ({ title, onTitleChange }, ref) => {
    const titleRef = useRef(null);
    const animationQueue = useRef<string[]>([]);
    const isAnimating = useRef(false);

    const { contextSafe } = useGSAP();

    const animateNextTitle = contextSafe(() => {
      if (animationQueue.current.length === 0) {
        isAnimating.current = false;
        return;
      }

      isAnimating.current = true;
      const nextTitle = animationQueue.current.shift();

      if (!titleRef.current || !nextTitle) return;

      gsap.to(titleRef.current, {
        yPercent: -100,
        opacity: 0,
        duration: TITLE_ANIMATION_DURATION,
        onComplete: () => {
          onTitleChange(nextTitle);
          gsap.fromTo(
            titleRef.current,
            { yPercent: 100, opacity: 0 },
            {
              yPercent: 0,
              opacity: 1,
              duration: TITLE_ANIMATION_DURATION,
              ease: 'power3.out',
              onComplete: animateNextTitle,
            },
          );
        },
      });
    });

    const changeTitle = (newTitle: string) => {
      animationQueue.current = [newTitle];
      if (!isAnimating.current) animateNextTitle();
    };

    useImperativeHandle(ref, () => ({
      changeTitle,
    }));

    return (
      <div className="my-y-half-default flex items-center justify-center py-y-default">
        <div className="absolute h-fit overflow-hidden text-center uppercase">
          <h1 ref={titleRef}>{title}</h1>
        </div>
      </div>
    );
  },
);

export default AnimatedTitle;
