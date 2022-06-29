export default defineEventHandler(async () => {
  const key = useRuntimeConfig().API_TOKEN;
  const data = await $fetch(`https://pro.ip-api.com/json/?key=${key}`);
  return data;
});
