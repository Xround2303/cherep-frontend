import { env, VITE_APP_LOG_LEVEL, VITE_APP_NAME } from "./useEnv";

export enum LogLevel {
  None,
  Info,
  Debug,
  Warning,
  Critical,
}
function getLogLevel() {
  const level = env<string>(VITE_APP_LOG_LEVEL);
  if (!level) {
    return LogLevel.None;
  }
  const levelName = level.charAt(0).toUpperCase() + level.substring(1);

  return Object.hasOwn(LogLevel, levelName)
    ? LogLevel[levelName as keyof typeof LogLevel]
    : LogLevel.None;
}

const appName = () => env(VITE_APP_NAME) ?? "Application";
export function useLogs() {
  function info(...args: unknown[]) {
    if (getLogLevel() >= LogLevel.Info) {
      requestAnimationFrame(() => {
        console.debug(
          `[${appName()} Log] %cInfo%c`,
          "color:#0F7FFF;font-weight: 700",
          "color: black",
          ...args,
        );
      });
    }
  }

  function debug(...args: unknown[]) {
    if (getLogLevel() >= LogLevel.Debug) {
      requestAnimationFrame(() => {
        console.debug(
          `[${appName()} Log] %cDebug%c`,
          "color: green;font-weight: 700",
          "color: black",
          ...args,
        );
      });
    }
  }

  function warning(...args: unknown[]) {
    if (getLogLevel() >= LogLevel.Warning) {
      requestAnimationFrame(() =>
        console.debug(
          `[${appName()} Log] %Warning%c`,
          "color: #FF9800;font-weight: 700",
          "color: black",
          ...args,
        ),
      );
    }
  }

  function critical(...args: unknown[]) {
    if (getLogLevel() >= LogLevel.Critical) {
      requestAnimationFrame(() =>
        console.debug(
          `[${appName()} Log] %cCritical%c`,
          "color: #FF4F44;font-weight: 700",
          "color: black",
          ...args,
        ),
      );
    }
  }
  return {
    info,
    critical,
    debug,
    warning,
  };
}
