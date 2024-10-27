import { motion, TargetAndTransition } from 'framer-motion';
import { ReactNode } from 'react';

const NB_OF_COLUMNS = 12;

type CustomVariants = {
  initial?: TargetAndTransition;
  enter?: TargetAndTransition | ((custom: number) => TargetAndTransition);
  exit?: TargetAndTransition | ((custom: number) => TargetAndTransition);
};

export default function PageTransition({ children }: { children: ReactNode }) {
  const expand = {
    initial: {
      transformOrigin: 'bottom',
    },
    enter: (i: number) => ({
      scaleY: 0,
      transition: {
        duration: 0.5,
        delay: 0.02 * i,
        ease: [0.72, 0, 0.3, 0.99],
        transformOrigin: 'bottom',
      },
      transitionEnd: {
        scaleY: 0,
        transformOrigin: 'top',
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
      <div className="pointer-events-none fixed inset-0 z-[910] grid h-screen w-screen grid-cols-12">
        {[...Array(NB_OF_COLUMNS)].map((_, i) => {
          return (
            <motion.div
              key={i}
              className="relative h-full w-[101%] bg-white"
              {...anim(expand, NB_OF_COLUMNS - i * -2)}
            />
          );
        })}
      </div>
      {children}
    </>
  );
}
