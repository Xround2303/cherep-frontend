import { useContextManager } from "@/plugins/contextManager"
import useReturlUrlStore from '@/store/returnUrl'
import useProfileStore from '@/store/profile'

export default () => {

  const returnUrlStore = useReturlUrlStore()
  const profileStore = useProfileStore()
  const router = useContextManager().router()

  const basePath = window.location.pathname.replace('/login', '')
  const originUrl = window.location.origin
  const baseUrl = `${originUrl}${basePath}`

  // Функция обработки присланной страницы изначального перехода
  const handleReturnUrl = (returnUrl: string) => {
    const isBaseReturnUrl = returnUrl.replace(/\/+$/, '') == baseUrl
    const fixedReturnUrl = isBaseReturnUrl ? '' : returnUrl
    returnUrlStore.setReturnUrl(fixedReturnUrl)
    // Если изначальная страница непуста, обрежем из URI, чтобы не портить картинку
    if (returnUrl.length > 0) {
      router.replace({ query: {} })
    }
  };

  // Функция перехода на нужную страницу сразу после авторизации
  const redirectToDesiredPage = () => {
    const url = returnUrlStore.getReturnUrl()
    // шли изначально на какую-то определённую страницу, надо перейти явно на неё
    if (url.length > 0) {
      const redir = url
      returnUrlStore.setReturnUrl('')

      // если страница лежит внутри WEB, надо исполнить бесшовный переход с помощью Router
      // обрабатываем полную ссылку вида http(s)://host:port/subpath/target
      if (redir.startsWith(baseUrl)) {
        router.push({ path: redir.replace(baseUrl, '') })

        // обрабатываем относительную ссылку внутри веб
      } else if (redir.startsWith(basePath)) {
        router.push({ path: redir.replace(basePath, '') })

        // обрабатываем относительную ссылку, но не внутри WEB, просто идём туда добавляя origin
      } else if (redir.startsWith('/')) {
        window.location.href = `${originUrl}${redir}`

        // обрабатываем полную ссылку снаружи WEB, просто идём туда
      } else {
        window.location.href = redir
      }

      // пришли в корень сайта, значит нужно идти на любимую страницу пользователя
    } else {
      const name = profileStore.getFavWorkplace()
      router.push({ name }).catch(() => {})
    }
  };

  return {
    handleReturnUrl,
    redirectToDesiredPage,
  };
};
