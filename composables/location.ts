import type { Ref } from 'vue';
import type { IpApiResponse, VercelApiResponse } from '@/types';

export const useLocation = async (): Promise<{
  location: Ref<IpApiResponse | VercelApiResponse>;
  error: string;
  message: Ref<string>;
}> => {
  let location: Ref<IpApiResponse | VercelApiResponse> = ref();

  const message = ref('Application running (server-side) from:');

  try {
    const info = await globalThis.$fetch<VercelApiResponse>(
      '/api/vercelLocation',
      {
        headers: useRequestHeaders(['x-forwarded-for', 'x-vercel-ip-city']),
      }
    );

    if (info.ip === '-') {
      throw new Error("Can't connect with Vercel Network");
    }

    location.value = info;
    message.value = `Hello from Vercel Edge`;
  } catch (_e) {
    try {
      location.value = await globalThis.$fetch(`/api/location`);
    } catch (error) {
      console.log(error);
      message.value = `Edge server failed`;
      return { location: null, error, message };
    }
  }

  return { location, error: null, message };
};
