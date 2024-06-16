import { RouteLocationNormalized } from "vue-router"
import useProfileStore from "@/store/profile"
import { CrudSuffix } from "@/common/types"
import { MiddlewareDefinition, MiddlewareReturn } from "../router.d"

export default (workplace: string, permission: CrudSuffix): MiddlewareDefinition => {
  return async (to: RouteLocationNormalized, from: RouteLocationNormalized): MiddlewareReturn =>
  {
    console.debug(`mw: ACCESS (to: ${String(to.name)}, from: ${String(from.name)})`)

    const profileStore = useProfileStore()

    if (profileStore.checkHasPermission(workplace, permission)) {
      console.debug(`mw: ACCESS OK`)
      return true
    } else {
      console.debug(`mw: ACCESS DENIED`)
      return { name: 'AccessDenied'}
    }
  }
}
