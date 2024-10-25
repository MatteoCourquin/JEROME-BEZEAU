import { motion, TargetAndTransition } from 'framer-motion';
import { ReactNode } from 'react';

const NB_OF_COLUMNS = 6;

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
        duration: 0.8,
        delay: 0.05 * i,
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
        duration: 0.8,
        delay: 0.05 * i,
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
      <div className="page stairs">
        <div className="transition-container">
          {[...Array(NB_OF_COLUMNS)].map((_, i) => {
            return <motion.div key={i} {...anim(expand, NB_OF_COLUMNS - i * -2)} />;
          })}
        </div>
      </div>
      {children}
    </>
  );
}
