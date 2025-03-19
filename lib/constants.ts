interface viewModesType {
    DAY: 'day'
    WEEK: 'week'
    MONTH: 'month'
    YEAR: 'year'
}

export const viewModes: viewModesType = {
    DAY: 'day',
    WEEK: 'week',
    MONTH: 'month',
    YEAR: 'year',
}

export type calendarViewModeTypes = {
    label: string
    value: string
}

export const calendarTypes: Array<calendarViewModeTypes> = [
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
]
export default {
    viewModes,
}
