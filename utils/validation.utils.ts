export const isEmail = (email: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const isPhone = (phone: string): boolean => {
  const cleanedNumber = phone.trim().replace(/[^\d+\s]/g, '');
  return /^\+?\s*\d[\d\s]{7,14}$/.test(cleanedNumber);
};
