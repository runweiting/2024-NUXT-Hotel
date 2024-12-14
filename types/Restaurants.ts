export interface RestaurantItem {
  _id: string
  title: string
  description: string
  diningTime: string
  image: string
  createdAt: string
  updatedAt: string
}

export interface UseRestaurantReturn {
  restaurantList: ComputedRef<RestaurantItem[]>
  hasError: ComputedRef<boolean>
  isLoading: ComputedRef<boolean>
  refresh: () => Promise<void>
}
