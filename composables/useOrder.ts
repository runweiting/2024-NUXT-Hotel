import type { ApiDataResponse } from '~/types/api/ApiResponse'
import type { OrderItem, UseOrderReturn } from '~/types/Orders'

export const useOrder = (): UseOrderReturn => {
  const runtimeConfig = useRuntimeConfig()
  const { hexSchoolApiUrl } = runtimeConfig.public

  // 定義預設 room
  const defaultOrder: OrderItem = {
    userInfo: {
      address: {
        zipcode: '',
        city: '',
        county: '',
        detail: ''
      },
      name: '',
      phone: '',
      email: ''
    },
    _id: '',
    roomId: {
      name: '',
      description: '',
      imageUrl: '',
      imageUrlList: [],
      areaInfo: '',
      bedInfo: '',
      maxPeople: 0,
      price: 0,
      formattedPrice: '',
      totalPrice: 0,
      formattedTotalPrice: '',
      status: 0,
      layoutInfo: [],
      facilityInfo: [],
      amenityInfo: [],
      _id: '',
      createdAt: '',
      updatedAt: ''
    },
    checkInDate: '',
    checkOutDate: '',
    peopleNum: 0,
    status: 0,
    createdAt: '',
    updatedAt: '',
    formattedPrice: '',
    totalPrice: 0
  }
  // 共用的日期轉換函式
  const date2LocaleString = (date: string) => new Date(date).toLocaleDateString()
  // 共用的價格轉換函式
  const formatPrice = (price: number): string => {
    return price.toLocaleString('zh-TW', {
      style: 'currency',
      currency: 'TWD',
      // 設定最少 0 位小數，最多 0 位小數
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
  }

  const getOrderList = async () => {
    const { data, status, error, refresh } = await useFetchWithToken<ApiDataResponse<OrderItem[]>>(
      `${hexSchoolApiUrl}/api/v1/orders/`,
      {
        transform: (data: any) => {
          if (!data.status) return data
          return {
            ...data,
            result: data.result.map((order: OrderItem) => ({
              ...order,
              formattedPrice: formatPrice(order.roomId.price),
              createdAt: date2LocaleString(order.createdAt),
              updatedAt: date2LocaleString(order.updatedAt)
            }))
          }
        }
      }
    )
    const orderList = computed<OrderItem[]>(() => (data.value?.status ? data.value?.result : []))
    const hasError = computed(() => error.value !== null)
    const isLoading = computed(() => status.value === 'pending')

    return {
      orderList,
      hasError,
      isLoading,
      refresh
    }
  }

  const getOrderItem = async (orderId: string) => {
    const orderStore = useOrderStore()

    const { data, status, error, refresh } = await useFetchWithToken<ApiDataResponse<OrderItem>>(
      `${hexSchoolApiUrl}/api/v1/orders/${orderId}`,
      {
        transform: (data: any) => {
          if (!data.status) return data
          const order = data.result
          return {
            ...data,
            result: {
              ...order,
              checkInDate: date2LocaleString(order.checkInDate),
              checkOutDate: date2LocaleString(order.checkOutDate),
              formattedPrice: formatPrice(order.roomId.price),
              totalPrice: order.roomId.price * (orderStore.bookingDate?.daysCount ?? 1),
              createdAt: date2LocaleString(order.createdAt),
              updatedAt: date2LocaleString(order.updatedAt)
            }
          }
        }
      }
    )

    const order = computed<OrderItem>(() =>
      data.value?.status ? data.value?.result : defaultOrder
    )
    const hasError = computed(() => error.value !== null)
    const isLoading = computed(() => status.value === 'pending')

    return {
      order,
      hasError,
      isLoading,
      refresh
    }
  }

  return {
    getOrderList,
    getOrderItem
  }
}
