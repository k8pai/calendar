import { format, set } from 'date-fns'

export const viewModes = {
    DAY: 'day',
    WEEK: 'week',
    MONTH: 'month',
    YEAR: 'year',
    WEEKENDS: 'weekends',
} as const

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
    viewModes,
    calendarTypes,
    MONTHS,
}
