import { useMagnet, useResetMagnet } from '@/hooks/useMagnet';
import { useLanguage } from '@/providers/language.provider';
import clsx from 'clsx';
import gsap from 'gsap';
import Link from 'next/link';
import { useRef } from 'react';
import { IconJB } from './atoms/Icons';

const Footer = () => {
  const { isFrench, setIsFrench } = useLanguage();
  const timelineArrow = useRef(gsap.timeline({ paused: true }));
  const slashRef = useRef(null);

  const handleMouseEnter = (toRight: boolean) => {
    timelineArrow.current
      .to(slashRef.current, {
        rotate: 0,
        opacity: 1,
        transformOrigin: toRight ? 'left' : 'right',
        duration: 0.05,
      })
      .to(slashRef.current, { scaleX: 35, duration: 0.1 })
      .play();
  };
  const handleMouseOut = () => {
    timelineArrow.current
      .to(slashRef.current, { scaleX: 1, duration: 0.1 })
      .to(slashRef.current, { rotate: 12, opacity: 0.4, duration: 0.05 })
      .play();
  };

  return (
    <footer className="flex flex-col-reverse justify-between gap-y-default border-t border-t-white-12 px-x-default py-y-default backdrop-blur-lg md:flex-row md:gap-x-x-default">
      <div className="flex grow flex-col justify-between">
        <Link className="cursor-button w-fit" href="/" scroll={false}>
          <IconJB className="fill-white-80" />
        </Link>
        <div className="pt-8">
          <div className="cursor-button flex text-white-40" onMouseOut={handleMouseOut}>
            <button
              className={clsx(
                isFrench && 'text-white-80',
                'pr-2 transition-colors delay-100 hover:text-black active:opacity-60',
              )}
              onClick={() => setIsFrench(true)}
              onMouseOver={() => handleMouseEnter(false)}
            >
              FR
            </button>
            <div className="relative w-0 pt-0.5">
              <div
                ref={slashRef}
                className="pointer-events-none absolute -z-10 h-5 w-px rotate-12 bg-white opacity-40"
              ></div>
            </div>
            <button
              className={clsx(
                !isFrench && 'text-white-80',
                'pl-2 transition-colors delay-100 hover:text-black active:opacity-60',
              )}
              onClick={() => setIsFrench(false)}
              onMouseOver={() => handleMouseEnter(true)}
            >
              EN
            </button>
          </div>
        </div>
        <div className="py-8">
          <p>{isFrench ? 'Conçu avec amour par moi.' : 'Designed with love by me.'}</p>
          <p>
            {isFrench ? 'Développé de zéro par ' : 'Developed from scratch by '}
            <a
              className="link cursor-button link_white-80"
              href="https://matteo.courqu.in/"
              target="_blank"
            >
              Matteo Courquin
            </a>
            .
          </p>
        </div>
        <p>© Jérôme Bezeau - 2024</p>
      </div>
      <div className="flex gap-x-default">
        <nav className="grow">
          <ul className="flex flex-col gap-2">
            <li className="pb-2 uppercase text-white-12">Menu</li>
            <li onMouseLeave={(e) => useResetMagnet(e)} onMouseMove={(e) => useMagnet(e, 1)}>
              <Link className="link cursor-button link_white-40" href="/">
                {isFrench ? 'Accueil' : 'Home'}
              </Link>
            </li>
            <li onMouseLeave={(e) => useResetMagnet(e)} onMouseMove={(e) => useMagnet(e, 1)}>
              <Link className="link cursor-button link_white-40" href="/work">
                {isFrench ? 'Projets' : 'Work'}
              </Link>
            </li>
            <li onMouseLeave={(e) => useResetMagnet(e)} onMouseMove={(e) => useMagnet(e, 1)}>
              <Link className="link cursor-button link_white-40" href="/photography">
                {isFrench ? 'Photographie' : 'Photography'}
              </Link>
            </li>
            <li onMouseLeave={(e) => useResetMagnet(e)} onMouseMove={(e) => useMagnet(e, 1)}>
              <Link className="link cursor-button link_white-40" href="/about">
                {isFrench ? 'À propos' : 'About'}
              </Link>
            </li>
            <li onMouseLeave={(e) => useResetMagnet(e)} onMouseMove={(e) => useMagnet(e, 1)}>
              <Link className="link cursor-button link_white-40" href="/contact">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
        <nav className="grow">
          <ul className="flex flex-col gap-2">
            <li className="pb-2 uppercase text-white-12">{isFrench ? 'Réseaux' : 'Socials'}</li>
            <li onMouseLeave={(e) => useResetMagnet(e)} onMouseMove={(e) => useMagnet(e, 1)}>
              <a
                className="link cursor-button link_white-40"
                href="https://www.linkedin.com/in/jerome-bezeau/"
                target="_blank"
              >
                Linkedin
              </a>
            </li>
            <li onMouseLeave={(e) => useResetMagnet(e)} onMouseMove={(e) => useMagnet(e, 1)}>
              <a
                className="link cursor-button link_white-40"
                href="https://www.behance.net/jeromebezeb4eb"
                target="_blank"
              >
                Behance
              </a>
            </li>
            <li onMouseLeave={(e) => useResetMagnet(e)} onMouseMove={(e) => useMagnet(e, 1)}>
              <a
                className="link cursor-button link_white-40"
                href="https://www.instagram.com/jeromebezeau/"
                target="_blank"
              >
                Instagram
              </a>
            </li>
            <li onMouseLeave={(e) => useResetMagnet(e)} onMouseMove={(e) => useMagnet(e, 1)}>
              <a
                className="link cursor-button link_white-40"
                href="https://dribbble.com/jeromebezeau"
                target="_blank"
              >
                Dribbble
              </a>
            </li>
            <li onMouseLeave={(e) => useResetMagnet(e)} onMouseMove={(e) => useMagnet(e, 1)}>
              <a
                className="link cursor-button link_white-40"
                href="https://bento.me/jeromebezeau"
                target="_blank"
              >
                Bento
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
