import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Hint from '@/components/Hint';
import { LanguageContext } from '@/layout/default';
import { useParallax } from '@/utils/animations';
import { useGSAP } from '@gsap/react';
import { useContext, useRef, useState } from 'react';

const getFormattedTime = (isEnglish = false) => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0');

  if (isEnglish) {
    const period = hours >= 12 ? 'PM' : 'AM';
    const hours12 = hours % 12 || 12;
    return `IT IS ${hours12}:${minutes} ${period} HERE!`;
  } else {
    return `IL EST ${hours}H${minutes} ICI !`;
  }
};

export default function Page() {
  const { isFrench } = useContext(LanguageContext);
  const descriptionRef = useRef(null);
  const containerHintRef = useRef(null);
  const [isActive, setIsActive] = useState(false);

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
          <div className="flex flex-col gap-y-14 pt-y-half-default md:grid-cols-2 md:gap-x-5 lg:grid-cols-3">
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <div className="relative mb-1 h-2 w-2">
                  <div className="absolute h-full w-full bg-green"></div>
                  <div className="absolute h-full w-full animate-ping bg-green"></div>
                </div>
                <h6 className="text2">{isFrench ? 'DISPONIBLE' : 'AVAILABLE FOR WORK'}</h6>
              </div>
              {isFrench ? (
                <p>
                  À Paris <br /> & à distance
                </p>
              ) : (
                <p>
                  In Paris <br /> & remotely
                </p>
              )}
            </div>
            <div className="flex flex-col gap-5">
              <h6 className="text2 text-white-40">
                {isFrench ? 'ENVOYEZ UN MESSAGE :' : 'SEND A MESSAGE :'}
              </h6>
              <a className="link link_white-80 w-fit" href="mailto:jeromebezeau.pro@gmail.com">
                jeromebezeau.pro@gmail.com
              </a>
              <div
                ref={containerHintRef}
                className="w-fit"
                onMouseLeave={() => setIsActive(false)}
                onMouseOver={() => setIsActive(true)}
              >
                <h6 className="text2 pt-5 text-white-40">
                  {isFrench ? 'APPELEZ-MOI :' : 'GIVE ME A CALL :'}
                </h6>
                <div>
                  <Hint
                    container={containerHintRef}
                    isActive={isActive}
                    value={isFrench ? getFormattedTime() : getFormattedTime(true)}
                  />
                  <a className="link link_white-80 w-fit" href="tel:+33664583272">
                    (+33) 6 64 58 32 72
                  </a>
                </div>
              </div>
            </div>
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
