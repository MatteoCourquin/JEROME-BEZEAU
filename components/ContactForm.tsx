import { useLanguage } from '@/providers/language.provider';
import Button from './atoms/Button';
import Input from './atoms/Input';
import { useContactForm } from '../hooks/useContactForm';
import { FORM_STATE } from '@/types/form.type';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import AnimatedText from './AnimatedText';

const ContactForm = () => {
  const { isFrench } = useLanguage();
  const {
    formState,
    formValues,
    formErrors,
    validateField,
    handleFieldChange,
    submitFormMutation,
    getButtonText,
  } = useContactForm(isFrench);

  const titleRef = useRef<{ textAnimation: () => void }>(null);
  const inputsRef = {
    name: useRef<{ inputAnimation: () => void }>(null),
    email: useRef<{ inputAnimation: () => void }>(null),
    phone: useRef<{ inputAnimation: () => void }>(null),
    subject: useRef<{ inputAnimation: () => void }>(null),
    message: useRef<{ inputAnimation: () => void }>(null),
  };
  const buttonRef = useRef(null);

  useGSAP(() => {
    gsap
      .timeline({
        delay: 1,
      })
      .add(() => inputsRef.name.current?.inputAnimation(), '+=0.1')
      .add(() => inputsRef.email.current?.inputAnimation(), '+=0.1')
      .add(() => inputsRef.phone.current?.inputAnimation(), '+=0.1')
      .add(() => inputsRef.subject.current?.inputAnimation(), '+=0.1')
      .add(() => inputsRef.message.current?.inputAnimation(), '+=0.1')
      .add(() => titleRef.current?.textAnimation(), '+=0.4')
      .fromTo(
        buttonRef.current,
        { y: 100 },
        { y: 0, duration: 1, delay: 1, ease: 'power3.out' },
        '-=1.4',
      );
  }, []);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationResults = Object.entries(formValues).map(([key, value]) =>
      validateField(key, value),
    );

    if (!validationResults.every((result) => result === true)) return;

    submitFormMutation.mutate(formValues);
  };

  return (
    <>
      <div className="pt-y-default">
        <AnimatedText ref={titleRef} className="text1 uppercase text-white-80" variant="h4">
          {isFrench ? 'REMPLISSEZ LE FORMULAIRE' : 'FILL THE FORM'}
        </AnimatedText>
      </div>
      <form className="flex flex-col gap-10 pt-10" onSubmit={handleFormSubmit}>
        <Input
          ref={inputsRef.name}
          errorMessage={formErrors.name}
          name="name"
          placeholder={isFrench ? 'Clara Dupont' : 'John Doe'}
          type="text"
          value={formValues.name}
          onBlur={(e) => validateField('name', e.target.value)}
          onChange={(e) => handleFieldChange('name', e.target.value)}
        />
        <Input
          ref={inputsRef.email}
          errorMessage={formErrors.email}
          name="email"
          placeholder={isFrench ? 'clara.dupont@gmail.com' : 'john.doe@gmail.com'}
          type="email"
          value={formValues.email}
          onBlur={(e) => validateField('email', e.target.value)}
          onChange={(e) => handleFieldChange('email', e.target.value)}
        />
        <Input
          ref={inputsRef.phone}
          errorMessage={formErrors.phone}
          name="phone"
          placeholder={isFrench ? '06 78 90 12 34' : '+1 234 567 8900'}
          type="tel"
          value={formValues.phone}
          onBlur={(e) => validateField('phone', e.target.value)}
          onChange={(e) => handleFieldChange('phone', e.target.value)}
        />
        <Input
          ref={inputsRef.subject}
          name="subject"
          placeholder={isFrench ? 'Que recherchez-vous ?' : 'What are you looking for?'}
          type="select"
          value={formValues.subject}
          onBlur={(e) => validateField('subject', e.target.value)}
          onChange={(e) => handleFieldChange('subject', e.target.value)}
        >
          <option value="default">
            {isFrench ? 'Sélectionnez une option' : 'Select an option'}
          </option>
          <option value="branding">BRANDING</option>
          <option value="UI">UI</option>
          <option value="UX">UX</option>
          <option value="motion">MOTION DESIGN</option>
          <option value="filmmaking">{isFrench ? 'FILMMAKING' : 'RÉALISATION'}</option>
          <option value="photography">{isFrench ? 'PHOTOGRAPHY' : 'PHOTOGRAPHIE'}</option>
          <option value="both">{isFrench ? 'LES DEUX' : 'BOTH'}</option>
          <option value="other">{isFrench ? 'AUTRE' : 'OTHER'}</option>
        </Input>
        <Input
          ref={inputsRef.message}
          name="message"
          type="textarea"
          value={formValues.message}
          placeholder={
            isFrench
              ? 'Décrivez votre projet en quelques mots'
              : 'Describe your project in a few words'
          }
          onBlur={(e) => validateField('message', e.target.value)}
          onChange={(e) => handleFieldChange('message', e.target.value)}
        />
        <Button className="w-fit" disabled={formState === FORM_STATE.LOADING} type="submit">
          <span ref={buttonRef} className="inline-block">
            {getButtonText()}
          </span>
        </Button>
      </form>
    </>
  );
};

export default ContactForm;
