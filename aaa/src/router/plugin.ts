import {createRouter, createWebHistory, RouteLocationNormalizedLoaded} from "vue-router";
import SvUseRouter from "./index";
import {Ref} from "vue";
import makeAppRoutes from "@/router/components/makeAppRoutes";

// Функции чтобы использовать библиотечные компоненты router
const {
    makeOptions,
} = SvUseRouter();

const router = createRouter({
    ...makeOptions,
    history: createWebHistory("/"),

    // Собираем маршруты
    routes: [
        {
            path: "/page1",
            name: "page1",
            meta: {
                title: (route: Ref<RouteLocationNormalizedLoaded>) => {
                    return "Страница 1";
                },
                nameHelpHref: "222"
            },
            children: [
                {
                    path: "/page2",
                    name: "page2",
                    meta: {
                        title: "Страница 2",
                        nameHelpHref: "",
                    },
                    children: [
                        {
                            path: "/page3",
                            name: "page3",
                            component: {},
                            meta: {
                                title: "Страница 3",
                                nameHelpHref: "Тестовое описание из роутера",
                            },
                        }
                    ]
                }
            ]
        }
    ]
});

export default router;
