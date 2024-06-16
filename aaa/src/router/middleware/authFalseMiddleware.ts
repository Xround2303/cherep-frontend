import { RouteLocationNormalized } from "vue-router"
import useAuthStore from "@/store/auth"
import useProfileStore from "@/store/profile"
import { MiddlewareDefinition, MiddlewareReturn } from "../router.d"

const middleware: MiddlewareDefinition = async (to: RouteLocationNormalized, from: RouteLocationNormalized): MiddlewareReturn =>
{
  console.debug(`mw: NOT_AUTH (to: ${String(to.name)}, from: ${String(from.name)})`)
  
  const authStore = useAuthStore()
  const profileStore = useProfileStore()

  if (authStore.isCompletedAuth) {
    console.debug(`mw: NOT_AUTH FAIL: go to Fav`)
    const name = profileStore.getFavWorkplace()
    return { name }
  } else {
    console.debug(`mw: NOT_AUTH OK`)
    return true
  }
}

export default middleware
