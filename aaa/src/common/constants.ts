import SvLightLogo from '../assets/img/logo-svyazcom-light.svg';
import SvDarkLogo from '../assets/img/logo-svyazcom-dark.svg';

export default {
  // Параметры даты-времени
  LuxonDateFormat: 'dd.MM.yyyy',
  LuxonFullDateTimeFormat: 'dd.MM.yyyy HH:mm:ss',
  LuxonShortDateTimeFormat: 'dd.MM.yyyy HH:mm',

  // для создания именованных методов в CheckPermissionMixin
  CrudSuffix: ['view', 'add', 'edit', 'delete'],

  defaultAppTitle: "TEMPLATE",
  defaultAppTitleSplit: 4,
  defaultAppLogo: {
    light: SvLightLogo,
    dark: SvDarkLogo
  },
  defaultFooterHref: "http://svyazcom.ru",
  defaultFooterHrefText: "Svyazcom",
  defaultDomain: "",
};
