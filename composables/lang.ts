import type { Ref } from 'vue';

export const useLang: () => Ref<string> = () => {
  if (process.client) {
    return ref(navigator.language);
  }

  const parseLangString: (languages: string) => string = (languages) => {
    return languages.split(',')[0];
  };
  const nuxt = useNuxtApp();
  const lang: string = parseLangString(
    nuxt.ssrContext.event.req.headers['accept-language']
  );
  return ref(lang);
};
