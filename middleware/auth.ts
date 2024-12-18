export default defineNuxtRouteMiddleware(async (to, from) => {
  // 在進入特定路由前執行以下邏輯
  // to 目標路由資訊，from 當前路由資訊，
  const userStore = useUserStore()

  // token 無效且目標路由不是登入頁，則導向登入頁
  /* to.path !== '/account/login' 避免在登入頁時發生無限重導 redirect
  當 isValid 為 false 時，程式碼會檢查 to.path 是否為登入頁？
  如果不是登入頁，執行重導向登入頁
  如果是登入頁，才不會再次重導，避免陷入無限重導的迴圈 */
  const isValid = await userStore.checkToken()
  if (!isValid && to.path !== '/account/login') return navigateTo('/account/login')

  // token 有效且目標路徑為 /user 時，導向 /user/${userId}/profile
  if (to.path === '/user') {
    const userId = userStore.userInfo?.id
    if (userId) {
      navigateTo(`/user/${userId}/profile`)
    }
  }
})
