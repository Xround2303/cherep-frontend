import { RouteLocationNormalized, RouteRecordNormalized } from "vue-router";
import { MiddlewareContext, MiddlewareList, MiddlewareReturn } from "../router.d";
import useEnvStore from "@/store/env";

// Итератор по набору middleware, сделанный в рекурсивном стиле
const _middlewarePipeline = async (context: MiddlewareContext, middleware: MiddlewareList, index: number): MiddlewareReturn =>
{
  const nextMiddleware = middleware[index];
  if (!nextMiddleware) {
    return true;
  }

  const mResult = await nextMiddleware(context.to, context.from);
  
  if (mResult === true) {
    return await _middlewarePipeline(context, middleware, index + 1);
  } else {
    return mResult;
  }
};

// Выбрать все middleware из списка дерева подходящих маршрутов
const _fetchMiddleware = (records: RouteRecordNormalized[]): MiddlewareList =>
{
  return records.reduce((list: MiddlewareList, record: RouteRecordNormalized) => {
    list.push(...record.meta?.middleware || []);
    return list;
  }, []);
};

// Функция для прогона всех Middleware маршрута
export default () => {
  return async (to: RouteLocationNormalized, from: RouteLocationNormalized) => {

    console.debug(`enter middleware cycle for ${String(to.name)}`);

    // Здесь исполняется "базовое" middleware которое решил не выносить
    // Без предварительного запроса к /env вебка не должна работать в принципе
    const envStore = useEnvStore();
    console.debug("dispatch init");
    await envStore.dispatchInit();
  
    // Список всех middleware этого маршрута
    const routeMiddleware = _fetchMiddleware(to.matched);
    const context = { to, from };

   return await _middlewarePipeline(context, routeMiddleware, 0);
  };
};
