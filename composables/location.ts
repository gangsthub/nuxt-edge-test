import { useContext } from 'unctx';

export const useLocation = () => {
  const location = ref();
  onMounted(async () => {
    const data = await $fetch(
      `https://pro.ip-api.com/json/?key=AmUN9xAaQALVYu6`
    );

    location.value = data;
  });
  return location;
};
