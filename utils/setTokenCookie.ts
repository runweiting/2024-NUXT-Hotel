import axios from 'axios'

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
    axios.defaults.headers.common['Authorization'] = token
  }
}

export function deleteTokenCookie(): void {
  const getCookie = useCookie('myToken')
  getCookie.value = null
}

// export function deleteTokenCookie (): void {
//   document.cookie = `myToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; Secure; SameSite=None`
//   axios.defaults.headers.common['Authorization'] = ''
// }
