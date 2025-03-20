export const viewModes = {
    DAY: 'day',
    WEEK: 'week',
    MONTH: 'month',
    YEAR: 'year',
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

export default {
    viewModes,
    calendarTypes,
}
