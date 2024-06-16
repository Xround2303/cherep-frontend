import { useContextManager } from "@/plugins/contextManager";
import useNotificationStore from "@/store/notifications";
import { useLogs } from "@/use/useLogs";
import { useNotification } from "@/use/useNotification";
import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
export const requestBefore = function (
  config: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig {
  const router = useContextManager().router();
  const route = router.currentRoute.value;

  config.headers.ClientModuleName = route.name || route.path;
  return config;
};

export const requestError = function (error: any): Promise<any> {
  // ¯\_(ツ)_/¯
  return Promise.reject(error);
};

export const responseSuccess = function (
  response: AxiosResponse,
): AxiosResponse {
  return response;
};

export const responseError = function (error: {
  response: AxiosResponse;
}): Promise<{ response: AxiosResponse }> {
  if (axios.isCancel(error)) {
    return Promise.reject(error);
  }

  const { error: showError } = useNotification(useContextManager().toast());
  const notificationDelay = 10000;
  const { response } = error;

  switch (response?.status || 0) {
    // Ошибки валидации Laravel код 422
    case 422:
      useLogs().debug("[Axios]: Interceptor failed with 422", response);
      // @ts-expect-error typings issue
      showError(response);
      break;

    // Ничего не делаем если получили Unauthorized
    // Управление схватит refreshAuthLogic; разберётся или навалит собственные уведомления.
    case 401:
      useLogs().debug("[Axios]: Interceptor failed with 411", response);
      break;

    default:
      useLogs().debug("[Axios]: Interceptor failed", response);
      // @ts-expect-error typings issue
      showError(response, { life: notificationDelay });
      break;
  }

  return Promise.reject(error);
};
