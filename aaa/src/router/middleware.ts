// Импорт модулей данного объекта
import access from "./middleware/accessMiddleware"
import notActive from "./middleware/activeFalseMiddleware"
import active from "./middleware/activeTrueMiddleware"
import notAuthenticated from "./middleware/authFalseMiddleware"
import authenticated from "./middleware/authTrueMiddleware"
import redirectToFav from "./middleware/redirectFavMiddleware"
import log from "./middleware/logMiddleware"

// Собираем солянку из модулей
export default () => {
  return {
    access,
    notActive,
    active,
    notAuthenticated,
    authenticated,
    redirectToFav,
    log
  }
}
