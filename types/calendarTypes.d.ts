import { calendarTypes, calendarViewModes } from '@/lib/constants'

export type ViewModeType =
    (typeof calendarViewModes)[keyof typeof calendarViewModes]
export type CalendarModeType = (typeof calendarTypes)[number]['value']
