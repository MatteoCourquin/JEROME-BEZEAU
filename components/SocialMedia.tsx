import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import gsap from 'gsap';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import {
  IconArrow,
  IconBehance,
  IconBento,
  IconDribbble,
  IconInstagram,
  IconLinkedin,
  IconShare,
} from './Icons';

const SocialMedia = () => {
  const { contextSafe } = useGSAP();

  const wrapperSocialRef = useRef(null);
  const wrapperIconRef = useRef<HTMLDivElement>(null);
  const IconShareRef = useRef(null);
  const textRef = useRef(null);

  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    timelineRef.current = contextSafe(() =>
      gsap
        .timeline({ paused: true })
        .add(
          gsap.fromTo(
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
          ),
        )
        .add(
          gsap.fromTo(
            IconShareRef.current,
            {
              scale: 1,
            },
            {
              scale: 0,
              duration: 0.15,
            },
          ),
        )
        .add(
          gsap.fromTo(
            wrapperIconRef.current,
            { scale: 0 },
            {
              scale: 1,
              duration: 0.3,
            },
          ),
        )
        .add(
          gsap.fromTo(
            wrapperSocialRef.current,
            {
              width: 58,
            },
            {
              width: 470,
              duration: 0.3,
              ease: 'power3.inOut',
            },
          ),
        )
        .add(
          gsap.fromTo(
            wrapperIconRef.current,
            {
              paddingLeft: 0,
              paddingRight: 0,
            },
            {
              paddingLeft: 30,
              paddingRight: 30,
              duration: 0.3,
              ease: 'power3.inOut',
            },
          ),
        )
        .add(
          gsap.fromTo(
            textRef.current,
            {
              opacity: 0,
            },
            {
              opacity: 1,
              duration: 0.15,
            },
          ),
        )
        .add(
          gsap.fromTo(
            wrapperIconRef.current,
            {
              width: 54,
            },
            {
              width: 300,
              duration: 0.3,
              ease: 'power3.out',
            },
          ),
          '-=0.15',
        )
        .add(
          gsap.fromTo(
            wrapperIconRef.current?.children,
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
          '-=0.15',
        ),
    )();
  }, [contextSafe]);

  return (
    <div
      ref={wrapperSocialRef}
      onMouseEnter={() => timelineRef.current?.play()}
      onMouseLeave={() => timelineRef.current?.reverse()}
      className={clsx(
        'relative flex h-[58px] items-center justify-end overflow-hidden rounded-full border p-1 transition-all duration-300 hover:border-transparent hover:bg-white-40',
        'border-white-80',
      )}
    >
      <div
        ref={textRef}
        className="absolute left-0.5 flex items-center gap-[10px] px-5 text-black opacity-0"
      >
        <span className="whitespace-nowrap pt-0.5">I'M SOCIAL</span>
        <IconArrow className="!fill-black" />
      </div>
      <div
        ref={wrapperIconRef}
        className="absolute right-[1px] flex h-[54px] w-[54px] scale-0 items-center gap-[30px] overflow-hidden rounded-full bg-black"
      >
        <Link href="/" className="scale-0 opacity-0">
          <IconLinkedin />
        </Link>
        <Link href="/" className="scale-0 opacity-0">
          <IconBehance />
        </Link>
        <Link href="/" className="scale-0 opacity-0">
          <IconInstagram />
        </Link>
        <Link href="/" className="scale-0 opacity-0">
          <IconDribbble />
        </Link>
        <Link href="/" className="scale-0 opacity-0">
          <IconBento />
        </Link>
      </div>
      <div
        ref={IconShareRef}
        className="flex h-[50px] w-[50px] shrink-0 items-center justify-center duration-300"
      >
        <IconShare className="fill-white-80 transition-colors duration-300" />
      </div>
    </div>
  );
};

export default SocialMedia;
