import Link from 'next/link';
import Button from './Button';
import { IconJB } from './Icons';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Header = () => {
  const timeline = useRef(gsap.timeline({ paused: true }));
  const navRef = useRef<HTMLBodyElement>(null);
  // const buttonRef = useRef(null);

  useGSAP(() => {
    if (!navRef.current) return;

    const links = navRef.current.querySelectorAll('.anim-items-header');

    timeline.current
      .add(gsap.fromTo(links, { y: 100 }, { y: 0, duration: 1, ease: 'power3.out', stagger: 0.1 }))
      // .add(
      //   gsap.fromTo(
      //     buttonRef.current,
      //     { x: 50, opacity: 0 },
      //     { x: 0, opacity: 1, duration: 1, ease: 'elastic.out' },
      //   ),
      //   '-=0.4',
      // )
      .play();
  });

  return (
    <header className="mix-blend- difference fixed left-0 top-0 z-[900] h-[100px] w-screen overflow-hidden border-b border-b-white-12 px-x-default backdrop-blur-lg">
      <div className="flex h-24 items-center justify-between">
        <Link href="/">
          <IconJB className="fill-white opacity-80" />
        </Link>
        <nav ref={navRef}>
          <ul className="flex items-center gap-10">
            <li className="overflow-hidden">
              <Link className="anim-items-header link link_white inline-block" href="/work">
                Work
              </Link>
            </li>
            <li className="overflow-hidden">
              <Link className="anim-items-header link link_white inline-block" href="/photography">
                Photography
              </Link>
            </li>
            <li className="overflow-hidden">
              <Link className="anim-items-header link link_white inline-block" href="/about">
                About
              </Link>
            </li>
            <li>
              <Button
                // ref={buttonRef}
                as="a"
                className="overflow-hidden"
                href="/contact"
              >
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
