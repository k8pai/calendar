import {
    addDays,
    eachDayOfInterval,
    endOfMonth,
    format,
    getDay,
    set,
    startOfMonth,
    subDays,
} from 'date-fns'

export const getSelectedMonthDays = (selectedDate: string) => {
    const firstDayOfMonth = startOfMonth(selectedDate)
    const lastDayOfMonth = endOfMonth(selectedDate)

    const firstDayWeekday = getDay(firstDayOfMonth) // 0 for Sunday, 1 for Monday, etc.
    const lastDayWeekday = getDay(lastDayOfMonth) // 0 for Sunday, 1 for Monday, etc.

    const daysInPreviousMonth =
        firstDayWeekday > 0
            ? eachDayOfInterval({
                  start: subDays(firstDayOfMonth, firstDayWeekday),
                  end: subDays(firstDayOfMonth, 1),
              })
            : []

    const daysInCurrentMonth = eachDayOfInterval({
        start: firstDayOfMonth,
        end: lastDayOfMonth,
    })

    // Calculate the remaining days to fill the last row (so that the grid is 6 rows of 7 columns)
    const remainingDays = 6 - lastDayWeekday
    const daysInNextMonth =
        remainingDays > 0
            ? eachDayOfInterval({
                  start: addDays(lastDayOfMonth, 1),
                  end: addDays(lastDayOfMonth, remainingDays),
              })
            : []

    return [...daysInPreviousMonth, ...daysInCurrentMonth, ...daysInNextMonth]
}

export const getMonths = () => {
    return Array.from({ length: 12 }, (_, i) =>
        format(
            set(new Date(), {
                month: i,
            }),
            'MMMM'
        )
    )
}

export const isSubString = (str1: string, str2: string) => {
    let condition = false

    if (str1.length > str2.length) {
        condition = str1.includes(str2)
    } else {
        condition = str2.includes(str1)
    }
    return condition
}
