import { useMagnet, useResetMagnet } from '@/hooks/useMagnet';
import { useLanguage } from '@/providers/language.provider';
import clsx from 'clsx';
import gsap from 'gsap';
import { forwardRef, useImperativeHandle, useRef } from 'react';

export interface AnimatedMailRef {
  mailAnimation: () => gsap.core.Tween;
}

const Mail = forwardRef<AnimatedMailRef, { className?: string }>(({ className }, ref) => {
  const { isFrench } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    mailAnimation: () =>
      gsap.from(containerRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
      }),
  }));

  return (
    <div ref={containerRef} className={clsx(className, 'flex flex-col gap-[18px]')}>
      <h3 className="text2 text-white-40">
        {isFrench ? 'ENVOYEZ UN MESSAGE :' : 'SEND A MESSAGE :'}
      </h3>
      <a
        className="link link_white-80 inline-block w-fit"
        href="mailto:contact@jeromebezeau.com"
        onMouseLeave={(e) => useResetMagnet(e)}
        onMouseMove={(e) => useMagnet(e, 1)}
      >
        contact@jeromebezeau.com
      </a>
    </div>
  );
});

export default Mail;
