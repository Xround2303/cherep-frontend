import { ToastMessageOptions } from "primevue/toast";
import { hasProperty, isObject } from "../useTypeGuards";
export type NotifyOptions = ToastMessageOptions & {
  throwParseError?: boolean;
};

export type DuckTypeAxiosResponse<T> = { data: T };
export type DuckTypeAxiosError<T = { [key: string]: unknown }> = {
  response: DuckTypeAxiosResponse<T>;
};

export type DuckTypeAlert = DuckTypeAxiosResponse<{ alert: string }>;
export type DuckTypeMessage = DuckTypeAxiosResponse<{ message: string }>;
export type Alert = { alert: string };
export type DuckTypeErrorsArray = DuckTypeAxiosError<{
  errors: { [key: string]: string[] };
}>;
export type DuckTypeAxiosErrorMessage = DuckTypeAxiosError<{ message: string }>;
export type DuckTypeAxiosErrorProperty = DuckTypeAxiosError<
  DuckTypeAxiosResponse<{ error: string }>
>;

export function isAxiosAlert(obj: unknown): obj is DuckTypeAlert {
  return (
    isObject(obj) &&
    hasProperty(obj, "data") &&
    isObject(obj.data) &&
    hasProperty(obj.data, "alert") &&
    typeof obj.data.alert === "string"
  );
}
export function isAxiosMessage(obj: unknown): obj is DuckTypeMessage {
  return (
    isObject(obj) &&
    hasProperty(obj, "data") &&
    isObject(obj.data) &&
    hasProperty(obj.data, "message") &&
    typeof obj.data.message === "string"
  );
}
export function isAlert(obj: unknown): obj is Alert {
  return (
    isObject(obj) && hasProperty(obj, "alert") && typeof obj.alert === "string"
  );
}

export function isAxiosResponseError(a: unknown): a is DuckTypeAxiosError {
  return isObject(a) && hasProperty(a, "response") && isObject(a.response);
}

export function isErrorsArray(a: unknown): a is DuckTypeErrorsArray {
  return (
    isAxiosResponseError(a) &&
    hasProperty(a.response.data, "errors") &&
    isObject(a.response.data.errors)
  );
}

export function isAxiosErrorMessage(
  a: unknown,
): a is DuckTypeAxiosErrorMessage {
  return isAxiosResponseError(a) && typeof a.response.data.message === "string";
}
