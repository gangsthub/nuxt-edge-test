export default defineEventHandler(async () => {
  try {
    const data = await $fetch(
      'https://pro.ip-api.com/json/?key=AmUN9xAaQALVYu6'
    );
    return data;
  } catch (error) {
    console.log(error);
  }
});
