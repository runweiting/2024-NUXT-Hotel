import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import type { UserSignup } from '~/types/User'
import zipcodeData from '~/assets/tw-zipcode.json'
import {
  nameSchema,
  phoneSchema,
  birthdaySchema,
  zipcodeSchema,
  detailSchema
} from '~/schemas/validationRules'

// 預先處理成 Set 提高查詢效能
const allZipcodes = new Set(Object.values(zipcodeData).flatMap((areas) => Object.values(areas)))

export const useSignupStepTwoForm = () => {
  const userStore = useUserStore()

  // 1. z 定義 zod scheme 表單驗證規則 for stepTwo
  const stepTwoSchema = z.object({
    signupName: nameSchema,
    signupPhone: phoneSchema,
    birthday: birthdaySchema,
    zipcode: zipcodeSchema,
    city: z.string().optional(), // 可選欄位
    county: z.string().optional(), // 可選欄位
    detail: detailSchema
  })

  // 2. useForm 轉換 schema 為 vee-validate schema
  const { handleSubmit, errors, validate } = useForm({
    validationSchema: toTypedSchema(stepTwoSchema)
  })

  // 3. useField 定義表單欄位並連結 scheme 內相應屬性
  const nameField = useField<string>('signupName')
  const phoneField = useField<string>('signupPhone')
  const birthdayField = useField<string>('birthday')
  const zipcodeField = useField<string>('zipcode')
  const cityField = useField<string>('city')
  const countyField = useField<string>('county')
  const detailField = useField<string>('detail')

  // 4. 監聽 zipcodeField 自動填入 cityAreaField
  /* 為什麼用 for，不用 forEach？
  for...of 可直接 return 提前結束迭代、forEach 無法直接 return 結束整個迭代 */
  watch(
    () => zipcodeField.value.value,
    (newZipcode) => {
      if (newZipcode && allZipcodes.has(newZipcode)) {
        // 找出對應的城市和區域
        for (const [city, countys] of Object.entries(zipcodeData)) {
          // 第一層迴圈：遍歷每個城市、[city, areas] 解構賦值
          // city 是城市名稱（例如：基隆市）、areas 是該城市的區域物件（例如：{仁愛區: "200", 信義區: "201"...}）
          for (const [county, code] of Object.entries(countys)) {
            // 第二層迴圈：遍歷每個城市的每個區域、[area, code] 解構賦值
            // area 是區域名稱（例如：仁愛區）、code 是郵遞區號（例如："200"）
            if (code === newZipcode) {
              // 當找到匹配的郵遞區號時，自動填入地址的城市和區域名稱
              cityField.value.value = city
              countyField.value.value = county
              return // 立即結束兩層迴圈
            }
          }
        }
      }
    }
  )

  /* 5. handleSubmit 的作用
  a. 執行表單驗證：在提交表單前，確保所有的欄位都通過驗證
  b. 收集表單數據：將所有欄位的值收集起來，組成一個 values 對象
  c. 處理提交邏輯：如驗證通過，才會將表單值作為參數傳遞給提交處理器
  d. values 是由 handleSubmit 提供的，包含所有已驗證的表單數據 */
  const handleSignup = handleSubmit(async (values, { resetForm }): Promise<boolean> => {
    const isStepTwoValid = await validate()
    if (!isStepTwoValid.valid) {
      return false
    }
    try {
      const form: UserSignup = {
        name: values.signupName.trim(),
        email: userStore.savedEmail as string,
        password: userStore.savedPassword as string,
        phone: values.signupPhone.trim(),
        birthday: values.birthday,
        address: {
          zipcode: values.zipcode.trim(),
          city: values.city?.trim(),
          county: values.county?.trim(),
          detail: values.detail.trim()
        }
      }
      await userStore.signup(form)
      resetForm()
    } catch (err) {
      console.error('Error in handleSignup:', err)
    }
    return true
  })

  return {
    signupName: nameField.value,
    signupPhone: phoneField.value,
    birthday: birthdayField.value,
    zipcode: zipcodeField.value,
    city: cityField.value,
    county: countyField.value,
    detail: detailField.value,
    errors,
    handleSignup
  }
}
