import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Call from '@/components/sections/contact/Call';
import Loaction from '@/components/sections/contact/Location';
import Mail from '@/components/sections/contact/Mail';
import { useParallax } from '@/hooks/useParallax';
import { useLanguage } from '@/providers/language.provider';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';

export default function Page() {
  const { isFrench } = useLanguage();
  const descriptionRef = useRef(null);

  const handdleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.info('Form submitted');
  };

  useGSAP(() => {
    useParallax(descriptionRef.current, 0.1, 'bottom', 1024);
  });

  return (
    <section className="relative grid min-h-screen grid-cols-1 gap-x-[20%] px-x-default pb-y-default pt-header lg:grid-cols-[6fr,4fr]">
      <div ref={descriptionRef}>
        <h1 className="pt-y-default">CONTACT</h1>
        <div className="pt-16">
          <p className="text1 text-white-80">
            {isFrench ? 'Prêt à commencer ?' : 'Ready to kick things off?'}
          </p>
          <p className="text1 pt-5 text-white-80">
            {isFrench
              ? "N'hésitez pas à m'envoyer un email, m'appeler ou simplement remplir le formulaire !"
              : 'Feel free to send an e-mail, give me a call or just fill the form !'}
          </p>
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
        <form className="flex flex-col gap-10 pt-10" onSubmit={(e) => handdleFormSubmit(e)}>
          <Input name="name" placeholder={isFrench ? 'Clara Dupont' : 'John Doe'} type="text" />
          <Input
            name="email"
            placeholder={isFrench ? 'clara.dupont@gmail.com' : 'john.doe@gmail.com'}
            type="email"
          />
          <Input
            name="phone"
            placeholder={isFrench ? '06 78 90 12 34' : '+1 234 567 8900'}
            type="tel"
          />
          <Input
            name="subject"
            placeholder={isFrench ? 'Que recherchez-vous ?' : 'What are you looking for?'}
            type="select"
          >
            <option value="default">
              {isFrench ? 'Sélectionnez une option' : 'Select an option'}
            </option>
            <option value="design">Design</option>
            <option value="development">{isFrench ? 'Développement' : 'Development'}</option>
            <option value="both">{isFrench ? 'Les deux' : 'Both'}</option>
            <option value="other">{isFrench ? 'Autre' : 'Other'}</option>
          </Input>
          <Input
            name="message"
            type="textarea"
            placeholder={
              isFrench
                ? 'Décrivez votre projet en quelques mots'
                : 'Describe your project in a few words'
            }
          />
          <Button className="w-fit" type="submit">
            {isFrench ? 'Envoyer' : 'Send'}
          </Button>
        </form>
      </div>
    </section>
  );
}
