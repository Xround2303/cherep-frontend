import { useToast } from "primevue/usetoast";
import * as Type from "./notification.types";
import { ToastServiceMethods } from "primevue/toastservice";
import { useLogs } from "../useLogs";

function optionsFactory(options: Type.NotifyOptions = {}): Type.NotifyOptions {
  return {
    life: 3000,
    throwParseError: true,
    ...options,
  };
}

export class NotificationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotificationError";
  }
}

type ISuccessMessage =
  | Type.Alert
  | string
  | Type.DuckTypeAlert
  | Type.DuckTypeMessage;
type IErrorMessage =
  | Type.DuckTypeErrorsArray
  | Type.DuckTypeAxiosErrorMessage
  | Type.DuckTypeAxiosErrorProperty
  | string;
export function useNotification(toastInstance?: ToastServiceMethods) {
  const toast = toastInstance ?? useToast();
  function success(message: ISuccessMessage, options?: Type.NotifyOptions) {
    const localOptions = Object.assign(
      optionsFactory({
        severity: "success",
      }),
      options ?? {},
    );
    let resolved = false;
    if (typeof message === "string") {
      resolved = true;
      localOptions.detail = message;
    } else if (Type.isAxiosAlert(message)) {
      resolved = true;
      localOptions.detail = message.data.alert;
    } else if (Type.isAxiosMessage(message)) {
      resolved = true;
      localOptions.detail = message.data.message;
    } else if (Type.isAlert(message)) {
      resolved = true;
      localOptions.detail = message.alert;
    }
    if (localOptions.throwParseError && !resolved) {
      throw new NotificationError(
        `
         message ${JSON.stringify(message)}`,
      );
    }
    useLogs().debug("send success notification", localOptions);
    toast.add(localOptions);
  }

  function error(message: IErrorMessage, options?: Type.NotifyOptions) {
    const localOptions = Object.assign(
      optionsFactory({
        severity: "error",
      }),
      options ?? {},
    );
    let resolved = false;
    if (typeof message === "string") {
      resolved = true;
      localOptions.detail = message;
    } else if (Type.isErrorsArray(message)) {
      resolved = true;
      localOptions.detail = Object.values(message.response.data.errors)
        .reduce((prev, current) => {
          const str = current.at(0);
          if (str) {
            prev.push(str);
          }
          return prev;
        }, [])
        .join("\n");
    } else if (Type.isAxiosErrorMessage(message)) {
      resolved = true;
      localOptions.detail = message.response.data.message;
    }
    if (localOptions.throwParseError && !resolved) {
      throw new NotificationError(
        `Error recognizing message ${JSON.stringify(message)}`,
      );
    }
    toast.add(localOptions);
  }

  function message(message: Type.NotifyOptions) {
    useLogs().debug("send notification:", message);
    toast.add(message);
  }

  return {
    success,
    error,
    message,
  };
}
