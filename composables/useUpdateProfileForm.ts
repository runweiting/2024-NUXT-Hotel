import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import type { UserPut } from '~/types/User'
import zipcodeData from '~/assets/tw-zipcode.json'

// 預先處理成 Set 提高查詢效能
const allZipcodes = new Set(Object.values(zipcodeData).flatMap((areas) => Object.values(areas)))

export const useUpdateProfileForm = () => {
  const userStore = useUserStore()

  // *頁面重新整理後，畫面的資料會消失
  // 使用 computed 來響應式獲取 userInfo
  const userInfo = computed(() => userStore.userInfo)

  // 1. z 定義 zod scheme 表單驗證規則 for stepTwo
  const schema = z.object({
    putName: z.string({ message: '姓名為必填' }).min(3, { message: '姓名不可少於 3 個字元' }),
    putPhone: z.string({ message: '手機為必填' }).regex(/^(09\d{8}|0\d{7,9})$/, {
      message: '請輸入正確的手機或市內電話號碼'
    }),
    putBirthday: z
      .string({ message: '生日為必填' })
      .regex(/^\d{4}-\d{2}-\d{2}$/, {
        message: '生日格式應為 yyyy-mm-dd'
      })
      // 驗證日期有效性
      .refine(
        (val) => {
          const date = new Date(val)
          return date instanceof Date && !isNaN(date.getTime())
        },
        { message: '請輸入有效的日期' }
      ),
    putZipcode: z
      .string({ message: '郵遞區號為必填' })
      .regex(/^\d{3}$/, { message: '郵遞區號格式錯誤' })
      // 驗證郵遞區號有效性
      .refine(
        (val) => {
          return allZipcodes.has(val)
        },
        { message: '請輸入正確的郵遞區號' }
      ),
    putCity: z.string().optional(), // 可選欄位
    putCounty: z.string().optional(), // 可選欄位
    putDetail: z
      .string({ message: '地址為必填' })
      .min(5, { message: '地址至少需要 5 個字元' })
      .max(100, { message: '地址不可超過 100 個字元' })
      .regex(/^[a-zA-Z0-9\u4e00-\u9fa5]+[巷弄號樓室]*[a-zA-Z0-9\u4e00-\u9fa5]*$/, {
        message: '請輸入正確的地址格式'
      })
  })

  // 2. useForm 轉換 schema 為 vee-validate schema
  const { handleSubmit, errors, setValues } = useForm({
    validationSchema: toTypedSchema(schema),
    // 設置初始值
    initialValues: {
      putName: '',
      putPhone: '',
      putBirthday: '',
      putZipcode: '',
      putCity: '',
      putCounty: '',
      putDetail: ''
    }
  })

  // 3. 監聽 userInfo 變化來更新表單值
  watch(
    userInfo,
    (newUserInfo) => {
      if (newUserInfo) {
        setValues({
          putName: newUserInfo?.name || '',
          putPhone: newUserInfo?.phone || '',
          putBirthday: newUserInfo?.birthday
            ? new Date(newUserInfo.birthday).toISOString().split('T')[0]
            : '',
          putZipcode: newUserInfo?.address?.zipcode.toString() || '',
          putCity: newUserInfo?.address.city || '',
          putCounty: newUserInfo?.address.county || '',
          putDetail: newUserInfo?.address?.detail || ''
        })
      }
    },
    { immediate: true }
  )

  // 4. useField 定義表單欄位並連結 scheme 內相應屬性
  const putNameField = useField<string>('putName')
  const putPhoneField = useField<string>('putPhone')
  const putBirthdayField = useField<string>('putBirthday')
  const putZipcodeField = useField<string>('putZipcode')
  const putCityField = useField<string>('putCity')
  const putCountyField = useField<string>('putCounty')
  const putDetailField = useField<string>('putDetail')

  // 5. 監聽 zipcodeField 自動填入 cityAreaField
  /* 為什麼用 for，不用 forEach？
  for...of 可直接 return 提前結束迭代、forEach 無法直接 return 結束整個迭代 */
  watch(
    () => putZipcodeField.value.value,
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
              putCityField.value.value = city
              putCountyField.value.value = county
              return // 立即結束兩層迴圈
            }
          }
        }
      }
    }
  )

  // 6. 在 setup 階段確保資料已載入
  onMounted(async () => {
    if (!userInfo.value) {
      await userStore.getProfile()
    }
  })

  /* 7. handleSubmit 的作用
  a. 執行表單驗證：在提交表單前，確保所有的欄位都通過驗證
  b. 收集表單數據：將所有欄位的值收集起來，組成一個 values 對象
  c. 處理提交邏輯：如驗證通過，才會將表單值作為參數傳遞給提交處理器
  d. values 是由 handleSubmit 提供的，包含所有已驗證的表單數據 */
  const handleUpdateProfile = handleSubmit(async (values, { resetForm }): Promise<void> => {
    try {
      const form: UserPut = {
        userId: userInfo.value?.id as string,
        name: values.putName.trim(),
        phone: values.putPhone.trim(),
        birthday: values.putBirthday,
        address: {
          zipcode: values.putZipcode.trim(),
          city: values.putCity?.trim(),
          county: values.putCounty?.trim(),
          detail: values.putDetail.trim()
        },
        oldPassword: userStore.newPassword as string,
        newPassword: userStore.oldPassword as string
      }
      // 更新用戶資料
      await userStore.updateProfile(form)
      // 重新獲取最新的用戶資料
      await userStore.getProfile()
      resetForm()
    } catch (err) {
      console.error('Error in handleUpdateProfile:', err)
    }
  })

  return {
    putName: putNameField.value,
    putPhone: putPhoneField.value,
    putBirthday: putBirthdayField.value,
    putZipcode: putZipcodeField.value,
    putCity: putCityField.value,
    putCounty: putCountyField.value,
    putDetail: putDetailField.value,
    errors,
    handleUpdateProfile
  }
}
