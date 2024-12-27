import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import type { UserVerifyEmail } from '~/types/User'
import { emailSchema } from '~/schemas/validationRules'

export const useForgetVerifyEmailForm = () => {
  const userStore = useUserStore()

  // 1. z 定義 zod scheme 表單驗證規則
  const schema = z.object({
    verifyEmail: emailSchema
  })

  // 2. useForm 轉換 schema 為 vee-validate schema
  const { handleSubmit, errors } = useForm({
    validationSchema: toTypedSchema(schema)
  })

  // 3. useField 定義表單欄位並連結 scheme 內相應屬性
  const verifyEmailField = useField<string>('verifyEmail')

  /* 4. handleSubmit 的作用
  a. 執行表單驗證：在提交表單前，確保所有的欄位都通過驗證
  b. 收集表單數據：將所有欄位的值收集起來，組成一個 values 對象
  c. 處理提交邏輯：如驗證通過，才會將表單值作為參數傳遞給提交處理器
  d. values 是由 handleSubmit 提供的，包含所有已驗證的表單數據 */
  const handleVerifyEmail = handleSubmit(async (values, { resetForm }): Promise<boolean> => {
    try {
      const email: UserVerifyEmail = {
        email: values.verifyEmail.trim()
      }
      const isEmailExists = await userStore.generateEmailCode(email)
      // true email 有註冊，寄送驗證碼
      // false email 未註冊，前往註冊
      if (isEmailExists) resetForm()
      return isEmailExists
    } catch (err) {
      console.error('Error in handleVerifyEmail:', err)
      return false
    }
  })

  return {
    verifyEmail: verifyEmailField.value,
    errors,
    handleVerifyEmail
  }
}
