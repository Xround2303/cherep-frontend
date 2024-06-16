import type { Preview } from "@storybook/vue3";
import { setup } from "@storybook/vue3";
import "../src/index"

import { useContextManager } from "../src/plugins/contextManager";
import 'primeflex/primeflex.scss';
import 'primeicons/primeicons.css';
import '@mdi/font/css/materialdesignicons.css';
import "../dist/themes/theme-base.css";

import PrimeVue from "primevue/config";

import { withThemeByClassName } from "@storybook/addon-themes";
import { createPinia } from 'pinia'
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';

import { cloneDeep } from 'lodash'

import { i18n } from '../src/plugins/i18n';
import router from '../src/router/plugin';

import { init as initValidation } from '../src/plugins/validate/index';

import useEnvStore from '../src/store/env/index';

const contextManager = useContextManager();
contextManager.setupI18nInstance(i18n);
contextManager.setupRouterInstance(router);
contextManager.setupAxiosInstance("http://localhost:9080/api", "http");
initValidation();

function storeReset({ store }) {
  const initialState = cloneDeep(store.$state)
  store.$reset = () => store.$patch(cloneDeep(initialState))
}

const pinia = createPinia();
pinia.use(storeReset)
setup((app) => {
  app
    .use(ConfirmationService)
    .use(ToastService)
    .use(contextManager.i18n())
    .use(pinia)
    .use(PrimeVue)
    .use(router)


  const envStore = useEnvStore();
  envStore.setState();
});

export const globalTypes = {
  lang: {
    name: 'Language',
    description: 'Global language for components',
    defaultValue: 'ru',
    toolbar: {
      items: [
        {
          value: 'ru',
          title: 'Russian',
          right: '🇷🇺',
        },
        {
          value: 'en',
          title: 'English',
          right: '🇬🇧',
        },
      ],
      title: true,
      dynamicTitle: true,
    },
  },
};

export default {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    withThemeByClassName({
      themes: {
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'light',
    }),
    (story, context) => {
      const wrapped = story(context);
      const lang = context.globals.lang;
      const theme = context.globals.theme;

      const envStore = useEnvStore();
      envStore.setLang(lang);
      envStore.setTheme(theme ?? 'light');

      return {
        components: { wrapped },
        template: `<wrapped />`,
      };
    },

  ]
} as Preview;


