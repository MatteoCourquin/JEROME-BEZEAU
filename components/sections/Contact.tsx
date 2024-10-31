import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { RefObject, useRef } from 'react';

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
        <span className="inline-block pr-5">READY TO KICK THINGS OFF ?</span>
        <span className="inline-block pr-5">READY TO KICK THINGS OFF ?</span>
        <span className="inline-block pr-5">READY TO KICK THINGS OFF ?</span>
        <span className="inline-block pr-5">READY TO KICK THINGS OFF ?</span>
      </h2>
      <div className="grid grid-cols-3">
        <div>
          <h6>AVAILABLE FOR WORK</h6>
          <p>
            I am always open to new opportunities and collaborations. If you have a project in mind,
            or if you just want to say hi, feel free to get in touch with me.
          </p>
        </div>
        <div>
          <h6>AVAILABLE FOR WORK</h6>
          <p>
            I am always open to new opportunities and collaborations. If you have a project in mind,
            or if you just want to say hi, feel free to get in touch with me.
          </p>
        </div>
        <div>
          <h6>AVAILABLE FOR WORK</h6>
          <p>
            I am always open to new opportunities and collaborations. If you have a project in mind,
            or if you just want to say hi, feel free to get in touch with me.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
