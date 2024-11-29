import AnimatedText from '@/components/AnimatedText';
import ContactForm from '@/components/ContactForm';
import Call from '@/components/sections/contact/Call';
import Loaction from '@/components/sections/contact/Location';
import Mail from '@/components/sections/contact/Mail';
import { useParallax } from '@/hooks/useParallax';
import { useLanguage } from '@/providers/language.provider';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';

export default function Page() {
  const { isFrench } = useLanguage();

  const sectionRef = useRef(null);
  const descriptionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useGSAP(() => {
    gsap
      .timeline()
      .fromTo(
        titleRef.current,
        {
          yPercent: 100,
        },
        {
          yPercent: 0,
          duration: 1,
          ease: 'power3.out',
        },
      )
      .fromTo(
        subtitleRef.current,
        {
          yPercent: 100,
        },
        {
          yPercent: 0,
          duration: 0.8,
          ease: 'power3.out',
        },
      );

    useParallax(descriptionRef.current, 0.1, 'bottom', 1024);
  });

  return (
    <section
      ref={sectionRef}
      className="relative grid min-h-screen grid-cols-1 gap-x-[20%] px-x-default pb-y-default pt-header lg:grid-cols-[6fr,4fr]"
    >
      <div ref={descriptionRef}>
        <h1 className="overflow-hidden pt-y-default">
          <span ref={titleRef} className="inline-block">
            CONTACT
          </span>
        </h1>
        <div className="pt-16">
          <AnimatedText
            className="text1 text-white-80"
            isTriggerAnim={true}
            trigger={sectionRef}
            variant="p"
          >
            {isFrench ? 'Prêt à commencer ?' : 'Ready to kick things off?'}
          </AnimatedText>
          <AnimatedText
            className="text1 pt-5 text-white-80"
            isTriggerAnim={true}
            trigger={sectionRef}
            variant="p"
          >
            {isFrench
              ? "N'hésitez pas à m'envoyer un email, m'appeler ou simplement remplir le formulaire !"
              : 'Feel free to send an e-mail, give me a call or just fill the form !'}
          </AnimatedText>
          {/* <p className="text1 text-white-80">
            {isFrench ? 'Prêt à commencer ?' : 'Ready to kick things off?'}
          </p> */}
          {/* <p className="text1 pt-5 text-white-80">
            {isFrench
              ? "N'hésitez pas à m'envoyer un email, m'appeler ou simplement remplir le formulaire !"
              : 'Feel free to send an e-mail, give me a call or just fill the form !'}
          </p> */}
          <div className="flex flex-col gap-y-11 pt-y-half-default md:grid-cols-2 lg:grid-cols-3">
            <Loaction />
            <Mail />
            <Call />
          </div>
        </div>
      </div>
      <div>
        <p className="text1 pt-y-default uppercase text-white-80">
          {isFrench ? 'REMPLISSEZ LE FORMULAIRE' : 'FILL THE FORM'}
        </p>
        <ContactForm />
      </div>
    </section>
  );
}
