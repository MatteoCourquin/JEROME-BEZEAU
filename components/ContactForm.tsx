import { useLanguage } from '@/providers/language.provider';
import { isEmail, isPhone } from '@/utils';
import { useState } from 'react';
import Button from './atoms/Button';
import Input from './atoms/Input';
import { useMutation } from '@tanstack/react-query';
import { submitContactForm } from '@/services/contact.services';

enum FORM_STATE {
  DEFAULT = 'DEFAULT',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

const ContactForm = () => {
  const { isFrench } = useLanguage();

  const [formState, setFormState] = useState<FORM_STATE>(FORM_STATE.DEFAULT);
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'default',
    message: '',
  });
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const errorMessages = {
    required: {
      fr: 'Ce champ est requis',
      en: 'This field is required',
    },
    email: {
      fr: 'Adresse email invalide',
      en: 'Invalid email address',
    },
    phone: {
      fr: 'Numéro de téléphone invalide',
      en: 'Invalid phone number',
    },
  };

  const validateField = (name: string, value: string) => {
    let error = '';

    switch (name) {
      case 'name':
        if (!value.trim()) {
          error = isFrench ? errorMessages.required.fr : errorMessages.required.en;
        }
        break;

      case 'email':
        if (!value.trim()) {
          error = isFrench ? errorMessages.required.fr : errorMessages.required.en;
        } else if (!isEmail(value)) {
          error = isFrench ? errorMessages.email.fr : errorMessages.email.en;
        }
        break;

      case 'phone':
        if (value.trim() && !isPhone(value)) {
          error = isFrench ? errorMessages.phone.fr : errorMessages.phone.en;
        }
        break;
    }

    setFormErrors((prev) => ({ ...prev, [name]: error }));
    return error === '';
  };

  const validateOnBlur = (name: string, value: string) => {
    let error = '';

    switch (name) {
      case 'email':
        if (!value.trim()) {
          error = isFrench ? errorMessages.required.fr : errorMessages.required.en;
        } else if (!isEmail(value)) {
          error = isFrench ? errorMessages.email.fr : errorMessages.email.en;
        }
        break;

      case 'phone':
        if (value.trim() && !isPhone(value)) {
          error = isFrench ? errorMessages.phone.fr : errorMessages.phone.en;
        }
        break;

      default:
        return validateField(name, value);
    }

    setFormErrors((prev) => ({ ...prev, [name]: error }));
    return error === '';
  };

  const getButtonText = () => {
    if (formState === FORM_STATE.LOADING) {
      return isFrench ? 'Envoi en cours...' : 'Sending...';
    }

    if (formState === FORM_STATE.SUCCESS) {
      return isFrench ? 'Envoyé !' : 'Sent!';
    }

    return isFrench ? 'Envoyer' : 'Send';
  };

  const resetForm = () => {
    setFormValues({
      name: '',
      email: '',
      phone: '',
      subject: 'default',
      message: '',
    });
    setFormErrors({
      name: '',
      email: '',
      phone: '',
    });
    setFormState(FORM_STATE.DEFAULT);
  };

  const submitFormMutation = useMutation({
    mutationFn: submitContactForm,
    onMutate: () => {
      setFormState(FORM_STATE.LOADING);
    },
    onError: (error) => {
      setFormState(FORM_STATE.ERROR);
      console.error('onError', error);
    },
    onSuccess: () => {
      resetForm();
      setFormState(FORM_STATE.SUCCESS);
    },
  });

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationResults = Object.entries(formValues).map(([key, value]) =>
      validateField(key, value),
    );

    const isValid = validationResults.every((result) => result === true);

    if (!isValid) {
      return;
    }

    submitFormMutation.mutate(formValues);
  };

  return (
    <form className="flex flex-col gap-10 pt-10" onSubmit={handleFormSubmit}>
      <Input
        errorMessage={formErrors.name}
        name="name"
        placeholder={isFrench ? 'Clara Dupont' : 'John Doe'}
        type="text"
        value={formValues.name}
        onBlur={(e) => validateField('name', e.target.value)}
        onChange={(e) => {
          setFormValues({ ...formValues, name: e.target.value });
          validateField('name', e.target.value);
        }}
      />
      <Input
        errorMessage={formErrors.email}
        name="email"
        placeholder={isFrench ? 'clara.dupont@gmail.com' : 'john.doe@gmail.com'}
        type="email"
        value={formValues.email}
        onBlur={(e) => validateOnBlur('email', e.target.value)}
        onChange={(e) => {
          const { value } = e.target;
          setFormValues({ ...formValues, email: value });

          if (!value.trim()) {
            validateField('email', value);
          } else {
            if (
              formErrors.email ===
              (isFrench ? errorMessages.required.fr : errorMessages.required.en)
            ) {
              setFormErrors({ ...formErrors, email: '' });
            }
            if (isEmail(value) && formErrors.email) {
              setFormErrors({ ...formErrors, email: '' });
            }
          }
        }}
      />
      <Input
        errorMessage={formErrors.phone}
        name="phone"
        placeholder={isFrench ? '06 78 90 12 34' : '+1 234 567 8900'}
        type="tel"
        value={formValues.phone}
        onBlur={(e) => validateOnBlur('phone', e.target.value)}
        onChange={(e) => {
          const { value } = e.target;
          setFormValues({ ...formValues, phone: value });

          if (value.trim() && isPhone(value) && formErrors.phone) {
            setFormErrors({ ...formErrors, phone: '' });
          }
        }}
      />
      <Input
        name="subject"
        placeholder={isFrench ? 'Que recherchez-vous ?' : 'What are you looking for?'}
        type="select"
        value={formValues.subject}
        onBlur={(e) => validateField('subject', e.target.value)}
        onChange={(e) => {
          setFormValues({ ...formValues, subject: e.target.value });
          validateField('subject', e.target.value);
        }}
      >
        <option value="default">{isFrench ? 'Sélectionnez une option' : 'Select an option'}</option>
        <option value="design">Design</option>
        <option value="development">{isFrench ? 'Développement' : 'Development'}</option>
        <option value="both">{isFrench ? 'Les deux' : 'Both'}</option>
        <option value="other">{isFrench ? 'Autre' : 'Other'}</option>
      </Input>
      <Input
        name="message"
        type="textarea"
        value={formValues.message}
        placeholder={
          isFrench
            ? 'Décrivez votre projet en quelques mots'
            : 'Describe your project in a few words'
        }
        onBlur={(e) => validateField('message', e.target.value)}
        onChange={(e) => {
          setFormValues({ ...formValues, message: e.target.value });
          validateField('message', e.target.value);
        }}
      />
      <Button className="w-fit" disabled={formState === FORM_STATE.LOADING} type="submit">
        {getButtonText()}
      </Button>
    </form>
  );
};

export default ContactForm;
