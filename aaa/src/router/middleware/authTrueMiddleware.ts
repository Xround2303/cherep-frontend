import { RouteLocationNormalized } from "vue-router"
import useProfileStore from "@/store/profile"
import { MiddlewareDefinition, MiddlewareReturn } from "../router.d"

const middleware: MiddlewareDefinition = async (to: RouteLocationNormalized, from: RouteLocationNormalized): MiddlewareReturn =>
{
  console.debug(`mw: AUTH (to: ${String(to.name)}, from: ${String(from.name)})`)

  const profileStore = useProfileStore()

  if (!profileStore.checkProfileFetched) {
    try {
      await profileStore.dispatchFetchProfile()
    } catch (error) {
      console.debug(`mw: AUTH FAIL: stop middleware`)
      return false // в логин мы уже и так ушли, из перехватчика
    }

    // Если по необъяснимым причинам не получен профиль, уходим на логин
    if (!profileStore.checkProfileFetched) {
      console.debug(`mw: AUTH FAIL: go to Login`)
      return { name: "Login", query: { returnUrl: to.fullPath } }
    }
  }

  console.debug(`mw: AUTH OK`)
  return true
}

export default middleware
