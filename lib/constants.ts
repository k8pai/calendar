import { format, set } from 'date-fns'

export const calendarViewModes = {
    DAY: 'day',
    WEEK: 'week',
    MONTH: 'month',
    YEAR: 'year',
    WEEKENDS: 'weekends',
} as const

export const clockViewModes = {
    TIMER: 'timer',
    ALARM: 'alarm',
    STOPWATCH: 'stopwatch',
    CLOCK: 'clock',
}

export const calendarTypes = [
    {
        label: 'Gregorian',
        value: 'gregorian',
    },
    {
        label: 'Hebrew',
        value: 'hebrew',
    },
    {
        label: 'Julian',
        value: 'julian',
    },
] as const

export const MONTHS = Array.from({ length: 12 }, (_, i) =>
    format(
        set(new Date(), {
            month: i,
        }),
        'MMMM'
    )
)

export default {
    calendarViewModes,
    calendarTypes,
    MONTHS,
}
