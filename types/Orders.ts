import type { UserAddress } from './User'
import type { RoomItem } from './Rooms'
import type { UseFetchOptions } from 'nuxt/app'

export interface DateTimeProps {
  date: {
    start: string | null
    end: string | null
  }
  minDate: Date
  maxDate: Date
  daysCount: number
}

export interface OrderItem {
  userInfo: {
    address: UserAddress
    name: string
    phone: string
    email: string
  }
  _id: string
  roomId: RoomItem
  checkInDate: string
  checkOutDate: string
  peopleNum: number
  status: number
  createdAt: string
  updatedAt: string
  formattedPrice: string
  totalPrice: number
}

export interface OrderPost {
  userInfo: {
    address: UserAddress
    name: string
    phone: string
    email: string
  }
  roomId: string
  checkInDate: string
  checkOutDate: string
  peopleNum: number
}

export interface OrderState {
  bookingInfo: OrderItem | null
  deleteOrderInfo: OrderItem | null
  error: string | null
  isLoading: boolean
  bookingDate: DateTimeProps | null
  peopleNum: number
  roomId: string
  totalPrice: number
}

// composable response type
export interface UseOrderReturn {
  getOrderList: () => Promise<{
    orderList: ComputedRef<OrderItem[]> // 已經過處理的資料
    hasError: ComputedRef<boolean> // 錯誤狀態
    isLoading: ComputedRef<boolean> // 載入狀態
    refresh: () => Promise<void> // 重新載入方法
  }>
  getOrderItem: (orderId: string) => Promise<{
    order: ComputedRef<OrderItem>
    hasError: ComputedRef<boolean>
    isLoading: ComputedRef<boolean>
    refresh: (opts?: UseFetchOptions<unknown>) => Promise<void>
  }>
}
