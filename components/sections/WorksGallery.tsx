import { sequence } from '@/constants';
import { Work } from '@/types';
import clsx from 'clsx';
import { ForwardedRef, forwardRef, useRef } from 'react';
import CardWork, { AnimatedCardRef } from '../CardWork';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

interface WorksGalleryProps {
  works: Work[];
}

const WorksGallery = forwardRef(({ works }: WorksGalleryProps, ref: ForwardedRef<HTMLElement>) => {
  const getColumnSpan = (index: number) => sequence[index % sequence.length];

  const cardRefs = useRef<(AnimatedCardRef | null)[]>([]);

  if (cardRefs.current.length !== works.length) {
    cardRefs.current = Array(works.length).fill(null);
  }

  useGSAP(() => {
    const tl = gsap.timeline({
      delay: 1.2,
    });

    cardRefs.current.slice(0, 3).map((cardRef, index) => {
      const animCard = cardRef?.cardAnimation();
      if (!animCard) return;
      tl.add(animCard, index * 0.1);
    });

    tl.play();
  }, []);

  return (
    <section ref={ref} className="overflow-hidden px-x-default pb-y-default">
      {works.map((work, index) => {
        const { before, size, origin } = getColumnSpan(index);
        return (
          <div
            key={work.title + index}
            className="gap-x-5 pt-5 md:grid md:grid-cols-2 md:pt-0 lg:grid-cols-12"
          >
            <div
              className={clsx(
                index % 2 === 0
                  ? `md:col-start-1 lg:col-span-${size} lg:col-start-${before + 1}`
                  : `md:col-start-2 lg:col-span-${size} lg:col-start-${before + 1}`,
              )}
            >
              <CardWork
                ref={(instance) => {
                  if (!instance) return;
                  cardRefs.current[index] = instance;
                }}
                className="grow"
                work={work}
                originTransform={clsx(
                  index === 0 && 'origin-top-left',
                  index !== 0 &&
                    index % 2 === 0 &&
                    `origin-top-left md:origin-top-right lg:origin-top-${origin}`,
                  index !== 0 &&
                    index % 2 !== 0 &&
                    `origin-top-left md:origin-top-left lg:origin-top-${origin}`,
                )}
              />
            </div>
          </div>
        );
      })}
    </section>
  );
});

export default WorksGallery;
