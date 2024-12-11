export interface UserAddress {
  zipcode: string
  detail: string
  city?: string
  county?: string
}

export interface BaseUserInfo {
  _id: string
  id: string
  name: string
  email: string
  phone: string
  birthday: string
  address: UserAddress
  createdAt: string
  updatedAt: string
}

export interface UserLogin {
  email: string
  password: string
}

export interface UserSignup extends UserLogin {
  name: string
  phone: string
  birthday: string
  address: UserAddress
}

export interface UserForgot {
  email: string
  code: string
  newPassword: string
}

export interface PutUser {
  userId: string
  name: string
  phone: string
  birthday: string
  address: UserAddress
  oldPassword: string
  newPassword: string
}

export interface UserBooking {
  address: UserAddress
  name: string
  phone: string
  email: string
}

export interface BookingPayload {
  roomId: string
  checkInDate: string
  checkOutDate: string
  peopleNum: number
  userInfo: UserBooking
}

export interface UserState {
  userInfo: BaseUserInfo | null
  token: string
  error: string | null
  isLoading: boolean
  isLogin: boolean
  savedEmail: string | null
  savedPassword: string | null
}
