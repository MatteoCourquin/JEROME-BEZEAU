import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Observer from 'gsap/dist/Observer';
import { useRef } from 'react';

gsap.registerPlugin(Observer);

export default function Page() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isAnimatingRef = useRef(false);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const textElements = sectionRef.current.querySelectorAll('.row-items-p');
    const animateText = (direction: 'left' | 'right') => {
      if (isAnimatingRef.current) return;
      isAnimatingRef.current = true;

      gsap.to(textElements, {
        x: direction === 'left' ? '-100%' : '100%',
        duration: 2,
        ease: 'power4.inOut',
        stagger: {
          each: 0.002,
          from: Math.floor(textElements.length / 2),
        },
        onComplete: () => {
          gsap.set(textElements, { x: '0%' });
          isAnimatingRef.current = false;
        },
      });
    };

    Observer.create({
      target: sectionRef.current,
      type: 'wheel,touch',
      onUp: () => animateText('left'),
      onDown: () => animateText('right'),
    });

    gsap
      .timeline({
        delay: 0.4,
      })
      .from(sectionRef.current, {
        scale: 3,
        duration: 2.5,
        ease: 'power4.out',
      })
      .from(
        sectionRef.current,
        {
          opacity: 0,
          duration: 3,
          ease: 'power4.out',
        },
        '-=2.4',
      );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="smoother-y-black-full flex h-screen flex-col justify-center overflow-hidden pt-header"
    >
      {Array(61)
        .fill(null)
        .map((_, outerIndex) => (
          <div
            key={'row-' + outerIndex}
            className="rows flex w-screen shrink-0 justify-center overflow-hidden"
          >
            {Array(3)
              .fill(null)
              .map((_, mapIndex) => (
                <div key={`row-${outerIndex}-${mapIndex}`} className="row-items flex">
                  {Array(10)
                    .fill(null)
                    .map((_, innerIndex) => (
                      <p
                        key={'404-' + outerIndex + '-' + mapIndex + '-' + innerIndex}
                        className="row-items-p whitespace-nowrap pl-3 text-5xl"
                      >
                        <span className="text-white/80">404</span> NOT FOUND
                      </p>
                    ))}
                </div>
              ))}
          </div>
        ))}
    </section>
  );
}
