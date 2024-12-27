import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { emailSchema, passwordSchema } from '~/schemas/validationRules'

export const useSignupStepOneForm = () => {
  const userStore = useUserStore()
  const { warningToast } = useSweetAlert()

  // 1. z 定義 zod scheme 表單驗證規則 for stepOne
  const stepOneSchema = z
    .object({
      signupEmail: emailSchema,
      signupPassword: passwordSchema,
      confirmPassword: z.string({ message: '確認密碼為必填' })
    })
    .refine((data) => data.signupPassword === data.confirmPassword, {
      message: '填入密碼不一致',
      path: ['confirmPassword'] // 錯誤顯示在 confirmPassword
    })

  // 2. useForm 轉換 schema 為 vee-validate schema
  const { handleSubmit, errors, validate } = useForm({
    validationSchema: toTypedSchema(stepOneSchema)
  })

  // 3. useField 定義表單欄位並連結 scheme 內相應屬性
  const emailField = useField<string>('signupEmail')
  const passwordField = useField<string>('signupPassword')
  const confirmPasswordField = useField<string>('confirmPassword')

  /* 4. handleSubmit 的作用
  a. 執行表單驗證：在提交表單前，確保所有的欄位都通過驗證
  b. 收集表單數據：將所有欄位的值收集起來，組成一個 values 對象
  c. 處理提交邏輯：如驗證通過，才會將表單值作為參數傳遞給提交處理器
  d. values 是由 handleSubmit 提供的，包含所有已驗證的表單數據 */
  const handleStepOne = handleSubmit(async (values, { resetForm }): Promise<boolean> => {
    // 1. 定義需要驗證的欄位
    const fields = ['signupEmail', 'signupPassword', 'confirmPassword']
    // 2. 對每個欄位執行個別驗證
    await Promise.all(fields.map((field) => useValidateField(field)))
    // 3. 執行整個表單的驗證
    const isStepOneValid = await validate()
    if (isStepOneValid.valid) {
      try {
        // 先驗證 email 是否已註冊
        const isEmailExists = await userStore.verifyEmail({ email: values.signupEmail.trim() })
        if (!isEmailExists) {
          userStore.savedEmail = values.signupEmail.trim()
          userStore.savedPassword = values.signupPassword.trim()
          resetForm()
        } else {
          warningToast('此信箱已註冊，請登入')
          navigateTo('/account/login')
        }
      } catch (err) {
        console.error('Error in handleLogin:', err)
      }
    }
    return isStepOneValid.valid
  })

  return {
    signupEmail: emailField.value,
    signupPassword: passwordField.value,
    confirmPassword: confirmPasswordField.value,
    stepOneErrors: errors,
    handleStepOne
  }
}
