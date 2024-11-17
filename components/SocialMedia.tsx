import { useMagnet, useResetMagnet } from '@/hooks/useMagnet';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import gsap from 'gsap';
import { throttle } from 'lodash';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  IconArrow,
  IconBehance,
  IconBento,
  IconDribbble,
  IconInstagram,
  IconLinkedin,
  IconShare,
} from './atoms/Icons';

const SocialMedia = () => {
  const { contextSafe } = useGSAP();

  const wrapperSocialRef = useRef(null);
  const wrapperIconRef = useRef<HTMLDivElement>(null);
  const textRef = useRef(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const [isNearBottom, setIsNearBottom] = useState(false);

  useGSAP(() => {
    if (!wrapperIconRef.current) return;
    const iconsChildren = wrapperIconRef.current.children;
    timelineRef.current = contextSafe(() =>
      gsap
        .timeline({ paused: true })
        .fromTo(
          wrapperSocialRef.current,
          {
            borderColor: '#ffffffcc',
            backgroundColor: 'transparent',
          },
          {
            borderColor: 'transparent',
            backgroundColor: '#ffffff66',
            duration: 0.3,
            ease: 'power3.out',
          },
        )
        .fromTo(
          wrapperSocialRef.current,
          {
            width: 58,
          },
          {
            width: 470,
            duration: 0.2,
            ease: 'power1.inOut',
          },
        )
        .fromTo(
          wrapperIconRef.current,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.3,
          },
          '-=0.10',
        )
        .fromTo(
          wrapperIconRef.current,
          {
            width: 54,
            paddingLeft: 0,
            paddingRight: 0,
          },
          {
            width: 300,
            paddingLeft: 18,
            paddingRight: 18,
            duration: 0.3,
            ease: 'power1.inOut',
          },
          '-=0.15',
        )
        .fromTo(
          iconsChildren,
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
          '-=0.14',
        )
        .fromTo(
          iconsChildren,
          {
            x: 10,
          },
          {
            x: 0,
            duration: 1.3,
            ease: 'elastic.out',
            stagger: -0.1,
          },
          '-=0.75',
        )
        .fromTo(
          textRef.current,
          {
            opacity: 0,
            x: 10,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.4,
          },
          '-=1.2',
        ),
    )();
  });

  const hideSocialsInBottom = useCallback(
    throttle(() => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const threshold = document.documentElement.scrollHeight - 300;
      setIsNearBottom(scrollPosition >= threshold);
    }, 200),
    [],
  );

  useEffect(() => {
    window.addEventListener('scroll', hideSocialsInBottom);

    return () => {
      window.removeEventListener('scroll', hideSocialsInBottom);
      hideSocialsInBottom.cancel();
    };
  }, []);

  return (
    <div
      ref={wrapperSocialRef}
      className={clsx(
        isNearBottom ? 'scale-0' : 'scale-0 md:scale-100',
        'fixed bottom-y-default right-x-default z-50 flex h-[58px] items-center justify-end overflow-hidden rounded-full border border-white-80 p-1 backdrop-blur-lg transition-transform',
      )}
      onMouseEnter={() => timelineRef.current?.play()}
      onMouseLeave={() => timelineRef.current?.reverse()}
    >
      <Link
        ref={textRef}
        className="absolute left-0.5 flex items-center gap-[10px] px-5 text-black opacity-0"
        href="/contact"
      >
        <span className="whitespace-nowrap pt-0.5">I'M SOCIAL</span>
        <IconArrow className="!fill-black" />
      </Link>
      <div
        ref={wrapperIconRef}
        className="absolute right-[1px] z-10 flex h-[54px] w-[54px] scale-0 items-center gap-[6px] overflow-hidden rounded-full bg-black opacity-0"
      >
        <Link
          className="cursor-button origin-right scale-0 p-3 opacity-0"
          href="https://www.linkedin.com/in/jerome-bezeau/"
          target="_blank"
          onMouseLeave={(e) => useResetMagnet(e)}
          onMouseMove={(e) => useMagnet(e, 1)}
        >
          <IconLinkedin />
        </Link>
        <Link
          className="cursor-button origin-right scale-0 p-3 opacity-0"
          href="https://www.behance.net/jeromebezeb4eb"
          target="_blank"
          onMouseLeave={(e) => useResetMagnet(e)}
          onMouseMove={(e) => useMagnet(e, 1)}
        >
          <IconBehance />
        </Link>
        <Link
          className="cursor-button origin-right scale-0 p-3 opacity-0"
          href="https://www.instagram.com/jeromebezeau/"
          target="_blank"
          onMouseLeave={(e) => useResetMagnet(e)}
          onMouseMove={(e) => useMagnet(e, 1)}
        >
          <IconInstagram />
        </Link>
        <Link
          className="cursor-button origin-right scale-0 p-3 opacity-0"
          href="https://dribbble.com/jeromebezeau"
          target="_blank"
          onMouseLeave={(e) => useResetMagnet(e)}
          onMouseMove={(e) => useMagnet(e, 1)}
        >
          <IconDribbble />
        </Link>
        <Link
          className="cursor-button origin-right scale-0 p-3 opacity-0"
          href="https://bento.me/jeromebezeau"
          target="_blank"
          onMouseLeave={(e) => useResetMagnet(e)}
          onMouseMove={(e) => useMagnet(e, 1)}
        >
          <IconBento />
        </Link>
      </div>
      <div className="flex h-[50px] w-[50px] shrink-0 items-center justify-center duration-300">
        <IconShare className="fill-white-80 transition-colors duration-300" />
      </div>
    </div>
  );
};

export default SocialMedia;
