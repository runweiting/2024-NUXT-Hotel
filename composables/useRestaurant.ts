import type { ApiDataResponse } from '~/types/api/ApiResponse'
import type { RestaurantItem, UseRestaurantReturn } from '~/types/Restaurants'

export const useRestaurant = (): UseRestaurantReturn => {
  const runtimeConfig = useRuntimeConfig()
  const { hexSchoolApiUrl } = runtimeConfig.public

  const { data, status, error, refresh } = useFetch<ApiDataResponse<RestaurantItem[]>>(
    `${hexSchoolApiUrl}/api/v1/home/culinary/`,
    {
      transform: (data: any) => {
        /* Type Narrowing 型別縮小：
        1. TypeScript 需在每個程式碼區塊中確定值的型別
        2. 通過條件判斷，幫助 TypeScript 縮小型別範圍
        3. 這樣檢查可避免執行時錯誤 */
        // TypeScript 知道是 ErrorResponse
        if (!data.status) return data
        // TypeScript 知道是 SuccessResponse
        return {
          ...data, // 原始 data
          result: data.result.map((restaurant: RestaurantItem) => ({
            ...restaurant,
            createdAt: date2LocaleString(restaurant.createdAt),
            updatedAt: date2LocaleString(restaurant.updatedAt)
          })) // 將原始 data.result 進行格式化，返回更新後的 result
        }
      }
    }
  )
  const restaurantList = computed(() => (data.value?.status ? data.value.result : []))
  const hasError = computed(() => error.value !== null)
  const isLoading = computed(() => status.value === 'pending')
  const date2LocaleString = (date: string) => new Date(date).toLocaleDateString()
  return {
    restaurantList,
    hasError,
    isLoading,
    refresh
  }
}
