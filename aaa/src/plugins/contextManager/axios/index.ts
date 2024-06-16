import axios, { AxiosInstance } from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import refreshAuthLogic from "./refresh";
import {
  requestBefore,
  requestError,
  responseSuccess,
  responseError,
} from "./interceptors";

export const useAxiosFactory = (apiUrl: string, apiProto: string) =>
{
  const baseOptions = {
    baseURL: apiUrl,
    withCredentials: true,
    withXSRFToken: true,
    xsrfHeaderName: `X-CSRF-TOKEN-${apiProto}`,
    xsrfCookieName: `XSRF-TOKEN-${apiProto}`,
  };

  const createDef = (): AxiosInstance => {
    const instance = axios.create(baseOptions);

    // Перехватчик для переавторизации по refresh token
    createAuthRefreshInterceptor(instance, refreshAuthLogic, {
      pauseInstanceWhileRefreshing: false,
      statusCodes: [401],
    });

    // Перехватчики запроса
    instance.interceptors.request.use(requestBefore, requestError);

    // Перехватчики ответа
    instance.interceptors.response.use(responseSuccess, responseError);

    return instance;
  };

  const createWithoutAuth = (): AxiosInstance => {
    return axios.create(baseOptions);
  };

  const createBasicAuth = (): AxiosInstance => {
    return axios.create({
      ...baseOptions,
      withCredentials: false,
      withXSRFToken: false,
    });
  };

  return {
    createDef,
    createWithoutAuth,
    createBasicAuth
  };
};
