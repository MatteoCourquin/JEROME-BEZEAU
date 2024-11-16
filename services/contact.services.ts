import { ContactData } from '@/types';
import { EmailJSResponseStatus, send } from '@emailjs/browser';

export const submitContactForm = async (data: ContactData): Promise<EmailJSResponseStatus> => {
  if (
    !process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ||
    !process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ||
    !process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
  ) {
    console.error('EmailJS is not configured properly');
    throw new Error('EmailJS configuration missing');
  }

  try {
    const response = await send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
      data,
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
    );

    console.info('SUCCESS', response.status, response.text);
    return response;
  } catch (error) {
    console.error('FAILED', error);
    throw error;
  }
};
