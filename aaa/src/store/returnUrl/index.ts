import { defineStore } from "pinia"
import { ref, Ref } from "vue"

type TReturnUrlStateData = { returnUrl: string }

export default defineStore('returnUrlStore', () => {

  const state: Ref<TReturnUrlStateData> = ref({
    returnUrl: '',
  });

  const getReturnUrl = () => state.value.returnUrl;
  const setReturnUrl = (returnUrl: string) => {
    state.value.returnUrl = returnUrl
  };

  return {
    getReturnUrl,
    setReturnUrl
  }
})
