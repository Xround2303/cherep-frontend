export enum LogLevel {
  None,
  Info,
  Debug,
  Warning,
  Critical,
}

export interface EnvProperties extends ImportMetaEnv {}

const Option: EnvProperties = import.meta.env;

export function env<T>(key: string | number): T | undefined {
  return Option[key] as T | undefined;
}

export function provideEnv(options: Record<string | number, unknown>) {
  Object.assign(Option, options);
}

export const VITE_APP_NAME = "VITE_APP_NAME";

export const VITE_APP_LOG_LEVEL = "VITE_APP_LOG_LEVEL";
