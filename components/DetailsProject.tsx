import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import gsap from 'gsap';
import Link from 'next/link';
import { useRef } from 'react';
import { IconArrow } from './Icons';

type DetailsProjectProps = {
  isRight: boolean;
  isActive: boolean;
  title: string;
  types: string[];
};

const DetailsProject = ({ isRight, isActive, title, types }: DetailsProjectProps) => {
  const { contextSafe } = useGSAP();

  const wrapperDetailRef = useRef(null);
  const arrowRef = useRef(null);
  const wrapperTagRef = useRef<HTMLDivElement>(null);

  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(() => {
    if (!wrapperTagRef.current) return;
    const tagsChildren = Array.from(wrapperTagRef.current.children).reverse();

    timelineRef.current = contextSafe(() =>
      gsap
        .timeline({ paused: true })
        .add(
          gsap.to(wrapperDetailRef.current, {
            scale: 1,
            duration: 0.2,
            ease: 'power2.out',
          }),
        )
        .add(
          gsap.to(wrapperDetailRef.current, {
            width: '100%',
            duration: 0.3,
            ease: 'power2.out',
          }),
          '-=0.1',
        )
        .add(
          gsap.fromTo(
            arrowRef.current,
            {
              x: isRight ? -10 : 10,
              opacity: 0,
            },
            {
              x: 0,
              opacity: 1,
              duration: 0.3,
              ease: 'power3.out',
            },
          ),
          '-=0.1',
        )
        .add(
          gsap.fromTo(
            tagsChildren,
            {
              scale: 0,
              opacity: 0,
            },
            {
              scale: 1,
              opacity: 1,
              duration: 0.3,
              ease: 'power3.out',
              stagger: -0.1,
            },
          ),
          '-=0.16',
        ),
    )();
  }, []);

  useGSAP(() => {
    if (!timelineRef.current) return;
    if (isActive) {
      timelineRef.current.play();
    } else {
      timelineRef.current.reverse();
    }
  }, [isActive]);

  return (
    <div
      ref={wrapperDetailRef}
      className={clsx(
        'flex h-20 w-20 scale-0 items-center justify-end overflow-hidden rounded-t-full bg-white-40 p-1 backdrop-blur-lg',
        isRight
          ? 'origin-bottom-left flex-row rounded-br-full'
          : 'origin-bottom-right flex-row-reverse rounded-bl-full',
      )}
    >
      <Link
        ref={arrowRef}
        href="/contact"
        className={clsx(
          'flex items-center gap-[10px] px-10 text-black',
          isRight ? 'flex-row' : 'flex-row-reverse',
        )}
      >
        <IconArrow className={clsx('!fill-black', isRight ? 'rotate-0' : 'rotate-180')} />
        <span className="whitespace-nowrap pt-0.5">{title}</span>
      </Link>
      <div
        ref={wrapperTagRef}
        className={clsx('flex gap-[5px]', isRight ? 'flex-row' : 'flex-row-reverse')}
      >
        {types.map((type, index) => (
          <p
            key={index}
            className={clsx(isRight ? 'origin-left' : 'origin-right', 'tag opacity-0')}
          >
            {type}
          </p>
        ))}
      </div>
    </div>
  );
};

export default DetailsProject;
