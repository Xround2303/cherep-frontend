import { RouteLocationNormalized } from "vue-router"
import useProfileStore from "@/store/profile"
import { MiddlewareDefinition, MiddlewareReturn } from "../router.d"

const middleware: MiddlewareDefinition = async (to: RouteLocationNormalized, from: RouteLocationNormalized): MiddlewareReturn =>
{
  console.debug(`mw: NOT_ACTIVE (to: ${String(to.name)}, from: ${String(from.name)})`)

  const profileStore = useProfileStore()

  if (profileStore.checkActive) {
    console.debug(`mw: NOT_ACTIVE FAIL: go to fav`)
    const name = profileStore.getFavWorkplace()
    return { name }
  } else {
    console.debug(`mw: NOT_ACTIVE OK`)
    return true
  }
}

export default middleware
