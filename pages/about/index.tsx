import CardSkills from '@/components/CardSkills';
import Contact from '@/components/sections/Contact';
import { LanguageContext } from '@/layout/default';
import { useParallax } from '@/utils/animations';
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
  const descriptionRef = useRef<HTMLDivElement>(null);
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
    useParallax(descriptionRef.current, 0.1, 'bottom', 620);
  }, []);

  return (
    <>
      <section className="relative grid min-h-screen grid-cols-1 gap-x-[10%] px-x-default pb-y-default pt-header lg:grid-cols-[5fr,6fr]">
        <div ref={descriptionRef} className="flex flex-col gap-14 pt-y-default sm:pb-52">
          <h1>{isFrench ? 'À PROPOS DE MOI' : 'ABOUT ME'}</h1>
          <div className="w-full sm:w-3/5">
            <h5 className="text2 uppercase !text-white-80">PROFESSIONALLY</h5>
            <p className="text2 pt-6">
              Est et id suspendisse nullam consequat nisl augue. At posuere ac nec ac. Proin est
              augue massa ultrices massa id facilisis. Quam facilisis tellus ut ipsum. Dui vulputate
              netus mauris lorem volutpat. Lobortis laoreet metus ultrices cum eu ut lectus risus
              orci. Felis turpis ut tortor neque a.
            </p>
          </div>
          <div className="w-full sm:w-3/5">
            <h5 className="text2 uppercase !text-white-80">PERSONNALY</h5>
            <p className="text2 pt-6">
              Est et id suspendisse nullam consequat nisl augue. At posuere ac nec ac. Proin est
              augue massa ultrices massa id facilisis. Quam facilisis tellus ut ipsum. Dui vulputate
              netus mauris lorem volutpat. Lobortis laoreet metus ultrices cum eu ut lectus risus
              orci. Felis turpis ut tortor neque a.
            </p>
          </div>
        </div>
        <div className="h-full w-full pt-y-default">
          <Image
            alt="About me"
            className="h-full w-full object-cover"
            height={1080}
            src="/images/JB.jpeg"
            width={1920}
          />
        </div>
      </section>
      <section className="grid grid-cols-1 gap-5 px-x-default py-y-default sm:grid-cols-2 lg:grid-cols-3">
        <div className="pt-[25%]">
          <h2 className="heading4">Skills</h2>
          <p>What can I help you with ?</p>
        </div>
        {cardsSkills.map((card, index) => (
          <CardSkills
            key={card.title.en + index}
            description={card.description}
            imageSrc={card.imageSrc}
            isActive={index === activeIndex}
            title={card.title}
            onHover={() => setActiveIndex(index)}
            onMouseEnter={stopInterval}
            onLeave={() => {
              setActiveIndex(null);
              startInterval();
            }}
          />
        ))}
      </section>
      <Contact />
    </>
  );
}
