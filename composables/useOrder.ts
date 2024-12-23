import type { ApiDataResponse } from '~/types/api/ApiResponse'
import type { OrderItem, UseOrderReturn } from '~/types/Orders'
import { formatPrice } from '~/utils/formatPrice'
import { date2LocaleString } from '~/utils/date2LocaleString'
import { getNightsNum } from '~/utils/getNightsNum'

export const useOrder = (): UseOrderReturn => {
  const runtimeConfig = useRuntimeConfig()
  const { appApiUrl } = runtimeConfig.public

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
    nightsNum: 0,
    status: 0,
    originalCreatedAt: '',
    createdAt: '',
    updatedAt: '',
    formattedPrice: '',
    totalPrice: 0
  }

  const getOrderItem = async (orderId: string) => {
    const { data, status, error, refresh } = await useFetch<ApiDataResponse<OrderItem>>(
      `${appApiUrl}/api/v1/orders/${orderId}`,
      {
        headers: {
          Authorization: `Bearer ${useCookie('myToken').value}`
        },
        transform: (data: any) => {
          if (!data.status) return data
          const order = data.result
          return {
            ...data,
            result: {
              ...order,
              checkInDate: date2LocaleString(order.checkInDate),
              checkOutDate: date2LocaleString(order.checkOutDate),
              nightsNum: getNightsNum(order.checkInDate, order.checkOutDate),
              formattedPrice: formatPrice(order.roomId.price),
              totalPrice: order.roomId.price * getNightsNum(order.checkInDate, order.checkOutDate)
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
    getOrderItem
  }
}
