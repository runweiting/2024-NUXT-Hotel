export const getNightsNum = (
  startDate: string | Date | null,
  endDate: string | Date | null
): number => {
  if (!startDate || !endDate) return 0

  const start = new Date(startDate).getTime()
  const end = new Date(endDate).getTime()

  if (isNaN(start) || isNaN(end)) return 0 // 防止無效日期

  const oneDay = 24 * 60 * 60 * 1000
  return Math.round(Math.abs((start - end) / oneDay))
}
