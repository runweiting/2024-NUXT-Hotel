import type { ApiDataResponse } from './api/ApiResponse'
import type { UserAddress } from './User'
import type { RoomItem } from './Rooms'
import type { UseFetchOptions } from 'nuxt/app'
export interface DateTimeProps {
  date: {
    start: string
    end: string | null
  }
  minDate: Date
  maxDate: Date
  nightsNum: number
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
  nightsNum: number
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
  getOrderItem: (orderId: string) => Promise<{
    order: ComputedRef<OrderItem>
    hasError: ComputedRef<boolean>
    isLoading: ComputedRef<boolean>
    refresh: (opts?: UseFetchOptions<unknown>) => Promise<void>
  }>
}
