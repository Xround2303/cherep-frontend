import { AxiosInstance } from "axios";
import { Router } from "vue-router";
import { useAxiosFactory } from "./axios";
import { I18n } from "vue-i18n";
import { ToastServiceMethods } from "primevue/toastservice";

export const useContextManager = (function () {
  type TInstanceStorage = {
    router: Router | null;
    i18n: I18n | null;
    axios: {
      def: AxiosInstance | null;
      withoutAuth: AxiosInstance | null;
      basicAuth: AxiosInstance | null;
    };
    toast: ToastServiceMethods | null;
  };

  const instanceStorage: TInstanceStorage = {
    router: null,
    i18n: null,
    axios: {
      def: null,
      withoutAuth: null,
      basicAuth: null,
    },
    toast: null,
  };

  const setupRouterInstance = (router: Router) => {
    instanceStorage.router = router;
  };

  const setupI18nInstance = (i18n: I18n) => {
    instanceStorage.i18n = i18n;
  };

  const setupToastInstance = (toast: ToastServiceMethods) => {
    instanceStorage.toast = toast;
  };

  const setupAxiosInstance = (apiUrl: string, apiProto: string) => {
    const axiosFactory = useAxiosFactory(apiUrl, apiProto);
    instanceStorage.axios.def = axiosFactory.createDef();
    instanceStorage.axios.withoutAuth = axiosFactory.createWithoutAuth();
    instanceStorage.axios.basicAuth = axiosFactory.createBasicAuth();
  };

  const router = (): Router => {
    if (instanceStorage.router === null) {
      throw new Error("Router is not set up in UI-KIT context manager!");
    }
    return instanceStorage.router;
  };

  const toast = () => {
    if (instanceStorage.toast === null) {
      throw new Error("Toast is not set up in UI-KIT context manager!");
    }
    return instanceStorage.toast;
  };

  const i18n = (): I18n => {
    if (instanceStorage.i18n === null) {
      throw new Error("I18n is not set up in UI-KIT context manager!");
    }
    return instanceStorage.i18n;
  };

  const axios = (): AxiosInstance => {
    if (instanceStorage.axios.def === null) {
      throw new Error("Axios default is not set up in UI-KIT context manager!");
    }
    return instanceStorage.axios.def;
  };

  const axiosWithoutAuth = (): AxiosInstance => {
    if (instanceStorage.axios.withoutAuth === null) {
      throw new Error(
        "Axios withoutAuth is not set up in UI-KIT context manager!",
      );
    }
    return instanceStorage.axios.withoutAuth;
  };

  const axiosBasicAuth = (): AxiosInstance => {
    if (instanceStorage.axios.basicAuth === null) {
      throw new Error(
        "Axios basicAuth is not set up in UI-KIT context manager!",
      );
    }
    return instanceStorage.axios.basicAuth;
  };

  return () => ({
    setupRouterInstance,
    setupI18nInstance,
    setupAxiosInstance,
    setupToastInstance,
    router,
    i18n,
    axios,
    toast,
    axiosWithoutAuth,
    axiosBasicAuth,
  });
})();
