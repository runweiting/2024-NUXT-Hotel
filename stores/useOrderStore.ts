import type { ApiDataResponse } from '~/types/api/ApiResponse'
import type { OrderItem, OrderPost, OrderState } from '~/types/Orders'
import { date2LocaleString } from '~/utils/date2LocaleString'

export const useOrderStore = defineStore('order', () => {
  const { $apiClient } = useNuxtApp()
  const { successToast } = useSweetAlert()
  const userStore = useUserStore()

  // 定義狀態
  const currentDate = new Date()
  const orderState = reactive<OrderState>({
    bookingInfo: null,
    deleteOrderInfo: null,
    error: null,
    isLoading: false,
    bookingDate: {
      date: {
        start: date2LocaleString(currentDate),
        end: null
      },
      minDate: new Date(),
      maxDate: new Date(currentDate.setFullYear(currentDate.getFullYear() + 1)),
      nightsNum: 0
    },
    peopleNum: 1,
    roomId: '',
    totalPrice: 0
  })
  const orderList = ref<OrderItem[]>([])
  const pendingOrderList = ref<OrderItem[]>([])
  const canceledOrderList = ref<OrderItem[]>([])

  // 重置狀態
  const resetState = () => {
    orderState.bookingInfo = null
    orderState.deleteOrderInfo = null
    orderState.error = null
    orderState.isLoading = false
    if (orderState.bookingDate) {
      ;(orderState.bookingDate.date.start = date2LocaleString(currentDate)),
        (orderState.bookingDate.date.end = null)
    }
    orderState.peopleNum = 1
    orderState.roomId = ''
  }

  const getOrderList = async (): Promise<void> => {
    orderState.isLoading = true
    try {
      const res = await $apiClient.get<ApiDataResponse<OrderItem[]>>('/api/v1/orders/')

      const rawOrders = res.data.result || []
      orderList.value = rawOrders.map((order) => ({
        ...order,
        checkInDate: date2LocaleString(order.checkInDate),
        checkOutDate: date2LocaleString(order.checkOutDate),
        nightsNum: getNightsNum(order.checkInDate, order.checkOutDate),
        formattedPrice: formatPrice(order.roomId.price),
        totalPrice: order.roomId.price * getNightsNum(order.checkInDate, order.checkOutDate)
      }))
      pendingOrderList.value = orderList.value.filter((order) => order.status === 0)
      canceledOrderList.value = orderList.value.filter((order) => order.status === -1)
    } catch (err: any) {
      orderState.error = err.response?.data?.message
    } finally {
      orderState.isLoading = false
    }
  }

  const createOrder = async (payload: OrderPost): Promise<void> => {
    orderState.isLoading = true
    const isValid = await userStore.checkToken()
    if (!isValid) {
      navigateTo('/account/login')
    }
    try {
      const res = await $apiClient.post<ApiDataResponse<OrderItem>>('/api/v1/orders/', payload)
      if (res.data.status) {
        orderState.bookingInfo = res.data.result
        navigateTo(`/rooms/${payload.roomId}/confirmation/${orderState.bookingInfo._id}`)
        successToast('預定成功')
        resetState()
      }
    } catch (err: any) {
      orderState.error = err.response?.data?.message
    } finally {
      orderState.isLoading = false
    }
  }

  // 課程 API 測試無法刪除訂單，改用 filter 的方式
  const deleteOrder = async (orderId: string): Promise<void> => {
    orderState.isLoading = true
    try {
      const res = await $apiClient.delete(`/api/v1/orders/${orderId}`)
      if (res.data.status) {
        orderState.deleteOrderInfo = res.data.result
        successToast('取消訂單成功')
        await getOrderList()
      }
    } catch (err: any) {
      orderState.error = err.response?.data?.message
    } finally {
      orderState.isLoading = false
    }
  }

  return {
    getOrderList,
    orderList,
    pendingOrderList,
    canceledOrderList,
    createOrder,
    deleteOrder,
    resetState,
    bookingDate: computed(() => orderState.bookingDate),
    roomId: computed({
      get: () => orderState.roomId,
      set: (value: string) => (orderState.roomId = value)
    }),
    peopleNum: computed({
      get: () => orderState.peopleNum,
      set: (value: number) => (orderState.peopleNum = value)
    }),
    isLoading: computed(() => orderState.isLoading)
  }
})
