import Link from 'next/link';
import { IconJB } from './atoms/Icons';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Button from './atoms/Button';

const Header = () => {
  const timeline = useRef(gsap.timeline({ paused: true }));
  const navRef = useRef<HTMLBodyElement>(null);

  useGSAP(() => {
    if (!navRef.current) return;

    const links = navRef.current.querySelectorAll('.anim-items-header');

    timeline.current
      .add(gsap.fromTo(links, { y: 100 }, { y: 0, duration: 1, ease: 'power3.out', stagger: 0.1 }))
      .play();
  });

  return (
    <header className="mix-blend- difference fixed left-0 top-0 z-[900] h-[100px] w-screen overflow-hidden border-b border-b-white-12 px-x-default backdrop-blur-lg">
      <div className="flex h-24 items-center justify-between">
        <Link className="cursor-button" href="/" scroll={false}>
          <IconJB className="fill-white opacity-80" />
        </Link>
        <nav ref={navRef}>
          <ul className="flex items-center gap-10">
            <li className="overflow-hidden py-0.5">
              <Link
                className="anim-items-header link link_white-80 cursor-button inline-block pt-0.5"
                href="/work"
                scroll={false}
              >
                Work
              </Link>
            </li>
            <li className="overflow-hidden py-0.5">
              <Link
                className="anim-items-header link link_white-80 cursor-button inline-block pt-0.5"
                href="/photography"
                scroll={false}
              >
                Photography
              </Link>
            </li>
            <li className="overflow-hidden py-0.5">
              <Link
                className="anim-items-header link link_white-80 cursor-button inline-block pt-0.5"
                href="/about"
                scroll={false}
              >
                About
              </Link>
            </li>
            <li>
              <Button as="a" href="/contact">
                <span className="anim-items-header inline-block">Contact</span>
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
