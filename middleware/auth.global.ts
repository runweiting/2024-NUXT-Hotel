export default defineNuxtRouteMiddleware(async (to, from) => {
  const userStore = useUserStore()
  const { warningToast } = useSweetAlert()
  const getToken = useCookie('myToken')

  // === Helpers ===
  // 檢查是否為公開頁面
  const isPublicPage = (path: string): boolean => {
    const publicPages = [
      '/',
      '/rooms',
      '/account/login',
      '/account/signup',
      /^\/rooms\/\w+$/ // /rooms/[roomId]
    ]
    return publicPages.some((page) => {
      if (typeof page === 'string') return path === page
      if (page instanceof RegExp) return page.test(path)
      return false
    })
  }

  // 處理重定向到登入頁邏輯
  const redirectToLogin = (message: string) => {
    userStore.logout()
    warningToast(message)
    if (to.path !== '/account/login') {
      return navigateTo('/account/login')
    }
  }

  // 驗證 Token 的有效性
  const validateToken = async () => {
    if (!getToken.value) {
      return false
    }
    const isValid = await userStore.checkToken()
    return isValid
  }

  // === Main Logic ===
  // 若為公開頁面，直接返回
  if (isPublicPage(to.path)) return

  // 如不需要授權，直接返回
  if (!to.meta.requiresAuth) return

  // 如需驗證但 token 無效，重定向到登入頁
  if (to.meta.requiresAuth) {
    const isValid = await validateToken()
    if (!isValid) {
      return redirectToLogin('驗證無效，請重新登入')
    }
  }

  // 檢查 Token 並進行驗證
  const isValid = await validateToken()

  if (!isValid) {
    return redirectToLogin('驗證無效，請重新登入')
  }

  // Token 有效，進一步處理特殊路徑邏輯
  // 目標路徑為 /user 時，導向 /user/${userId}/profile
  if (to.path === '/user') {
    const userId = userStore.userInfo?.id
    if (userId) {
      navigateTo(`/user/${userId}/profile`)
    }
  }

  // 目標路徑為 /admin 時，檢查是否為管理員
  if (to.path.startsWith('/admin') && !userStore.isAdmin) {
    warningToast('權限不足')
    return navigateTo('/')
  }
})
