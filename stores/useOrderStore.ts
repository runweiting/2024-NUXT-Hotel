import type { ApiDataResponse } from '~/types/api/ApiResponse'
import type { OrderItem, OrderPost, OrderState } from '~/types/Orders'

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
        start: currentDate.toISOString().split('T')[0],
        end: null as string | null
      },
      minDate: new Date(),
      maxDate: new Date(currentDate.setFullYear(currentDate.getFullYear() + 1)),
      daysCount: 0
    },
    peopleNum: 1,
    roomId: '',
    totalPrice: 0
  })

  // 重置狀態
  const resetState = () => {
    orderState.error = null
    orderState.isLoading = false
    orderState.bookingDate = null
    orderState.peopleNum = 1
    orderState.roomId = ''
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
      }
    } catch (err: any) {
      orderState.error = err.response?.data?.message
    } finally {
      orderState.isLoading = false
    }
  }

  const deleteOrder = async (orderId: string): Promise<void> => {
    orderState.isLoading = true
    try {
      const res = await $apiClient.delete(`/api/v1/orders/${orderId}`)
      if (res.data.status) {
        orderState.deleteOrderInfo = res.data.result
        successToast('取消訂單成功')
      }
    } catch (err: any) {
      orderState.error = err.response?.data?.message
    } finally {
      orderState.isLoading = false
    }
  }

  return {
    createOrder,
    deleteOrder,
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
