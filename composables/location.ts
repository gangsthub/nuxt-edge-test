import type { Ref } from 'vue';
import type { IpApiResponse } from '@/types';

export const useLocation = () => {
  const location: Ref<IpApiResponse> = ref();

  watchEffect(async () => {
    location.value = await globalThis.$fetch(`/api/location`);
  });

  return location;
};
