import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { isEmail, isPhone } from '@/utils';
import { submitContactForm } from '@/services/contact.services';
import { FORM_STATE } from '@/types/form.type';

export const useContactForm = (isFrench: boolean) => {
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

  const handleFieldChange = (name: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));

    if (name === 'email') {
      if (!value.trim()) {
        validateField('email', value);
      } else {
        if (
          formErrors.email === (isFrench ? errorMessages.required.fr : errorMessages.required.en)
        ) {
          setFormErrors((prev) => ({ ...prev, email: '' }));
        }
        if (isEmail(value) && formErrors.email) {
          setFormErrors((prev) => ({ ...prev, email: '' }));
        }
      }
    } else if (name === 'phone') {
      if (value.trim() && isPhone(value) && formErrors.phone) {
        setFormErrors((prev) => ({ ...prev, phone: '' }));
      }
    } else {
      validateField(name, value);
    }
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
    onMutate: () => setFormState(FORM_STATE.LOADING),
    onError: (error) => {
      setFormState(FORM_STATE.ERROR);
      console.error('onError', error);
    },
    onSuccess: () => {
      resetForm();
      setFormState(FORM_STATE.SUCCESS);
    },
  });

  const getButtonText = () => {
    if (formState === FORM_STATE.LOADING) return isFrench ? 'Envoi en cours...' : 'Sending...';
    if (formState === FORM_STATE.SUCCESS) return isFrench ? 'Envoyé !' : 'Sent!';
    return isFrench ? 'Envoyer' : 'Send';
  };

  return {
    formState,
    formValues,
    formErrors,
    validateField,
    handleFieldChange,
    submitFormMutation,
    getButtonText,
  };
};
