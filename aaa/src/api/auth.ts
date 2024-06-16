import { useContextManager } from '@/plugins/contextManager'
import { AxiosPromise } from "axios"

export type TAuthLoginResponse = {
  csrfToken: string
}

export type TAuthRefreshResponse = TAuthLoginResponse

type EmptyResponse = ''

export type IAuthRepository = {
  login: (email: string, password: string) => AxiosPromise<TAuthLoginResponse>,
  loginKrbAuto: () => AxiosPromise<TAuthLoginResponse>,
  loginKrbManual: (username: string, password: string) => AxiosPromise<TAuthLoginResponse>,
  refresh: () => AxiosPromise<TAuthRefreshResponse>
  logout: () => AxiosPromise<EmptyResponse>,
}

export default (): IAuthRepository => ({
  login: (email: string, password: string) => useContextManager().axiosWithoutAuth().post("/auth/login", { email, password }),
  loginKrbAuto: () => useContextManager().axiosWithoutAuth().get("/auth/login-krb-auto", {
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
    }
  }
  ),
  loginKrbManual: (username: string, password: string) => {
    const base64encodedData = Buffer.from(`${username}:${password}`).toString('base64');
    return useContextManager().axiosWithoutAuth().get("/auth/login-krb-manual",
      {
        headers: {
          Authorization: 'Basic ' + base64encodedData,
          'X-Requested-With': 'XMLHttpRequest',
        },
      }
    )
  },
  refresh: () => useContextManager().axiosWithoutAuth().post("/auth/refresh"),
  logout: () => useContextManager().axiosWithoutAuth().post("/auth/logout"),
})
