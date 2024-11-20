import { useMatchMedia } from '@/hooks/useCheckScreenSize';
import { BREAKPOINTS } from '@/tailwind.config';
import clsx from 'clsx';
import { motion, TargetAndTransition } from 'framer-motion';
import { ReactNode, useEffect, useState } from 'react';

type CustomVariants = {
  initial?: TargetAndTransition;
  enter?: TargetAndTransition | ((custom: number) => TargetAndTransition);
  exit?: TargetAndTransition | ((custom: number) => TargetAndTransition);
};

export default function PageTransition({ children }: { children: ReactNode }) {
  const isMobile = useMatchMedia(BREAKPOINTS.SM);
  const isTablet = useMatchMedia(BREAKPOINTS.MD);
  const [columnsNumbers, setColumnsNumbers] = useState(12);

  const getColumnsNumber = () => {
    if (isMobile) return 4;
    if (isTablet) return 6;
    return 12;
  };

  useEffect(() => {
    setColumnsNumbers(getColumnsNumber());
  }, [isMobile, isTablet]);

  const expand = {
    initial: {
      transformOrigin: 'top',
    },
    enter: (i: number) => ({
      scaleY: 0,
      transition: {
        duration: 0.5,
        delay: 0.02 * i,
        ease: [0.72, 0, 0.3, 0.99],
        transformOrigin: 'top',
      },
      transitionEnd: {
        scaleY: 0,
        transformOrigin: 'bottom',
      },
    }),
    exit: (i: number) => ({
      scaleY: 1,
      transition: {
        duration: 0.5,
        delay: 0.02 * i,
        ease: [0.72, 0, 0.3, 0.99],
      },
    }),
  };

  const anim = (variants: CustomVariants, custom: number) => {
    return {
      initial: 'initial',

      animate: 'enter',

      exit: 'exit',

      custom,

      variants,
    };
  };

  return (
    <>
      <div
        className={clsx(
          'pointer-events-none fixed inset-0 z-[910] grid h-screen w-screen',
          `grid-cols-${columnsNumbers}`,
        )}
      >
        {[...Array(columnsNumbers)].map((_, i) => {
          return (
            <motion.div
              key={i}
              className="relative h-full w-[101%] bg-white"
              {...anim(expand, columnsNumbers - i * -2)}
            />
          );
        })}
      </div>
      {children}
    </>
  );
}
