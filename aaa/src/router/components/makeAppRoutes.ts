import { RouteRecordRaw } from "vue-router";
// Перехватчики middleware
import access from "../middleware/accessMiddleware";
// Компоненты
import Profile from "@/pages/Profile/index.vue";
import Users from "@/pages/Users/UserTables.vue";
import Roles from "@/pages/Roles/index.vue";
import HistoryActions from "@/pages/HistoryActions/index.vue";
import Sessions from "@/pages/Sessions/index.vue";
import Blank from "@/pages/CrossPages/Blank.vue";
import AccessDenied from "@/pages/CrossPages/AccessDenied.vue";

// Маршруты уровня приложения (второго уровня) — всё что лежит внутри основного макета
export default (excludeRoutes: string[] = []): RouteRecordRaw[] => ([
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: {
        middleware: [access("Profile", "view")],
        title: "Профиль"
    }
  },
  {
    path: "/users",
    name: "Users",
    component: Users,
    meta: {
        middleware: [access("Users", "view")],
        title: "Пользователи"
    }
  },
  {
    path: "/roles",
    name: "Roles",
    component: Roles,
    meta: {
        middleware: [access("Roles", "view")],
        title: "Роли"
    }
  },
  {
    path: "/history-actions",
    name: "HistoryActions",
    component: HistoryActions,
    meta: {
        middleware: [access("HistoryActions", "view")],
        title: "История действий"
    }
  },
  {
    path: "/sessions",
    name: "Sessions",
    component: Sessions,
    meta: {
        middleware: [access("Sessions", "view")],
        title: "Сессии"
    }
  },
  {
    path: "/blank",
    name: "Blank",
    component: Blank,
  },
  {
    path: "/access-denied",
    name: "AccessDenied",
    component: AccessDenied,
  },

].filter(item => !excludeRoutes.includes(String(item.name || ""))));
