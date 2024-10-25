import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { LottieRefCurrentProps } from 'lottie-react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRef } from 'react';
import JBLottie from '../public/lottie/JB.json';
import Button from './atoms/Button';
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

const Header = () => {
  const timeline = useRef(gsap.timeline({ paused: true }));
  const navRef = useRef<HTMLBodyElement>(null);
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  useGSAP(() => {
    if (!navRef.current) return;

    const links = navRef.current.querySelectorAll('.anim-items-header');

    timeline.current
      .add(gsap.fromTo(links, { y: 100 }, { y: 0, duration: 1, ease: 'power3.out', stagger: 0.1 }))
      .add(() => lottieRef.current && lottieRef.current.play())
      .play();
  });

  return (
    <header className="mix-blend- difference fixed left-0 top-0 z-[800] h-[100px] w-screen overflow-hidden border-b border-b-white-12 px-x-default backdrop-blur-lg">
      <div className="flex h-24 items-center justify-between">
        <Link className="cursor-button" href="/" scroll={false}>
          <Lottie
            animationData={JBLottie}
            autoPlay={false}
            className="h-[85px] pb-7"
            loop={false}
            lottieRef={lottieRef}
          />
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
