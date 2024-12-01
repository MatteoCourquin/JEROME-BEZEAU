import AnimatedText from '@/components/atoms/AnimatedText';
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

  const textsAnimation = {
    title: useRef<{ textAnimation: () => void }>(null),
    subtitle1: useRef<{ textAnimation: () => void }>(null),
    subtitle2: useRef<{ textAnimation: () => void }>(null),
  };

  const sectionRef = useRef(null);
  const contactFormRef = useRef(null);

  useGSAP(() => {
    gsap
      .timeline({
        delay: 0.8,
      })
      .add(() => textsAnimation.title.current?.textAnimation())
      .add(() => textsAnimation.subtitle1.current?.textAnimation(), '+=0.2')
      .add(() => textsAnimation.subtitle2.current?.textAnimation(), '+=0.2');

    useParallax(contactFormRef.current, 0.2, 'bottom', 1024);
  });

  return (
    <section
      ref={sectionRef}
      className="relative grid min-h-screen grid-cols-1 gap-x-5 px-x-default pb-y-default pt-header md:grid-cols-12"
    >
      <div className="col-span-6 lg:col-span-6">
        <AnimatedText ref={textsAnimation.title} className="pt-y-default" variant="h1">
          CONTACT
        </AnimatedText>
        <div className="pt-16">
          <AnimatedText ref={textsAnimation.subtitle1} className="text1 text-white-80" variant="p">
            {isFrench ? 'Prêt à commencer ?' : 'Ready to kick things off?'}
          </AnimatedText>
          <AnimatedText
            ref={textsAnimation.subtitle2}
            className="text1 pt-5 text-white-80"
            variant="p"
          >
            {isFrench
              ? "N'hésitez pas à m'envoyer un email, m'appeler ou simplement remplir le formulaire !"
              : 'Feel free to send an e-mail, give me a call or just fill the form !'}
          </AnimatedText>
          <div className="flex flex-col gap-y-11 pt-y-half-default md:grid-cols-2 lg:grid-cols-3">
            <Loaction />
            <Mail />
            <Call />
          </div>
        </div>
      </div>
      <div ref={contactFormRef} className="col-span-6 md:-col-end-1 lg:col-span-4 lg:-col-end-1">
        <ContactForm />
      </div>
    </section>
  );
}
