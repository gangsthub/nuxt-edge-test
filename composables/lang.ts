export const useLang = () => {
  if (process.client) {
    return ref(navigator.language);
  }
  return ref('');
};
