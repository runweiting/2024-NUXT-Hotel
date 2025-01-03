export interface NewsItem {
  _id: string
  title: string
  description: string
  image: string
  createdAt: string
  updatedAt: string
}

export interface UseNewsReturn {
  newsList: ComputedRef<NewsItem[]>
  hasError: ComputedRef<boolean>
  isLoading: ComputedRef<boolean>
  refresh: () => Promise<void>
}
