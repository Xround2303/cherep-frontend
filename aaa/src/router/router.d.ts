import { RouteLocationNormalized, RouteLocationRaw } from "vue-router"

// Список параметров которые передаются на вход каждому перехватчику в массиве middleware
export type MiddlewareContext = {
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
}

// Возвращаемое значение из middleware (ошибка или новый маршрут или
// true - идти по middleware дальше, или false - закончить набор middleware)
export type MiddlewareReturn = Promise<Error | RouteLocationRaw | boolean>

// Перехватчик middleware
export interface MiddlewareDefinition {
  (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
  ): MiddlewareReturn
}

// Список перехватчиков
export type MiddlewareList = Array<MiddlewareDefinition>
