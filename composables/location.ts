export const useLocation = () => {
  const location = ref();
  watchEffect(async () => {
    location.value = await $fetch(`/api/location`);
  });
  return location;
};
