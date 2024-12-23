import jwt, { type JwtPayload } from 'jsonwebtoken'

// 因為 payload 裡沒有 email，所以這支 API 沒有用到
// payload: { userId: '6767d022bb915c2baf185073', iat: 1734857904, exp: 1735462704 }
export default defineEventHandler(async (event) => {
  const { jwtSecret } = useRuntimeConfig()
  const { token } = await readBody<{ token: string }>(event)
  if (!token) {
    throw createError({
      statusCode: 400,
      message: 'Token 不存在'
    })
  }

  try {
    const payload = jwt.verify(token, jwtSecret) as JwtPayload

    // 驗證 email 是否為管理員
    const isAdmin = payload.email === 'admin@test.com'
    return { isAdmin }
  } catch (err: any) {
    throw createError({ statusCode: 401, message: 'Token 驗證失敗' })
  }
})
