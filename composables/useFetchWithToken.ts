export const useFetchWithToken = async <T>(url: string, options?: any) => {
  const getToken = useCookie('myToken')
  options.headers = {
    ...options.headers,
    Authorization: `Bearer ${getToken.value}`
  }

  return useFetch<T>(url, {
    ...options,
    onRequest({ options }) {
      // 這裡可以加入額外的 onRequest 邏輯
      // console.log('Request:', options)
    },
    onResponse({ response }) {
      // 這裡可以加入額外的 onResponse 邏輯
      // console.log('Response:', response)
    }
  })
}
