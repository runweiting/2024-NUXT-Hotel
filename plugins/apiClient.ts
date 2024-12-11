import axios, { AxiosError } from 'axios'
import type { ErrorResponse } from '~/types/api/ApiResponse'

export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig()
  const { warningToast, errorToast } = useSweetAlert()

  const handleError = (error: AxiosError<ErrorResponse>) => {
    const errorMessage = error.response?.data?.message || '發生未知錯誤'
    const errorCode = error.response?.status
    errorToast(errorMessage)

    switch (errorCode) {
      case 401:
        navigateTo('/login')
        break
      case 403:
        warningToast('權限不足')
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
      handleError(error)
      return Promise.reject(error)
    }
  )

  return {
    provide: {
      apiClient
    }
  }
})
