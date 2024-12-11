import type { ApiDataResponse, ApiStatusResponse } from '~/types/api/ApiResponse'
import type { BaseUserInfo, UserSignup, UserLogin, UserState } from '~/types/User'
import { setTokenCookie, deleteTokenCookie } from '~/utils/setTokenCookie'

export const useUserStore = defineStore('user', () => {
  const { $apiClient } = useNuxtApp()
  const { successToast } = useSweetAlert()

  // 定義狀態
  const userState = reactive<UserState>({
    userInfo: null,
    token: '',
    error: null,
    isLoading: false,
    isLogin: false,
    savedEmail: null,
    savedPassword: null
  })

  // 重置狀態
  const resetState = () => {
    userState.userInfo = null
    userState.token = ''
    userState.error = null
    userState.isLoading = false
    userState.isLogin = false
    userState.savedEmail = null
    userState.savedPassword = null
  }

  const signup = async (payload: UserSignup): Promise<void> => {
    userState.isLoading = true
    try {
      const res = await $apiClient.post<ApiDataResponse<BaseUserInfo>>(
        '/api/v1/user/signup',
        payload
      )
      if (res.data.token) {
        userState.token = res.data.token
        setTokenCookie(res.data.token)
        successToast('註冊成功')
      }
    } catch (err: any) {
      // 錯誤訊息改在 apiClient 中的攔截器處理
      userState.error = err.response?.data?.message
    } finally {
      userState.isLoading = false
    }
  }

  const login = async (payload: UserLogin): Promise<void> => {
    userState.isLoading = true
    try {
      const res = await $apiClient.post<ApiDataResponse<BaseUserInfo>>(
        '/api/v1/user/login',
        payload
      )
      if (res.data.token) {
        userState.userInfo = res.data.result
        setTokenCookie(res.data.token)
        userState.isLogin = true
        successToast('登入成功')
        navigateTo(`/user/${userState.userInfo.id}/profile`)
      }
    } catch (err: any) {
      userState.error = err.response?.data?.message
    } finally {
      userState.isLoading = false
    }
  }

  const logout = () => {
    resetState()
    deleteTokenCookie()
    successToast('登出成功')
    navigateTo('/')
  }

  const checkToken = async (): Promise<boolean> => {
    // 如果沒有 Token，直接返回 false
    const getToken = useCookie('myToken')
    if (!getToken.value) {
      resetState()
      return false
    }
    try {
      const res = await $apiClient.get<ApiStatusResponse>('/api/v1/user/check', {
        // 攜帶 Token 進行驗證
        headers: {
          Authorization: `Bearer ${getToken.value}`
        }
      })
      if (res.data.token) {
        userState.token = res.data.token
        setTokenCookie(res.data.token)
        userState.isLogin = true
        return true
      }
    } catch (err: any) {
      userState.error = err.response?.data?.message
    }
    resetState()
    deleteTokenCookie()
    return false
  }

  return {
    savedEmail: userState.savedEmail,
    savedPassword: userState.savedPassword,
    signup,
    login,
    logout,
    checkToken,
    userInfo: computed(() => userState.userInfo),
    error: computed(() => userState.error),
    isLoading: computed(() => userState.isLoading),
    isLogin: computed(() => userState.isLogin)
  }
})
