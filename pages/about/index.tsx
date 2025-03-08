import AnimatedText, { AnimatedTextRef } from '@/components/atoms/AnimatedText';
import CardSkills from '@/components/CardSkills';
import Contact from '@/components/sections/Contact';
import { SKILLS } from '@/constants';
import { useMagnet, useResetMagnet } from '@/hooks/useMagnet';
import { useParallax } from '@/hooks/useParallax';
import { useTouchDevice } from '@/hooks/useTouchDevice';
import { useLanguage } from '@/providers/language.provider';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export default function Page() {
  const { isFrench } = useLanguage();
  const animationRefs = {
    title: useRef<AnimatedTextRef>(null),
    description1: useRef<HTMLDivElement>(null),
    description2: useRef<HTMLDivElement>(null),
    image: useRef<HTMLDivElement>(null),
  };
  const descriptionRef = useRef(null);
  const titleRef = useRef(null);
  const imageRef = useRef(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const startInterval = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      setActiveIndex((prevIndex) => {
        let newIndex;
        do {
          newIndex = Math.floor(Math.random() * 5);
        } while (newIndex === prevIndex);
        return newIndex;
      });
    }, 2000);
  };

  const stopInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    startInterval();
    return () => stopInterval();
  }, []);

  useGSAP(() => {
    const timeline = gsap.timeline({ delay: 0.8 });

    const titleAnim = animationRefs.title.current?.textAnimation();

    if (titleAnim) timeline.add(titleAnim);

    const descriptions = [
      { ref: animationRefs.description1.current?.children },
      { ref: animationRefs.description2.current?.children },
    ];

    descriptions.map(({ ref }) => {
      if (ref) {
        timeline.from(
          ref,
          {
            y: 30,
            opacity: 0,
            duration: 0.6,
            ease: 'power2.out',
            stagger: 0.2,
          },
          '-=0.4',
        );
      }
    });

    gsap.set(animationRefs.image.current, {
      scaleX: 0,
      transformOrigin: 'left center',
    });
    gsap.set(imageRef.current, {
      scaleX: 1,
      transformOrigin: 'left center',
    });

    timeline.to(
      animationRefs.image.current,
      {
        scaleX: 1,
        duration: 1.4,
        ease: 'power3.inOut',
        onUpdate: () => {
          const currentScale = gsap.getProperty(animationRefs.image.current, 'scaleX');
          if (currentScale !== 0) {
            gsap.set(imageRef.current, {
              scaleX: 1 / Number(currentScale),
              transformOrigin: 'left center',
            });
          }
        },
      },
      '-=0.8',
    );

    useParallax(descriptionRef.current, 0.1, 'bottom', 1024);
    useParallax(imageRef.current, 0.15, 'bottom', 1024);
    useParallax(titleRef.current, 0.1, 'bottom', 640);
  }, []);

  return (
    <>
      <Head>
        <title>{'Jérôme BEZEAU • ' + (isFrench ? 'À propos' : 'About')}</title>
        <link href="https://www.jeromebezeau.com/about/" rel="canonical" />
        <meta content="https://www.jeromebezeau.com/about/" property="og:url" />
      </Head>
      <section className="relative grid min-h-screen grid-cols-1 gap-x-[10%] px-x-default pb-y-default pt-header lg:grid-cols-[5fr,6fr]">
        <div ref={descriptionRef} className="flex flex-col pt-y-default lg:pb-52">
          <AnimatedText
            ref={animationRefs.title}
            className="-translate-y-[15%]"
            isRandomAnim={true}
            variant="h1"
          >
            {isFrench ? 'À PROPOS' : 'ABOUT ME'}
          </AnimatedText>
          <div ref={animationRefs.description1} className="w-full sm:w-3/5">
            <h5 className="text2 uppercase !text-white-80">
              {isFrench ? 'PROFESSIONNELLEMENT' : 'PROFESSIONALLY'}
            </h5>
            <p className="text2 pt-6">
              {isFrench
                ? 'Mon travail repose sur un équilibre entre esthétique et fonctionnalité. Spécialisé en conception digitale, je développe des identités visuelles percutantes, des expériences interactives fluides et des animations captivantes. J’accompagne les entreprises dans la création d’univers graphiques cohérents et impactants, toujours avec un regard pointu sur les tendances et l’innovation.'
                : 'My work is built on a balance between aesthetics and functionality. Specializing in digital design, I craft striking visual identities, seamless interactive experiences, and captivating animations. I help businesses create cohesive and impactful visual universes, always with a sharp eye on trends and innovation.'}
            </p>
          </div>
          <div ref={animationRefs.description2} className="w-full pt-14 sm:w-3/5">
            <h5 className="text2 uppercase !text-white-80">
              {isFrench ? 'PERSONNELLEMENT' : 'PERSONALLY'}
            </h5>
            <p className="text2 pt-6">
              {isFrench
                ? "En parallèle, je pratique le triathlon qui m'apprend la résilience, l'organisation et l'adaptation. Je trouve aussi une grande satisfaction à explorer l'univers de la photographie, où chaque image est l'occasion de saisir l'énergie et l'esthétique du mouvement, que ce soit dans le sport ou dans la vie de tous les jours."
                : 'In parallel, I practice triathlon, which teaches me resilience, organization, and adaptation. I also find great satisfaction in exploring the world of photography, where each image is an opportunity to capture the energy and aesthetics of movement, whether in sports or everyday life.'}
            </p>
          </div>
        </div>
        <div
          ref={animationRefs.image}
          className="h-full w-full overflow-hidden pt-y-default"
          onMouseLeave={useResetMagnet}
          onMouseMove={(e) => useMagnet(e, 1)}
        >
          <Image
            ref={imageRef}
            alt="Jérôme Bezeau"
            className="h-full w-full object-cover"
            height={1080}
            src="/images/about/jerome-bezeau.jpg"
            width={1920}
            priority
          />
        </div>
      </section>
      <section className="grid grid-cols-1 gap-5 px-x-default pb-y-default sm:grid-cols-2 sm:py-y-default lg:grid-cols-3">
        <div ref={titleRef}>
          <AnimatedText as="heading4" className="uppercase" isRandomAnim={true} variant="h2">
            {isFrench ? 'Compétences' : 'Skills'}
          </AnimatedText>
          <p>{isFrench ? 'En quoi puis-je vous aider ?' : 'What can I help you with ?'}</p>
        </div>
        {SKILLS.map((card, index) => (
          <CardSkills
            key={card.title.en + index}
            description={card.description}
            imageSrc={card.imageSrc}
            isActive={useTouchDevice() || index === activeIndex}
            title={card.title}
            onHover={() => {
              if (useTouchDevice()) return;
              setActiveIndex(index);
            }}
            onLeave={() => {
              if (useTouchDevice()) return;
              setActiveIndex(null);
              startInterval();
            }}
            onMouseEnter={() => {
              if (useTouchDevice()) return;
              stopInterval();
            }}
          />
        ))}
      </section>
      <Contact />
    </>
  );
}
