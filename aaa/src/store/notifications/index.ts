import { defineStore } from "pinia";
import { AxiosResponse } from "axios";
import { useNotification } from "@/use/useNotification";

//const toast = useNotification();

export default defineStore("notificationsStore", () => {
  const showNotification = (response: AxiosResponse, delay?: number): void => {
    // show common notification
    const { data } = response;
    console.log(JSON.stringify(response))
    //toast.message(data.message);
  };
  const showValidationError = (
    response: AxiosResponse,
    delay?: number,
  ): void => {
    // show validation error
    const { data } = response;
    console.log(JSON.stringify(response))
    //toast.error(data.message);
  };

  return {
    showNotification,
    showValidationError,
  };
});
