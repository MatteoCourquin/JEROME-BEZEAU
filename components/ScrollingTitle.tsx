import { useTouchDevice } from '@/hooks/useTouchDevice';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { RefObject, useRef } from 'react';

const ScrollingTitle = ({ text, scrollSpeed = 10 }: { text: string; scrollSpeed?: number }) => {
  const scrollContainer = useRef(null);
  const infiniteAnimationRef = useRef<gsap.core.Tween[]>([]);

  const { contextSafe } = useGSAP();

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

  const controlScroll = contextSafe((action: 'play' | 'pause') => {
    infiniteAnimationRef.current.map((animation) => {
      gsap.to(animation, {
        timeScale: action === 'play' ? 1 : 0,
        duration: 1,
        ease: 'power.out',
        overwrite: true,
      });
    });
  });

  const animateScroll = contextSafe(() => {
    if (!scrollContainer.current) return;

    gsap.to(scrollContainer.current, {
      x: -400,
      ease: 'none',
      scrollTrigger: {
        trigger: scrollContainer.current,
        start: 'top bottom+=100vh',
        end: 'bottom top-=100vh',
        scrub: true,
      },
    });
  });

  useGSAP(() => {
    ScrollTrigger.refresh();
    animateInfinite(scrollContainer);
    if (useTouchDevice()) return;
    animateScroll();
  }, []);

  return (
    <h2
      ref={scrollContainer}
      className="heading1 whitespace-nowrap uppercase"
      onMouseLeave={() => controlScroll('play')}
      onMouseOver={() => controlScroll('pause')}
    >
      {Array(4)
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
