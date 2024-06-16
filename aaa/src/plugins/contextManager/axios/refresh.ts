import { useContextManager } from "@/plugins/contextManager";
import useAuthStore from "@/store/auth";
import useNotificationStore from "@/store/notifications";
import { useLogs } from "@/use/useLogs";
import { useNotification } from "@/use/useNotification";
import { AxiosResponse } from "axios";

// Когда перезайти не получилось, запускаем последовательность принудительного выхода
const revokeAuth = async (error: { response: AxiosResponse }) => {
  const notificationDelay = 10000;
  const router = useContextManager().router();
  const authStore = useAuthStore();
  const notificationStore = useNotificationStore();
  const { response } = error;

  // Выход
  await authStore.dispatchLogout();

  // Переходим на страницу Login
  router.push({ name: "Login", query: { returnUrl: window.location.href } });

  useLogs().debug("[Refresh.ts]: failed revoke auth", response);
  // @ts-expect-error Показываем ошибку
  useNotification(useContextManager().toast()).error(response);

  // Вываливаем отказ дальше
  return Promise.reject(error);
};

// Перехватчик для ошибок авторизации для обновления токена в инстанс axios
export default async () => {
  const authStore = useAuthStore();
  await authStore
    .dispatchRefreshToken() // Пробуем перезайти с обновлением токена
    .catch(revokeAuth); // ничего не получилось, отбираем права и выходим

  // Закрываем ошибку
  return Promise.resolve();
};
