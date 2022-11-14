/* eslint-disable import/prefer-default-export */
export const formatDate = (date) => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const newDate = new Date(date);
  return newDate.toLocaleDateString('fr-FR', options);
};
