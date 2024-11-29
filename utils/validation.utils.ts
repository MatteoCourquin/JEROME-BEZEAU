export const isEmail = (email: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const isPhone = (phone: string): boolean => {
  if (!phone) return false;

  const cleanedNumber = phone.trim().replace(/[^\d+]/g, '');

  const frenchRegex = /^(?:0[1-9]|(?:\+33|0033)[1-9])(?:\d{8})$/;

  const internationalRegex = /^(?:\+|00)[1-9]\d{0,3}\d{6,12}$/;

  return frenchRegex.test(cleanedNumber) || internationalRegex.test(cleanedNumber);
};
