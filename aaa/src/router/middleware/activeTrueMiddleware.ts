import { RouteLocationNormalized } from "vue-router"
import useProfileStore from "@/store/profile"
import { MiddlewareDefinition, MiddlewareReturn } from "../router.d"

const middleware: MiddlewareDefinition = async (to: RouteLocationNormalized, from: RouteLocationNormalized): MiddlewareReturn =>
{
  console.debug(`mw: ACTIVE (to: ${String(to.name)}, from: ${String(from.name)})`)

  const profileStore = useProfileStore()

  if (!profileStore.checkActive) {
    console.debug(`mw: ACTIVE FAIL: go to changePassword`)
    return { name: "ChangePassword", query: { redirect: to.fullPath } }
  } else {
    console.debug(`mw: ACTIVE OK`)
    return true
  }
}

export default middleware