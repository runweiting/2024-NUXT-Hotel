import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import type { UserForgot } from '~/types/User'

export const useForgetPasswordForm = () => {
  const userStore = useUserStore()

  // 1. z 定義 zod scheme 表單驗證規則
  const schema = z.object({
    signupEmail: z.string({ message: 'Email為必填' }).email({ message: '請輸入有效的 Email 格式' }),
    verificationCode: z
      .string({ message: '驗證碼為必填' })
      .regex(/^[A-Za-z0-9]{6}$/, { message: '驗證碼必須是 6 個字元的大小寫字母與數字組合' }),
    newPassword: z
      .string({ message: '密碼為必填' })
      .min(8, { message: '密碼需至少 8 碼' })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
        message: '密碼必須包含大小寫英文字母和數字'
      })
  })

  // 2. useForm 轉換 schema 為 vee-validate schema
  const { handleSubmit, errors } = useForm({
    validationSchema: toTypedSchema(schema)
  })

  // 3. useField 定義表單欄位並連結 scheme 內相應屬性
  const emailField = useField<string>('signupEmail')
  const codeField = useField<string>('verificationCode')
  const passwordField = useField<string>('newPassword')

  /* 4. handleSubmit 的作用
  a. 執行表單驗證：在提交表單前，確保所有的欄位都通過驗證
  b. 收集表單數據：將所有欄位的值收集起來，組成一個 values 對象
  c. 處理提交邏輯：如驗證通過，才會將表單值作為參數傳遞給提交處理器
  d. values 是由 handleSubmit 提供的，包含所有已驗證的表單數據 */
  const handleForgetPassword = handleSubmit(async (values, { resetForm }): Promise<void> => {
    try {
      const form: UserForgot = {
        email: values.signupEmail.trim(),
        code: values.verificationCode.trim(),
        newPassword: values.newPassword.trim()
      }
      await userStore.forgetPassword(form)
      resetForm()
    } catch (err) {
      console.error('Error in handleLogin:', err)
    }
  })

  return {
    signupEmail: emailField.value,
    verificationCode: codeField.value,
    newPassword: passwordField.value,
    errors,
    handleForgetPassword
  }
}
