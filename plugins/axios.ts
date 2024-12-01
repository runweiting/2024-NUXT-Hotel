import axios from 'axios'

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig()
  axios.defaults.baseURL = runtimeConfig.public.hexSchoolApiUrl as string
})
