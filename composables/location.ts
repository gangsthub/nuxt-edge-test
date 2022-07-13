import type { Ref } from 'vue';
import type { IpApiResponse } from '@/types';

export const useLocation = () => {
  const location: Ref<IpApiResponse> = ref();

  watchEffect(async () => {
    location.value = await $fetch(`/api/location`);
  });

  return location;
};
