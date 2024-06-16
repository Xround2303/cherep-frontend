import { useContextManager } from '@/plugins/contextManager'
import { AxiosPromise } from "axios"

export type TProfileRole = {
  id: number,
  title: string,
}

export type TProfileNavItem = {
  reference_name: string,
  workplace: string,
  icon: string,
  children?: Array<TProfileNavItem>,
}

export type TProfileHomeWorkplace = {
  reference_name: string,
  workplace: string
}

export type TProfileData = {
  id: number,
  lname: string,
  fname: string | null,
  mname: string | null,
  active: boolean,
  email: string,
  email_verified_at: string | null,
  is_ldap: boolean,
  locale_code: string,
  timezone: string,
  single_auth: boolean,
  refresh_password: boolean,
  refresh_password_interval: number,
  workplace: string | null,
  created_at: string,
  updated_at: string,
  deleted_at: string | null,
  blocked_at: string | null,
  deleted_by: number | null,
  created_by: number | null,
  blocked_by: null,
  can_delete: boolean,
  lastPasswordChange: string | null,
  days_since_last_change: number | null,
  roles: Array<TProfileRole>,
  permissions: Array<string>,
  navTree: Array<TProfileNavItem>,
  homeWorkplaces: Array<TProfileHomeWorkplace>
}

export type IProfileRepository = {
  get: () => AxiosPromise<TProfileData>
}

export default (): IProfileRepository => ({
  get: () => useContextManager().axios().get("/profile"),
});
