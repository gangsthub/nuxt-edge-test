export default defineEventHandler(async () => {
  try {
    const key = process.env.API_TOKEN;
    const data = await $fetch(`https://pro.ip-api.com/json/?key=${key}`);
    return data;
  } catch (error) {
    console.log(error);
  }
});
