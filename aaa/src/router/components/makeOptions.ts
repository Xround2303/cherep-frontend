import { RouteLocationNormalized } from "vue-router";

// Базовый конфиг роутера
export default () => ({
  base: process.env.VUE_APP_CLI_PUBLIC_PATH || undefined,

  // При переходе скролить на верх страницы или к Хэшу / ID
  scrollBehavior(to: RouteLocationNormalized) {
    if (to.hash) {
      return { selector: to.hash };
    }
    return { x: 0, y: 0 };
  },
});
