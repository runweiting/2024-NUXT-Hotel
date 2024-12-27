import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import type { UserLogin } from '~/types/User'
import { emailSchema, passwordSchema } from '~/schemas/validationRules'

export const useLoginForm = () => {
  const userStore = useUserStore()
  const emailCookie = useCookie('signupEmail', {
    maxAge: 30 * 24 * 60 * 60,
    path: '/',
    secure: true,
    sameSite: 'none'
    // httpOnly: true
  })

  // 1. z 定義 zod scheme 表單驗證規則
  const schema = z.object({
    signupEmail: emailSchema,
    signupPassword: passwordSchema
  })

  // 2. useForm 轉換 schema 為 vee-validate schema
  const { handleSubmit, errors } = useForm({
    validationSchema: toTypedSchema(schema)
  })

  // 3. useField 定義表單欄位並連結 scheme 內相應屬性
  const emailField = useField<string>('signupEmail')
  const passwordField = useField<string>('signupPassword')

  /* 4. handleSubmit 的作用
  a. 執行表單驗證：在提交表單前，確保所有的欄位都通過驗證
  b. 收集表單數據：將所有欄位的值收集起來，組成一個 values 對象
  c. 處理提交邏輯：如驗證通過，才會將表單值作為參數傳遞給提交處理器
  d. values 是由 handleSubmit 提供的，包含所有已驗證的表單數據 */
  const handleLogin = handleSubmit(async (values, { resetForm }): Promise<void> => {
    try {
      const form: UserLogin = {
        email: values.signupEmail.trim(),
        password: values.signupPassword.trim()
      }
      // 檢查是否要記住帳號
      const rememberAccount = document.getElementById('rememberAccount') as HTMLInputElement
      if (rememberAccount.checked) {
        // 將帳號存入 Cookie
        emailCookie.value = form.email
      } else {
        // 如果取消記住帳號，則清除 Cookie
        emailCookie.value = null
      }

      await userStore.login(form)
      resetForm()
    } catch (err) {
      console.error('Error in handleLogin:', err)
    }
  })

  return {
    signupEmail: emailField.value,
    signupPassword: passwordField.value,
    errors,
    handleLogin
  }
}
