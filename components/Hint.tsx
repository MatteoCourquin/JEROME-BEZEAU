import { useGSAP } from '@gsap/react';
import { MutableRefObject, ReactNode, useEffect, useRef } from 'react';
import gsap from 'gsap';

const Hint = ({
  children,
  container,
}: {
  children: ReactNode;
  container: MutableRefObject<HTMLElement | null>;
}) => {
  const containerHintRef = useRef(null);
  const wrapperHintRef = useRef<HTMLDivElement>(null);
  const textHintRef = useRef(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const { contextSafe } = useGSAP();

  useGSAP(() => {
    if (!wrapperHintRef.current || !textHintRef.current) return;

    timelineRef.current = contextSafe(() =>
      gsap
        .timeline({ paused: true })
        .to(wrapperHintRef.current, {
          scale: 1,
          duration: 0.2,
          ease: 'power2.out',
        })
        .to(
          wrapperHintRef.current,
          {
            width: 'auto',
            duration: 0.3,
            ease: 'power2.out',
          },
          '-=0.15',
        )
        .to(
          textHintRef.current,
          {
            opacity: 1,
            x: 0,
            duration: 0.2,
            ease: 'power2.out',
          },
          '-=0.1',
        ),
    )();
  });

  const handleMouseMove = (e: MouseEvent) => {
    if (!container.current || !wrapperHintRef.current || !timelineRef.current) return;

    const rect = container.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (x < 0 || x > rect.width || y < 0 || y > rect.height) {
      handleMouseLeave();
      return;
    }

    timelineRef.current.play();

    const wrapperRect = wrapperHintRef.current.getBoundingClientRect();

    gsap.to(containerHintRef.current, {
      x: x + 10,
      y: y - wrapperRect.height * 2 - 5,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    if (!timelineRef.current) return;
    timelineRef.current.reverse();
  };

  useEffect(() => {
    if (!container.current) return;

    container.current.addEventListener('mousemove', handleMouseMove);
    container.current.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.current?.removeEventListener('mousemove', handleMouseMove);
      container.current?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [container]);

  return (
    <div ref={containerHintRef} className="pointer-events-none absolute z-50 -translate-y-full">
      <div
        ref={wrapperHintRef}
        className="flex h-10 w-10 shrink origin-bottom-left -translate-y-full scale-0 items-center overflow-hidden rounded-full rounded-bl-none bg-white-40 p-3 backdrop-blur-lg"
      >
        <div
          ref={textHintRef}
          className="text2 inline w-fit shrink -translate-x-3 whitespace-nowrap pt-0.5 leading-[18px] !text-black opacity-0"
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Hint;
