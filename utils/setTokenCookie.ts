import axios from 'axios'
import type { AxiosInstance } from 'axios'

export function setTokenCookie(token: string): void {
  const cookie = useCookie('myToken', {
    maxAge: 7 * 24 * 60 * 60,
    path: '/',
    secure: true,
    sameSite: 'none'
    // httpOnly: true
  })
  cookie.value = token

  // 只在客戶端設置 Authorization header
  if (import.meta.client) {
    const apiClient = useNuxtApp().$apiClient
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }
}

export function deleteTokenCookie(): void {
  const getCookie = useCookie('myToken')
  getCookie.value = null

  // 清除 $apiClient 的 Authorization header
  if (import.meta.client) {
    const apiClient = useNuxtApp().$apiClient
    delete apiClient.defaults.headers.common['Authorization']
  }
}
