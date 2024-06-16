import { useContextManager } from '@/plugins/contextManager'
import { AxiosPromise } from "axios"

export type TEnvLocale = {
  name: string,
  code: string,
  bcp47: string,
}

export type TEnvFeatures = {
  'footer.href': string,
  'footer.hrefText': string,
  'datepicker.switchMode': string,
  'ldap': boolean,
  'auth.enableOsLogin': boolean,
  'users.passwordRegex': string | null,
  'users.passwordRules': string | null,
  'users.emailRules': string | null,
  'users.withSingleRoles': boolean,
  'defaultWorkplace': string,
  'design.appTitle': string,
  'design.appTitleSplit': number,
  'design.appLogo.light': string,
  'design.appLogo.dark': string,
  'versions': Array<
    {
      name: string,
      version: string
    }
  > | null,
  [k: string]: string | boolean | number | Array<any> | null
}

export type TEnvData = {
  locales: TEnvLocale[],
  features: TEnvFeatures,
  version: string,
  domain: string,
  appTimezone: string,
  uploadMaxSize: number,
  appTitle: string,
  appTitleSplit: number,
  appLogo: {
    light: string,
    dark: string
  },
  footerHref: string,
  footerHrefText: string,
}

export type IEnvRepository = {
  get: () => AxiosPromise<TEnvData>,
}

export default (): IEnvRepository => ({
  get: () => useContextManager().axiosWithoutAuth().get("/auth/env")
})
