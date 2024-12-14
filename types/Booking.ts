export interface DateTimeProps {
  date: {
    start: string | null
    end: string | null
  }
  minDate: Date
  maxDate: Date
  daysCount: number
}
