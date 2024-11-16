export const formatDateToYear = (date: string | Date): number => {
  const dateObject = date instanceof Date ? date : new Date(date);
  return dateObject.getFullYear();
};
