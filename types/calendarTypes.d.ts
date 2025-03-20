import { calendarTypes, viewModes } from '@/lib/constants'

export type ViewModeType = (typeof viewModes)[keyof typeof viewModes]
export type CalendarModeType = (typeof calendarTypes)[number]['value']
