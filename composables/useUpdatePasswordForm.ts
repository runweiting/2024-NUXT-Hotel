import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import type { UserPut } from '~/types/User'
import { passwordSchema } from '~/schemas/validationRules'

export const useUpdatePasswordForm = () => {
  const userStore = useUserStore()

  // 1. z 定義 zod scheme 表單驗證規則 for stepOne
  const schema = z
    .object({
      oldPassword: passwordSchema,
      newPassword: passwordSchema,
      confirmPassword: z.string({ message: '確認新密碼為必填' })
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: '填入密碼不一致',
      path: ['confirmPassword'] // 錯誤顯示在 confirmPassword
    })

  // 2. useForm 轉換 schema 為 vee-validate schema
  const { handleSubmit, errors, validate } = useForm({
    validationSchema: toTypedSchema(schema)
  })

  // 3. useField 定義表單欄位並連結 scheme 內相應屬性
  const oldPasswordField = useField<string>('oldPassword')
  const newPasswordField = useField<string>('newPassword')
  const confirmPasswordField = useField<string>('confirmPassword')

  /* 4. handleSubmit 的作用
  a. 執行表單驗證：在提交表單前，確保所有的欄位都通過驗證
  b. 收集表單數據：將所有欄位的值收集起來，組成一個 values 對象
  c. 處理提交邏輯：如驗證通過，才會將表單值作為參數傳遞給提交處理器
  d. values 是由 handleSubmit 提供的，包含所有已驗證的表單數據 */
  const handlePassword = handleSubmit(async (values, { resetForm }): Promise<boolean> => {
    // 1. 定義需要驗證的欄位
    const fields = ['oldPassword', 'newPassword', 'confirmPassword']
    // 2. 對每個欄位執行個別驗證
    await Promise.all(fields.map((field) => useValidateField(field)))
    // 3. 執行整個表單的驗證
    const isValid = await validate()
    if (isValid.valid) {
      try {
        const form: UserPut = {
          userId: userStore.userId as string,
          name: userStore.userInfo?.name as string,
          phone: userStore.userInfo?.phone as string,
          birthday: userStore.userInfo?.birthday as string,
          address: {
            zipcode: userStore.userInfo?.address.zipcode as string,
            detail:
              `${userStore.userInfo?.address.city || ''}${userStore.userInfo?.address.detail || ''}`.trim()
          },
          oldPassword: values.oldPassword,
          newPassword: values.confirmPassword
        }
        await userStore.updateProfile(form)
        userStore.oldPassword = values.oldPassword.trim()
        userStore.newPassword = values.newPassword.trim()
        resetForm()
      } catch (err: any) {
        console.error('Error in handlePassword:', err)
      }
    }
    return isValid.valid
  })

  return {
    oldPassword: oldPasswordField.value,
    newPassword: newPasswordField.value,
    confirmPassword: confirmPasswordField.value,
    errors,
    handlePassword
  }
}
