import { z } from 'zod'
import zipcodeData from '~/assets/tw-zipcode.json'

// 預先處理成 Set 提高查詢效能
const allZipcodes = new Set(Object.values(zipcodeData).flatMap((areas) => Object.values(areas)))

export const emailSchema = z
  .string({ message: 'Email為必填' })
  .email({ message: '請輸入有效的 Email 格式' })

export const passwordSchema = z
  .string({ message: '密碼為必填' })
  .min(8, { message: '密碼需至少 8 碼' })
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
    message: '密碼必須包含大小寫英文字母和數字'
  })

export const nameSchema = z
  .string({ message: '姓名為必填' })
  .min(3, { message: '姓名不可少於 3 個字元' })

export const phoneSchema = z.string({ message: '手機為必填' }).regex(/^(09\d{8}|0\d{7,9})$/, {
  message: '請輸入正確的手機或市內電話號碼'
})

export const birthdaySchema = z
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
  )

export const zipcodeSchema = z
  .string({ message: '郵遞區號為必填' })
  .regex(/^\d{3}$/, { message: '郵遞區號格式錯誤' })
  // 驗證郵遞區號有效性
  .refine(
    (val) => {
      return allZipcodes.has(val)
    },
    { message: '請輸入正確的郵遞區號' }
  )

export const detailSchema = z
  .string({ message: '地址為必填' })
  .min(5, { message: '地址至少需要 5 個字元' })
  .max(100, { message: '地址不可超過 100 個字元' })
  .regex(/^[a-zA-Z0-9\u4e00-\u9fa5]+[巷弄號樓室]*[a-zA-Z0-9\u4e00-\u9fa5]*$/, {
    message: '請輸入正確的地址格式'
  })
