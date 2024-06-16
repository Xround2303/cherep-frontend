import { RouteLocationNormalized } from "vue-router"
import useProfileStore from "@/store/profile"
import { MiddlewareDefinition, MiddlewareReturn } from "../router.d"

const middleware: MiddlewareDefinition = async (to: RouteLocationNormalized, from: RouteLocationNormalized): MiddlewareReturn =>
{
  console.debug(`mw: REDIRECT FAV (to: ${String(to.name)}, from: ${String(from.name)})`)

  if (to.name === 'Layout') {
    const profileStore = useProfileStore()
    const name = profileStore.getFavWorkplace()
    console.debug(`mw: REDIRECT FAV got fav = ${name}`)
    return { name }
  } else {
    console.debug(`mw: REDIRECT FAV skipped`)
    return true
  }
}

export default middleware
