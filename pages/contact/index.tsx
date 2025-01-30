import AnimatedText, { AnimatedTextRef } from '@/components/atoms/AnimatedText';
import ContactForm from '@/components/ContactForm';
import Call, { AnimatedCallRef } from '@/components/sections/contact/Call';
import Loaction, { AnimatedLocationRef } from '@/components/sections/contact/Location';
import Mail, { AnimatedMailRef } from '@/components/sections/contact/Mail';
import SEO from '@/components/SEO';
import { useParallax } from '@/hooks/useParallax';
import { useLanguage } from '@/providers/language.provider';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';

export default function Page() {
  const { isFrench } = useLanguage();

  const animationRefs = {
    title: useRef<AnimatedTextRef>(null),
    subtitle1: useRef<AnimatedTextRef>(null),
    subtitle2: useRef<AnimatedTextRef>(null),
    location: useRef<AnimatedLocationRef>(null),
    mail: useRef<AnimatedMailRef>(null),
    call: useRef<AnimatedCallRef>(null),
  };

  const sectionRef = useRef(null);
  const contactFormRef = useRef(null);

  useGSAP(() => {
    const timeline = gsap.timeline({
      delay: 0.8,
    });

    const animations = [
      { anim: animationRefs.title.current?.textAnimation(), delay: '0' },
      { anim: animationRefs.subtitle1.current?.textAnimation(), delay: '-=0.6' },
      { anim: animationRefs.subtitle2.current?.textAnimation(), delay: '-=0.8' },
      { anim: animationRefs.location.current?.locationAnimation(), delay: '-=0.8' },
      { anim: animationRefs.mail.current?.mailAnimation(), delay: '-=0.65' },
      { anim: animationRefs.call.current?.callAnimation(), delay: '-=0.65' },
    ];

    animations.map(({ anim, delay }) => anim && timeline.add(anim, delay));

    useParallax(contactFormRef.current, 0.2, 'bottom', 1024);
  });

  return (
    <>
      <SEO title="Jérôme BEZEAU • Contact" />
      <section
        ref={sectionRef}
        className="relative grid min-h-screen grid-cols-1 gap-x-5 px-x-default pb-y-default pt-header md:grid-cols-12"
      >
        <div className="col-span-6 lg:col-span-6">
          <AnimatedText
            ref={animationRefs.title}
            className="-translate-y-[15%] pt-y-default"
            isRandomAnim={true}
            variant="h1"
          >
            CONTACT
          </AnimatedText>
          <div>
            <AnimatedText ref={animationRefs.subtitle1} className="text1 text-white-80" variant="p">
              {isFrench ? 'Prêt à commencer ?' : 'Ready to kick things off?'}
            </AnimatedText>
            <AnimatedText
              ref={animationRefs.subtitle2}
              className="text1 pt-5 text-white-80"
              variant="p"
            >
              {isFrench
                ? "N'hésitez pas à m'envoyer un email, m'appeler ou simplement remplir le formulaire !"
                : 'Feel free to send an e-mail, give me a call or just fill the form !'}
            </AnimatedText>
            <div className="flex flex-col gap-y-11 pt-y-half-default md:grid-cols-2 lg:grid-cols-3">
              <Loaction ref={animationRefs.location} />
              <Mail ref={animationRefs.mail} />
              <Call ref={animationRefs.call} />
            </div>
          </div>
        </div>
        <div className="sticky top-header col-span-6 h-fit md:-col-end-1 lg:col-span-4 lg:-col-end-1">
          <ContactForm />
        </div>
      </section>
    </>
  );
}
