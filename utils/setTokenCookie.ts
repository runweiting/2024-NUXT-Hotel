// 設置全域 middleware auth 每當路由切換時，驗證 token 是否有效，以避免 token 被刪除或竄改
// 在 apiClient.ts 裡設置 request 攔截器，每次發送請求時，都會帶上 token
export function setTokenCookie(token: string): void {
  const cookie = useCookie('myToken', {
    maxAge: 7 * 24 * 60 * 60,
    path: '/',
    secure: true,
    sameSite: 'none'
    // httpOnly: true
  })
  cookie.value = token
}

export function deleteTokenCookie(): void {
  const getCookie = useCookie('myToken')
  getCookie.value = null
}
