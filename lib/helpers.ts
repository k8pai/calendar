import { COPTIC_MONTHS } from '@/lib/constants'
import {
    addDays,
    addYears,
    eachDayOfInterval,
    endOfMonth,
    format,
    getDay,
    isLeapYear,
    set,
    startOfMonth,
    subDays,
    subYears,
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

export const getCopticDays = (date: Date) => {
    const currentCopticMappedGregorianYear =
        date.getMonth() >= 9 && date.getDate() >= 11 ? addYears(date, 1) : date

    let is_leap_year = isLeapYear(currentCopticMappedGregorianYear)
    let copticYearDetails = {
        year: currentCopticMappedGregorianYear.getFullYear() - 284,
    }

    let gregorianCopticMap: Record<
        string,
        { day: any; month: any; year: any }
    > = {}
    let gregorianCopticArray: Array<{
        day: any
        month: any
        year: any
    }> = []

    let copticStartDate = set(date, {
        year:
            date.getMonth() >= 9 && date.getDate() >= 11
                ? date.getFullYear()
                : subYears(date, 1).getFullYear(),
        month: 8,
        date: is_leap_year ? 12 : 11,
    })

    let currIterMonth = 0,
        iterDay = 1
    const copticYearDays = eachDayOfInterval({
        start: copticStartDate,
        end: addYears(subDays(copticStartDate, 1), 1),
    }).map((el, index) => {
        let currMonth = COPTIC_MONTHS[currIterMonth]
        let details = {
            day: iterDay,
            month: currMonth,
            year: copticYearDetails.year,
            date: format(el, 'dd MM uuuu'),
        }
        gregorianCopticMap[format(el, 'ddMMMMuuuu')] = details
        gregorianCopticArray.push(details)

        if (iterDay >= 30) {
            currIterMonth += 1
            iterDay = 1
        } else {
            iterDay += 1
        }
        return format(el, 'dd/MM/yyyy')
    })

    // console.log(copticYearDays)
    console.log(date)
    console.log(currentCopticMappedGregorianYear)
    console.log(gregorianCopticArray[0])
    console.log(gregorianCopticArray[gregorianCopticArray.length - 1])
    // console.log(Object.values(gregorianCopticMap))

    if (is_leap_year) {
        // if the current month is greater than september 11 then that means the current year a new year, and the offset will be 285, else
        // 284 years is what is the offset between
        if (date.getMonth() >= 9) {
            if (date.getDate() > 11) {
                copticYearDetails.year = date.getFullYear() - 285
            } else {
                copticYearDetails.year = date.getFullYear() - 284
            }
        } else {
            copticYearDetails.year = date.getFullYear() - 284
        }

        // start with september 12th from previous year.

        let daysOfCurrentCopticYear = subYears(date, 1)
    }

    return {
        gregorianDays: gregorianCopticMap,
    }
}
