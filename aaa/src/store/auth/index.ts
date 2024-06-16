import { ref, computed } from "vue"
import { defineStore } from "pinia"
import useAuthRepository, { TAuthLoginResponse } from "@/api/auth"
import useProfileStore from "@/store/profile"

export default defineStore('authStore', () =>
{
  const authRepo = useAuthRepository()
  const profileStore = useProfileStore()
  const localStorageKey = '_COMPLETED_AUTH_'

  const completedAuth = ref((localStorage.getItem(localStorageKey) || '0') === '1')
  const isCompletedAuth = computed(() => completedAuth.value)

  const _setCompletedAuth = (value: boolean) => {
    completedAuth.value = value
    localStorage.setItem(localStorageKey, value ? '1' : '0')
  }

  const dispatchLogin = async (login: string, password: string): Promise<TAuthLoginResponse> => {
    const { data } = await authRepo.login(login, password)
    await profileStore.dispatchFetchProfile()
    _setCompletedAuth(true)
    return Promise.resolve(data)
  }

  const dispatchLogout = async (): Promise<null> => {
    await authRepo.logout()
    _setCompletedAuth(false)
    profileStore.clearProfile()
    return Promise.resolve(null)
  }

  const dispatchRefreshToken = async (): Promise<TAuthLoginResponse> => {
    const { data } = await authRepo.refresh()
    return Promise.resolve(data)
  }

  const dispatchLoginKrbManual = async (login: string, password: string): Promise<TAuthLoginResponse> => {
    const { data } = await authRepo.login(login, password)
    await profileStore.dispatchFetchProfile()
    _setCompletedAuth(true)
    return Promise.resolve(data)
  }

  const dispatchLoginKrbAuto = async (): Promise<TAuthLoginResponse> => {
    const { data } = await authRepo.loginKrbAuto()
    return Promise.resolve(data)
  }

  return {
    isCompletedAuth,
    dispatchRefreshToken,
    dispatchLogin,
    dispatchLoginKrbManual,
    dispatchLoginKrbAuto,
    dispatchLogout,
  }
})
