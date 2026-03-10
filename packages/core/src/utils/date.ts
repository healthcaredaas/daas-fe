import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

// Configure dayjs
dayjs.locale('zh-cn')
dayjs.extend(relativeTime)
dayjs.extend(utc)
dayjs.extend(timezone)

export type DateInput = string | Date | number | dayjs.Dayjs

/**
 * Format date
 */
export function formatDate(date: DateInput, format = 'YYYY-MM-DD'): string {
  return dayjs(date).format(format)
}

/**
 * Format datetime
 */
export function formatDateTime(date: DateInput, format = 'YYYY-MM-DD HH:mm:ss'): string {
  return dayjs(date).format(format)
}

/**
 * Get relative time
 */
export function fromNow(date: DateInput): string {
  return dayjs(date).fromNow()
}

/**
 * Get current date
 */
export function getCurrentDate(format = 'YYYY-MM-DD'): string {
  return dayjs().format(format)
}

/**
 * Get current datetime
 */
export function getCurrentDateTime(format = 'YYYY-MM-DD HH:mm:ss'): string {
  return dayjs().format(format)
}

/**
 * Parse date
 */
export function parseDate(date: DateInput): dayjs.Dayjs {
  return dayjs(date)
}

/**
 * Check if date is valid
 */
export function isValidDate(date: DateInput): boolean {
  return dayjs(date).isValid()
}

/**
 * Get date range
 */
export function getDateRange(
  type: 'today' | 'yesterday' | 'week' | 'month' | 'year' | 'last7days' | 'last30days',
  format = 'YYYY-MM-DD'
): [string, string] {
  const now = dayjs()
  let start: dayjs.Dayjs
  let end: dayjs.Dayjs = now

  switch (type) {
    case 'today':
      start = now.startOf('day')
      end = now.endOf('day')
      break
    case 'yesterday':
      start = now.subtract(1, 'day').startOf('day')
      end = now.subtract(1, 'day').endOf('day')
      break
    case 'week':
      start = now.startOf('week')
      end = now.endOf('week')
      break
    case 'month':
      start = now.startOf('month')
      end = now.endOf('month')
      break
    case 'year':
      start = now.startOf('year')
      end = now.endOf('year')
      break
    case 'last7days':
      start = now.subtract(7, 'day').startOf('day')
      break
    case 'last30days':
      start = now.subtract(30, 'day').startOf('day')
      break
    default:
      start = now.startOf('day')
  }

  return [start.format(format), end.format(format)]
}

/**
 * Convert to UTC
 */
export function toUTC(date: DateInput): string {
  return dayjs(date).utc().format()
}

/**
 * Convert from UTC
 */
export function fromUTC(date: DateInput, tz = 'Asia/Shanghai'): string {
  return dayjs(date).tz(tz).format()
}

export { dayjs }