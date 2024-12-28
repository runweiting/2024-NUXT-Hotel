import { describe, it, expect } from 'vitest'
import axios from 'axios'

const {
  NUXT_PUBLIC_APP_API_URL,
  TEST_SIGNUP_EMAIL,
  TEST_SIGNUP_PASSWORD,
  TEST_SIGNUP_NAME,
  TEST_SIGNUP_PHONE,
  TEST_SIGNUP_BIRTHDAY,
  TEST_SIGNUP_ZIPCODE,
  TEST_SIGNUP_CITY,
  TEST_SIGNUP_COUNTY,
  TEST_SIGNUP_DETAIL
} = process.env

// describe 這個測試在做什麼
describe('POST /user/signup', () => {
  // test = it 你要測試的功能
  it('should register a user successfully', async () => {
    try {
      const payload = {
        name: TEST_SIGNUP_NAME,
        email: TEST_SIGNUP_EMAIL,
        password: TEST_SIGNUP_PASSWORD,
        phone: TEST_SIGNUP_PHONE,
        birthday: TEST_SIGNUP_BIRTHDAY,
        address: {
          zipcode: TEST_SIGNUP_ZIPCODE,
          city: TEST_SIGNUP_CITY,
          county: TEST_SIGNUP_COUNTY,
          detail: TEST_SIGNUP_DETAIL
        }
      }
      const res = await axios.post(`${NUXT_PUBLIC_APP_API_URL}/api/v1/user/signup`, payload)
      // expect 預期回傳值、狀態跟互動
      expect(res.status).toBe(200)
      expect(res.data.status).toBe(true)
      expect(res.data.result.email).toBe(TEST_SIGNUP_EMAIL)
    } catch (err: any) {
      if (err.response) {
        expect(err.response.status).toBe(400)
        expect(err.response.data.message).toBe('此 Email 已註冊')
      } else {
        throw err
      }
    }
  })
})
