import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import type { OrderPost } from '~/types/Orders'
import zipcodeData from '~/assets/tw-zipcode.json'

// 預先處理成 Set 提高查詢效能
const allZipcodes = new Set(Object.values(zipcodeData).flatMap((areas) => Object.values(areas)))

export const useOrderProfileForm = () => {
  const orderStore = useOrderStore()
  const userStore = useUserStore()
  const { warningToast } = useSweetAlert()

  // 1. z 定義 zod scheme 表單驗證規則
  const schema = z.object({
    bookingName: z.string({ message: '姓名為必填' }).min(3, { message: '姓名不可少於 3 個字元' }),
    bookingEmail: z
      .string({ message: 'Email為必填' })
      .email({ message: '請輸入有效的 Email 格式' }),
    bookingPhone: z.string({ message: '手機為必填' }).regex(/^(09\d{8}|0\d{7,9})$/, {
      message: '請輸入正確的手機或市內電話號碼'
    }),
    bookingZipcode: z
      .string({ message: '郵遞區號為必填' })
      .regex(/^\d{3}$/, { message: '郵遞區號格式錯誤' })
      // 驗證郵遞區號有效性
      .refine(
        (val) => {
          return allZipcodes.has(val)
        },
        { message: '請輸入正確的郵遞區號' }
      ),
    bookingCity: z.string().optional(), // 可選欄位
    bookingCounty: z.string().optional(), // 可選欄位
    bookingDetail: z
      .string({ message: '地址為必填' })
      .min(5, { message: '地址至少需要 5 個字元' })
      .max(100, { message: '地址不可超過 100 個字元' })
      .regex(/^[a-zA-Z0-9\u4e00-\u9fa5]+[巷弄號樓室]*[a-zA-Z0-9\u4e00-\u9fa5]*$/, {
        message: '請輸入正確的地址格式'
      })
  })

  // 2. useForm 轉換 schema 為 vee-validate schema
  const { handleSubmit, errors, setValues } = useForm({
    validationSchema: toTypedSchema(schema)
  })

  // 3. useField 定義表單欄位並連結 scheme 內相應屬性
  const bookingNameField = useField<string>('bookingName')
  const bookingEmailField = useField<string>('bookingEmail')
  const bookingPhoneField = useField<string>('bookingPhone')
  const bookingZipcodeField = useField<string>('bookingZipcode')
  const bookingCityField = useField<string>('bookingCity')
  const bookingCountyField = useField<string>('bookingCounty')
  const bookingDetailField = useField<string>('bookingDetail')

  // 4. 監聽 zipcodeField 自動填入 cityAreaField
  /* 為什麼用 for，不用 forEach？
  for...of 可直接 return 提前結束迭代、forEach 無法直接 return 結束整個迭代 */
  watch(
    () => bookingZipcodeField.value.value,
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
              bookingCityField.value.value = city
              bookingCountyField.value.value = county
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
  const handleProfile = handleSubmit(async (values, { resetForm }): Promise<void> => {
    try {
      const form: OrderPost = {
        userInfo: {
          address: {
            zipcode: values.bookingZipcode.trim(),
            city: values.bookingCity?.trim(),
            county: values.bookingCounty?.trim(),
            detail: values.bookingDetail.trim()
          },
          name: values.bookingName.trim(),
          phone: values.bookingPhone.trim(),
          email: values.bookingEmail.trim()
        },
        roomId: orderStore.roomId,
        checkInDate: orderStore.bookingDate?.date.start as string,
        checkOutDate: orderStore.bookingDate?.date.end as string,
        peopleNum: orderStore.peopleNum
      }
      await orderStore.createOrder(form)
      resetForm()
    } catch (err) {
      console.error('Error in handleProfile:', err)
    }
  })

  const handleCopyUser = () => {
    const userInfo = userStore.userInfo
    if (userInfo?._id) {
      setValues({
        bookingName: userInfo.name,
        bookingEmail: userInfo.email,
        bookingPhone: userInfo.phone,
        bookingZipcode: userInfo.address.zipcode.toString(),
        bookingCity: userInfo.address.city,
        bookingCounty: userInfo.address.county,
        bookingDetail: userInfo.address.detail
      })
    } else {
      warningToast('請先登入會員')
      navigateTo('/account/login')
    }
  }

  return {
    bookingName: bookingNameField.value,
    bookingEmail: bookingEmailField.value,
    bookingPhone: bookingPhoneField.value,
    bookingZipcode: bookingZipcodeField.value,
    bookingCity: bookingCityField.value,
    bookingCounty: bookingCountyField.value,
    bookingDetail: bookingDetailField.value,
    errors,
    handleProfile,
    handleCopyUser
  }
}
