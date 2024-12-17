export const formatPrice = (price: number): string => {
  return price.toLocaleString('zh-TW', {
    style: 'currency',
    currency: 'TWD',
    // 設定最少 0 位小數，最多 0 位小數
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })
}
