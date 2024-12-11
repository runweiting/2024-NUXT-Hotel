export default defineNuxtRouteMiddleware(async (to, from) => {
  const userStore = useUserStore()
  const getToken = useCookie('myToken')

  if (!getToken.value) {
    if (to.path !== '/login') return navigateTo('/login')
    return
  }

  const isValid = await userStore.checkToken()
  if (!isValid && to.path !== '/login') return navigateTo('/login')
})
