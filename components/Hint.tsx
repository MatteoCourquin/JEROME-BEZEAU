import { useGSAP } from '@gsap/react';
import { MutableRefObject, useEffect, useRef } from 'react';
import gsap from 'gsap';

const Hint = ({
  value,
  isActive,
  container,
}: {
  value: string;
  isActive: boolean;
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
  }, []);

  useEffect(() => {
    if (!wrapperHintRef.current || !container.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isActive || !container.current || !wrapperHintRef.current) return;

      const rect = container.current.getBoundingClientRect();
      const wrapperRect = wrapperHintRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top - wrapperRect.height * 2;

      gsap.to(containerHintRef.current, {
        x: x + 10,
        y: y - 5,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    if (isActive) {
      container.current.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      container.current?.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isActive, container]);

  useEffect(() => {
    if (!timelineRef.current) return;

    if (isActive) {
      timelineRef.current.play();
    } else {
      timelineRef.current.reverse();
    }
  }, [isActive]);

  return (
    <div ref={containerHintRef} className="absolute z-50 -translate-y-full">
      <div
        ref={wrapperHintRef}
        className="flex h-10 w-10 shrink origin-bottom-left -translate-y-full scale-0 items-center overflow-hidden rounded-full rounded-bl-none bg-white-40 p-3 backdrop-blur-lg"
      >
        <p
          ref={textHintRef}
          className="text2 inline w-fit shrink -translate-x-3 whitespace-nowrap pt-0.5 leading-[18px] !text-black opacity-0"
        >
          {value}
        </p>
      </div>
    </div>
  );
};

export default Hint;
