import axios, { AxiosError } from 'axios'
import type { ErrorResponse } from '~/types/api/ApiResponse'

export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig()
  const { warningToast, errorToast } = useSweetAlert()

  const handleError = (error: AxiosError<ErrorResponse>) => {
    const errorMessage = error.response?.data?.message || '發生未知錯誤'
    const errorCode = error.response?.status
    warningToast(errorMessage)

    switch (errorCode) {
      case 401:
        navigateTo('/account/login')
        break
      default:
        console.error({
          message: errorMessage,
          statusCode: errorCode,
          stack: error.stack
        })
    }
  }

  const apiClient = axios.create({
    baseURL: runtimeConfig.public.hexSchoolApiUrl as string,
    headers: { 'Content-Type': 'application/json' }
  })

  apiClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError<ErrorResponse>) => {
      if (error.response?.data.message) {
        // 後端有回應錯誤訊息的狀況
        handleError(error)
      } else {
        // 發生後端不會有回應的狀況，例如網路問題
        errorToast('無法連接到伺服器，請稍後再試')
        console.error('Network or server error:', error.message)
      }
      // 拋出錯誤以供後續捕捉
      return Promise.reject(error)
    }
  )

  return {
    provide: {
      apiClient
    }
  }
})
