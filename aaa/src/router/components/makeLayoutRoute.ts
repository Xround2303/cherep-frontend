import { RouteRecordRaw } from "vue-router"
import authenticated from "../middleware/authTrueMiddleware"
import activated from "../middleware/activeTrueMiddleware"
import redirectToFav from "../middleware/redirectFavMiddleware"
import Layout from "@/pages/Layout.vue"

const LayoutTerm = 'Layout';

// Основной макет вебки (первый уровень), который должен содержать внутри себя
// все маршруты приложения (второго уровня)
export default (children: RouteRecordRaw[]) => ({
  path: "/",
  name: LayoutTerm,
  component: Layout,
  meta: {
      middleware: [authenticated, activated, redirectToFav],
      title: "Администрирование"
  },
  children,
});
