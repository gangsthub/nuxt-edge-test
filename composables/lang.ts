export const useLang = () => {
  if (process.client) {
    return ref(navigator.language);
  }

  function parseLangString(languages) {
    return languages.split(',')[0];
  }
  const nuxt = useNuxtApp();
  const lang = parseLangString(
    nuxt.ssrContext.event.req.headers['accept-language']
  );
  return ref(lang);
};
