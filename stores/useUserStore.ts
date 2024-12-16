import type {
  ApiDataResponse,
  ApiStatusResponse,
  VerifyEmailResponse
} from '~/types/api/ApiResponse'
import type {
  BaseUserInfo,
  UserSignup,
  UserLogin,
  UserVerifyEmail,
  UserForgot,
  UserState,
  UserPut
} from '~/types/User'
import { setTokenCookie, deleteTokenCookie } from '~/utils/setTokenCookie'

export const useUserStore = defineStore('user', () => {
  const { $apiClient } = useNuxtApp()
  const { successToast, warningToast } = useSweetAlert()

  // 定義狀態
  const userState = reactive<UserState>({
    savedEmail: null,
    savedPassword: null,
    oldPassword: null,
    newPassword: null,
    userInfo: null,
    token: '',
    error: null,
    isLoading: false,
    isLogin: false
  })

  // 重置狀態
  const resetState = () => {
    userState.savedEmail = null
    userState.savedPassword = null
    userState.oldPassword = null
    userState.newPassword = null
    userState.userInfo = null
    userState.token = ''
    userState.error = null
    userState.isLoading = false
    userState.isLogin = false
  }

  const signup = async (payload: UserSignup): Promise<void> => {
    userState.isLoading = true
    try {
      const res = await $apiClient.post<ApiDataResponse<BaseUserInfo>>(
        '/api/v1/user/signup',
        payload
      )
      if (res.data.token) {
        userState.userInfo = res.data.result
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
        navigateTo(`/user/${userState.userInfo.id}/profile`)
        successToast('登入成功')
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
      return false
    }
    try {
      const res = await $apiClient.get<ApiStatusResponse>('/api/v1/user/check')
      if (res.data.token) {
        userState.token = res.data.token
        setTokenCookie(res.data.token)
        userState.isLogin = true
        return true
      }
    } catch (err: any) {
      userState.error = err.response?.data?.message
      resetState()
      return false
    }
    return false
  }

  const verifyEmail = async (payload: UserVerifyEmail): Promise<void> => {
    userState.isLoading = true
    try {
      const res = await $apiClient.post<ApiDataResponse<VerifyEmailResponse>>(
        '/api/v1/verify/email',
        payload
      )
      if (res.data.result.isEmailExists) {
        await generateEmailCode(payload)
        successToast('請前往信箱領取驗證碼')
      } else {
        warningToast('此信箱尚未註冊，請立即註冊')
        navigateTo('/account/signup')
      }
    } catch (err: any) {
      userState.error = err.response?.data?.message
    } finally {
      userState.isLoading = false
    }
  }

  const generateEmailCode = async (payload: UserVerifyEmail): Promise<void> => {
    try {
      await $apiClient.post<ApiStatusResponse>('/api/v1/verify/generateEmailCode', payload)
    } catch (err: any) {
      userState.error = err.response?.data?.message
    }
  }

  const forgetPassword = async (payload: UserForgot): Promise<void> => {
    userState.isLoading = true
    try {
      const res = await $apiClient.post<ApiStatusResponse>('/api/v1/user/forgot', payload)
      if (res.data.status) {
        successToast('密碼已更新，請重新登入')
      }
    } catch (err: any) {
      userState.error = err.response?.data?.message
    } finally {
      userState.isLoading = false
    }
  }

  const updateProfile = async (payload: UserPut): Promise<void> => {
    userState.isLoading = true
    try {
      const res = await $apiClient.put<ApiStatusResponse>('/api/v1/user', payload)
      if (res.data.status) {
        successToast('更新成功')
      }
    } catch (err: any) {
      userState.error = err.response?.data?.message
    } finally {
      userState.isLoading = false
    }
  }

  const getProfile = async (): Promise<BaseUserInfo | null> => {
    userState.isLoading = true
    try {
      const res = await $apiClient.get<ApiDataResponse<BaseUserInfo>>('/api/v1/user')
      if (res.data.status) {
        // 完全替換 userInfo，並確保其響應式
        userState.userInfo = reactive({ ...res.data.result })
        return res.data.result
      }
      return null
    } catch (err: any) {
      userState.error = err.response?.data?.message
      return null
    } finally {
      userState.isLoading = false
    }
  }

  const formattedBirthday = computed(() => {
    if (userState.userInfo?.birthday) {
      // 將 ISO 8601 格式轉換為 YYYY-MM-DD
      return new Date(userState.userInfo?.birthday).toISOString().split('T')[0]
    }
    return ''
  })

  return {
    savedEmail: userState.savedEmail,
    savedPassword: userState.savedPassword,
    oldPassword: userState.oldPassword,
    newPassword: userState.newPassword,
    userId: computed(() => userState.userInfo?.id),
    formattedBirthday: formattedBirthday,
    userInfo: computed(() => userState.userInfo),
    error: computed(() => userState.error),
    isLoading: computed(() => userState.isLoading),
    isLogin: computed(() => userState.isLogin),
    signup,
    login,
    logout,
    checkToken,
    verifyEmail,
    generateEmailCode,
    forgetPassword,
    updateProfile,
    getProfile
  }
})
