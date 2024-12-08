import AnimatedText, { AnimatedTextRef } from '@/components/atoms/AnimatedText';
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
    title: useRef<AnimatedTextRef>(null),
    subtitle1: useRef<AnimatedTextRef>(null),
    subtitle2: useRef<AnimatedTextRef>(null),
  };

  const sectionRef = useRef(null);
  const contactFormRef = useRef(null);

  useGSAP(() => {
    const animTitle = textsAnimation.title.current?.textAnimation();
    const animSubtitle1 = textsAnimation.subtitle1.current?.textAnimation();
    const animSubtitle2 = textsAnimation.subtitle2.current?.textAnimation();

    if (!animTitle || !animSubtitle1 || !animSubtitle2) return;
    gsap
      .timeline({
        delay: 0.8,
      })
      .add(animTitle)
      .add(animSubtitle1, '-=0.6')
      .add(animSubtitle2, '-=0.8');

    useParallax(contactFormRef.current, 0.2, 'bottom', 1024);
  });

  return (
    <section
      ref={sectionRef}
      className="relative grid min-h-screen grid-cols-1 gap-x-5 px-x-default pb-y-default pt-header md:grid-cols-12"
    >
      <div className="col-span-6 lg:col-span-6">
        <AnimatedText
          ref={textsAnimation.title}
          className="-translate-y-[15%] pt-y-default"
          isRandomAnim={true}
          variant="h1"
        >
          CONTACT
        </AnimatedText>
        <div>
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
