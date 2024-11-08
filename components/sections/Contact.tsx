import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { RefObject, useRef } from 'react';
import Button from '../atoms/Button';

const Contact = () => {
  const wrapperSection = useRef<HTMLDivElement>(null);
  const scrollContainer = useRef<HTMLDivElement>(null);
  const infiniteAnimationRef = useRef<gsap.core.Tween[]>([]);

  const animateInfinite = (element: RefObject<HTMLDivElement>) => {
    if (!element.current) return;

    const tween = gsap.to(element.current.children, {
      x: '-100%',
      duration: 10,
      repeat: -1,
      ease: 'none',
      paused: false,
    });

    infiniteAnimationRef.current.push(tween);
  };

  const controlScroll = (action: 'play' | 'pause') => {
    infiniteAnimationRef.current.map((animation) => {
      gsap.to(animation, {
        timeScale: action === 'play' ? 1 : 0,
        duration: 1,
        ease: 'power.out',
        overwrite: true,
      });
    });
  };

  const animateScroll = () => {
    const timeline = gsap.timeline({
      scrollTrigger: {
        start: 'top top',
        scrub: true,
      },
    });

    timeline.to(scrollContainer.current, { x: -800, ease: 'none' });
  };

  useGSAP(() => {
    animateInfinite(scrollContainer);
    animateScroll();
  }, []);

  return (
    <section
      ref={wrapperSection}
      className="flex flex-col gap-y-default overflow-hidden px-x-default py-y-default"
    >
      <h2
        ref={scrollContainer}
        className="heading1 flex justify-center whitespace-nowrap uppercase"
        onMouseLeave={() => controlScroll('play')}
        onMouseOver={() => controlScroll('pause')}
      >
        <span className="inline-block pr-7">READY TO KICK THINGS OFF ?</span>
        <span className="inline-block pr-7">READY TO KICK THINGS OFF ?</span>
        <span className="inline-block pr-7">READY TO KICK THINGS OFF ?</span>
        <span className="inline-block pr-7">READY TO KICK THINGS OFF ?</span>
        <span className="inline-block pr-7">READY TO KICK THINGS OFF ?</span>
      </h2>
      <div className="grid grid-cols-1 gap-y-y-default md:grid-cols-2 md:gap-x-5 lg:grid-cols-3">
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <div className="relative mb-1 h-2 w-2">
              <div className="absolute h-full w-full bg-green"></div>
              <div className="absolute h-full w-full animate-ping bg-green"></div>
            </div>
            <h6>AVAILABLE FOR WORK</h6>
          </div>
          <p>
            In Paris <br />& remotely
          </p>
        </div>
        <div className="flex flex-col gap-5">
          <h6 className="text-white-40">SEND A MESSAGE :</h6>
          <a className="link link_white-80 w-fit" href="mailto:jeromebezeau.pro@gmail.com">
            jeromebezeau.pro@gmail.com
          </a>
          <h6 className="pt-5 text-white-40">GIVE ME A CALL :</h6>
          <a className="link link_white-80 w-fit" href="tel:+33664583272">
            (+33) 6 64 58 32 72
          </a>
        </div>
        <div className="flex flex-col gap-5">
          <h6 className="text-white-40">OR FILL THE FORM :</h6>
          <Button className="w-fit" href="/contact" type="a">
            Contact
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Contact;
