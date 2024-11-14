import { useTouchDevice } from '@/utils/states';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { RefObject, useRef } from 'react';

interface ScrollingTitleProps {
  text?: string;
  scrollSpeed?: number;
}

const ScrollingTitle = ({
  text = 'READY TO KICK THINGS OFF ?',
  scrollSpeed = 10,
}: ScrollingTitleProps) => {
  const isTouchDevice = useTouchDevice();
  const scrollContainer = useRef<HTMLHeadingElement>(null);
  const infiniteAnimationRef = useRef<gsap.core.Tween[]>([]);

  const animateInfinite = (element: RefObject<HTMLHeadingElement>) => {
    if (!element.current) return;

    const tween = gsap.to(element.current.children, {
      x: '-100%',
      duration: scrollSpeed,
      repeat: -1,
      ease: 'none',
      paused: false,
    });

    infiniteAnimationRef.current.push(tween);
  };

  const controlScroll = (action: 'play' | 'pause') => {
    infiniteAnimationRef.current.map((animation) => {
      gsap.to(animation, {
        timeScale: action === 'play' ? 1 : 0,
        duration: 1,
        ease: 'power.out',
        overwrite: true,
      });
    });
  };

  const animateScroll = () => {
    const timeline = gsap.timeline({
      scrollTrigger: {
        start: 'top top',
        scrub: true,
      },
    });

    timeline.to(scrollContainer.current, { x: -800, ease: 'none' });
  };

  useGSAP(() => {
    animateInfinite(scrollContainer);
    if (isTouchDevice) return;
    animateScroll();
  });

  return (
    <h2
      ref={scrollContainer}
      className="heading1 whitespace-nowrap uppercase"
      onMouseLeave={() => controlScroll('play')}
      onMouseOver={() => controlScroll('pause')}
    >
      {Array(3)
        .fill(null)
        .map((_, index) => (
          <span key={index} className="inline-block pr-7">
            {text}
          </span>
        ))}
    </h2>
  );
};

export default ScrollingTitle;
