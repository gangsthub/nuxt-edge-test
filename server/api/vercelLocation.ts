import { IpApiResponse, VercelApiResponse } from '~~/types';

export default eventHandler(async (event) => {
  const key = useRuntimeConfig().API_TOKEN;
  // https://github.com/pi0/nuxt-on-the-edge/blob/main/server/api/info.ts
  // https://vercel.com/changelog/ip-geolocation-for-serverless-functions
  const cityHeader = event.req.headers['x-vercel-ip-city'] as string;
  const city = cityHeader ? decodeURIComponent(cityHeader) : '-';
  const ipHeader = event.req.headers['x-forwarded-for'] as string;
  const ip = ipHeader ? ipHeader.split(',')[0] : '-';

  const { lat, lon } = await globalThis.$fetch<IpApiResponse>(
    `https://pro.ip-api.com/json/${ip}?key=${key}&fields=lat,lon`
  );

  return {
    city,
    ip,
    lat,
    lon,
  } as VercelApiResponse;
});
