import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';

export default function Page() {
  const wrapperSectionRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!wrapperSectionRef.current || !rowRef.current) return;

    const rows = wrapperSectionRef.current.querySelectorAll('.rows');
    const widthRow = rowRef.current.clientWidth;

    gsap
      .timeline({
        scrollTrigger: {
          trigger: wrapperSectionRef.current,
          start: 'top top',
          end: () => 10000,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      })
      .to(rows, {
        x: () => -widthRow + window.innerWidth || 0,
        duration: 1,
        ease: 'power4.inOut',
        stagger: {
          each: 0.002,
          from: 'center',
        },
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
    <section ref={wrapperSectionRef} className="relative h-screen pt-header">
      <div
        ref={sectionRef}
        className="smoother-y-black-full flex h-full flex-col justify-center overflow-hidden"
      >
        {Array(31)
          .fill(null)
          .map((_, rowIndex) => (
            <div
              key={'row-' + rowIndex}
              ref={rowIndex === 0 ? rowRef : null}
              className="rows flex w-fit shrink-0 justify-end"
            >
              {Array(50)
                .fill(null)
                .map((_, textIndex) => (
                  <p
                    key={`404-${rowIndex}-${textIndex}`}
                    className="whitespace-nowrap pl-3 text-5xl"
                  >
                    <span className="text-white-80">404</span> NOT FOUND
                  </p>
                ))}
            </div>
          ))}
      </div>
    </section>
  );
}
