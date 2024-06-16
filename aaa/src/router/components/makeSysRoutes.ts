import { RouteRecordRaw } from "vue-router";
// Перехватчики middleware
import notAuthenticated from "../middleware/authFalseMiddleware";
import authenticated from "../middleware/authTrueMiddleware";
import notActivated from "../middleware/activeFalseMiddleware";
import log from "../middleware/logMiddleware";
// Компоненты
import Login from "@/pages/Auth/Login.vue";
import LoginAd from "@/pages/Auth/LoginAd.vue";
import ChangePassword from "@/pages/Auth/ChangePassword.vue";

// Системные маршруты (первого уровня) — всё что выходит за рамки основного макета
export default (excludeRoutes: string[] = []): RouteRecordRaw[] => ([
  // Вход в систему под локальным пользователем
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { middleware: [notAuthenticated] },
  },
  // Вход в систему под доменным пользователем (Active Directory)
  {
    path: "/login-ad",
    component: LoginAd,
    name: "LoginAd",
    meta: { middleware: [notAuthenticated] },
  },
  // Принудительная смена пароля (если только что создан или пришло время менять)
  {
    path: "/change-password",
    component: ChangePassword,
    name: "ChangePassword",
    meta: { middleware: [authenticated, notActivated] },
  },
  // Переадресация со всех неизвестных системе маршрутов
  {
    path: "/:pathMatch(.*)",
    redirect: { name: "Layout" },
    meta: { middleware: [log] },
  } as RouteRecordRaw
].filter(item => !excludeRoutes.includes(String(item.name || ""))));
