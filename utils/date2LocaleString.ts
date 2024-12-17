export const date2LocaleString = (date: string | Date) => {
  const parsedDate = new Date(date)
  if (isNaN(parsedDate.getTime())) return '' // 處理無效日期
  return parsedDate.toISOString().split('T')[0]
}
