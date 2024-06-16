import { RouteLocationNormalized } from "vue-router"
import { MiddlewareDefinition, MiddlewareReturn } from "../router.d"

const middleware: MiddlewareDefinition = async (to: RouteLocationNormalized, from: RouteLocationNormalized): MiddlewareReturn =>
{
  console.debug(`mw: LOG (to: ${String(to.name)}, from: ${String(from.name)})`)
  return true
}

export default middleware
