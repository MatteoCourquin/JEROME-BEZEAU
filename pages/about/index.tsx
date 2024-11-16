import CardSkills from '@/components/CardSkills';
import Contact from '@/components/sections/Contact';
import { LanguageContext } from '@/layout/default';
import { useParallax } from '@/utils/animations';
import { useTouchDevice } from '@/utils/states';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';
import { useContext, useEffect, useRef, useState } from 'react';

const cardsSkills = [
  {
    title: {
      en: 'BRANDING',
      fr: 'IMAGE DE MARQUE',
    },
    description: {
      en: 'Strategic brand development, visual identity creation and brand guidelines implementation.',
      fr: "Développement stratégique de marque, création d'identité visuelle et mise en place de chartes graphiques.",
    },
    imageSrc: '/images/JB.jpeg',
  },
  {
    title: {
      en: 'UI DESIGN',
      fr: "DESIGN D'INTERFACE",
    },
    description: {
      en: 'Creating intuitive and aesthetic user interfaces for web and mobile applications.',
      fr: "Création d'interfaces utilisateur intuitives et esthétiques pour applications web et mobile.",
    },
    imageSrc: '/images/JB.jpeg',
  },
  {
    title: {
      en: 'MOTION DESIGN',
      fr: 'DESIGN ANIMÉ',
    },
    description: {
      en: 'Dynamic visual content creation, animated logos and interactive motion graphics.',
      fr: 'Création de contenu visuel dynamique, logos animés et graphiques interactifs en mouvement.',
    },
    imageSrc: '/images/JB.jpeg',
  },
  {
    title: {
      en: 'FILMMAKING',
      fr: 'RÉALISATION',
    },
    description: {
      en: 'Video production from concept to final edit, including storytelling and direction.',
      fr: 'Production vidéo du concept au montage final, incluant narration et direction.',
    },
    imageSrc: '/images/JB.jpeg',
  },
  {
    title: {
      en: 'PHOTOGRAPHY',
      fr: 'PHOTOGRAPHIE',
    },
    description: {
      en: 'Professional photo shoots, post-production and artistic direction for various projects.',
      fr: 'Séances photo professionnelles, post-production et direction artistique pour divers projets.',
    },
    imageSrc: '/images/JB.jpeg',
  },
];

export default function Page() {
  const descriptionRef = useRef(null);
  const titleRef = useRef(null);
  const imageRef = useRef(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { isFrench } = useContext(LanguageContext);

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
    useParallax(descriptionRef.current, 0.1, 'bottom', 1024);
    useParallax(imageRef.current, 0.15, 'bottom', 1024);
    useParallax(titleRef.current, 0.1, 'bottom', 640);
  });

  return (
    <>
      <section className="relative grid min-h-screen grid-cols-1 gap-x-[10%] px-x-default pb-y-default pt-header lg:grid-cols-[5fr,6fr]">
        <div ref={descriptionRef} className="flex flex-col gap-14 pt-y-default lg:pb-52">
          <h1>{isFrench ? 'À PROPOS' : 'ABOUT ME'}</h1>
          <div className="w-full sm:w-3/5">
            <h5 className="text2 uppercase !text-white-80">
              {isFrench ? 'PROFESSIONNELLEMENT' : 'PROFESSIONALLY'}
            </h5>
            <p className="text2 pt-6">
              {isFrench
                ? 'Est et id suspendisse nullam consequat nisl augue. At posuere ac nec ac. Proin est augue massa ultrices massa id facilisis. Quam facilisis tellus ut ipsum. Dui vulputate netus mauris lorem volutpat. Lobortis laoreet metus ultrices cum eu ut lectus risus orci. Felis turpis ut tortor neque a.'
                : 'Est et id suspendisse nullam consequat nisl augue. At posuere ac nec ac. Proin est augue massa ultrices massa id facilisis. Quam facilisis tellus ut ipsum. Dui vulputate netus mauris lorem volutpat. Lobortis laoreet metus ultrices cum eu ut lectus risus orci. Felis turpis ut tortor neque a.'}
            </p>
          </div>
          <div className="w-full sm:w-3/5">
            <h5 className="text2 uppercase !text-white-80">
              {isFrench ? 'PERSONNELLEMENT' : 'PERSONALLY'}
            </h5>
            <p className="text2 pt-6">
              {isFrench
                ? 'Est et id suspendisse nullam consequat nisl augue. At posuere ac nec ac. Proin est augue massa ultrices massa id facilisis. Quam facilisis tellus ut ipsum. Dui vulputate netus mauris lorem volutpat. Lobortis laoreet metus ultrices cum eu ut lectus risus orci. Felis turpis ut tortor neque a.'
                : 'Est et id suspendisse nullam consequat nisl augue. At posuere ac nec ac. Proin est augue massa ultrices massa id facilisis. Quam facilisis tellus ut ipsum. Dui vulputate netus mauris lorem volutpat. Lobortis laoreet metus ultrices cum eu ut lectus risus orci. Felis turpis ut tortor neque a.'}
            </p>
          </div>
        </div>
        <div className="h-full w-full overflow-hidden pt-y-default">
          <Image
            ref={imageRef}
            alt="About me"
            className="h-full w-full object-cover"
            height={1080}
            src="/images/JB.jpeg"
            width={1920}
            priority
          />
        </div>
      </section>
      <section className="grid grid-cols-1 gap-5 px-x-default pb-y-default sm:grid-cols-2 sm:py-y-default lg:grid-cols-3">
        <div ref={titleRef}>
          <h2 className="heading4">{isFrench ? 'Compétences' : 'Skills'}</h2>
          <p>{isFrench ? 'En quoi puis-je vous aider ?' : 'What can I help you with ?'}</p>
        </div>
        {cardsSkills.map((card, index) => (
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
