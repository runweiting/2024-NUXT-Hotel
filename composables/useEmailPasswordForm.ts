import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { useValidateField } from 'vee-validate'

export const useEmailPasswordForm = () => {
  const userStore = useUserStore()

  // 1. z 定義 zod scheme 表單驗證規則 for stepOne
  const stepOneSchema = z
    .object({
      signupEmail: z
        .string({ message: 'Email為必填' })
        .email({ message: '請輸入有效的 Email 格式' }),
      signupPassword: z
        .string({ message: '密碼為必填' })
        .min(8, { message: '密碼需至少 8 碼' })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
          message: '密碼必須包含大小寫英文字母和數字'
        }),
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
    const fields = ['signupEmail', 'signupPassword', 'confirmPassword']
    await Promise.all(fields.map((field) => useValidateField(field)))
    const isStepOneValid = await validate()
    if (isStepOneValid.valid) {
      userStore.savedEmail = values.signupEmail.trim()
      userStore.savedPassword = values.signupPassword.trim()
    }
    console.log('savedEmail', userStore.savedEmail)
    console.log('savedPassword', userStore.savedPassword)
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
