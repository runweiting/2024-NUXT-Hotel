import type { ApiDataResponse } from '~/types/api/ApiResponse'
import type { RoomItem, UseRoomReturn } from '~/types/Rooms'
import { formatPrice } from '~/utils/formatPrice'

export const useRoom = (): UseRoomReturn => {
  const runtimeConfig = useRuntimeConfig()
  const { appApiUrl } = runtimeConfig.public

  // 定義預設 room
  const defaultRoom: RoomItem = {
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
  }

  const getRoomList = async () => {
    const { data, status, error, refresh } = await useFetch<ApiDataResponse<RoomItem[]>>(
      `${appApiUrl}/api/v1/rooms`,
      {
        transform: (data) => {
          if (!data.status) return data
          return {
            ...data,
            result: data.result.map((room: RoomItem) => ({
              ...room,
              formattedPrice: formatPrice(room.price)
            }))
          }
        }
      }
    )
    const roomList = computed<RoomItem[]>(() => (data.value?.status ? data.value?.result : []))
    const hasError = computed(() => error.value !== null)
    const isLoading = computed(() => status.value === 'pending')

    return {
      roomList,
      hasError,
      isLoading,
      refresh
    }
  }
  const getRoomItem = async (roomId: string) => {
    const orderStore = useOrderStore()

    const { data, status, error, refresh } = await useFetch<ApiDataResponse<RoomItem>>(
      `${appApiUrl}/api/v1/rooms/${roomId}`,
      {
        transform: (data) => {
          if (!data.status) return data
          const room = data.result
          return {
            ...data,
            result: {
              ...room,
              formattedPrice: formatPrice(room.price),
              totalPrice: room.price * (orderStore.bookingDate?.nightsNum ?? 1),
              formattedTotalPrice: formatPrice(
                room.price * (orderStore.bookingDate?.nightsNum ?? 1)
              )
            }
          }
        }
      }
    )
    const room = computed<RoomItem>(() => (data.value?.status ? data.value?.result : defaultRoom))
    const hasError = computed(() => error.value !== null)
    const isLoading = computed(() => status.value === 'pending')

    // 儲存 roomId 到 store
    orderStore.roomId = roomId

    return {
      room,
      hasError,
      isLoading,
      refresh
    }
  }

  return {
    getRoomList,
    getRoomItem
  }
}
