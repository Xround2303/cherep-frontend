// Импорт модулей данного объекта
import makeOptions from "./components/makeOptions";
import makeMiddleware from "./components/makeMiddleware";
import makeLayoutRoute from "./components/makeLayoutRoute";
import makeSysRoutes from "./components/makeSysRoutes";
import makeAppRoutes from "./components/makeAppRoutes";
import { MiddlewareList } from "./router.d";

// Переписываем определение RouteMeta внутри vue-router (выглядит как костыль, но это по официальной инструкции router)
declare module "vue-router" {
  interface RouteMeta {

    // Список функций-защитников маршрута (middleware), исполняемых в порядке очередности в массиве
    // Именно здесь реализуем проверку аутентификации, проверку авторизации, переадресацию на любимые страницы и т.п.
    middleware?: MiddlewareList

    // Ссылка на справку (не обязательна)
    nameHelpHref?: string
  }
}

// Собираем солянку из модулей
export default () => {
  return {
    makeOptions,
    makeMiddleware,
    makeLayoutRoute,
    makeSysRoutes,
    makeAppRoutes,
  };
};
