import { COPTIC_MONTHS } from '@/lib/constants'
import {
    addDays,
    addYears,
    eachDayOfInterval,
    endOfMonth,
    format,
    getDay,
    isBefore,
    isLeapYear,
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

export const getCopticDays = (date: Date) => {
    const year = date.getFullYear()
    const nextGregorianLeap = isLeapYear(addYears(date, 1))
    const potentialStart = new Date(year, 8, nextGregorianLeap ? 12 : 11) // Sept 11 or 12

    let copticYearStart = isBefore(date, potentialStart)
        ? new Date(year - 1, 8, isLeapYear(date) ? 12 : 11)
        : potentialStart

    let copticYearDetails = {
        year:
            copticYearStart.getFullYear() -
            (copticYearStart.getFullYear() === date.getFullYear() ? 285 : 284),
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

    let currIterMonth = 0,
        iterDay = 1

    const copticYearDays = eachDayOfInterval({
        start: copticYearStart,
        end: addYears(subDays(copticYearStart, 1), 1),
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

        if (
            details.day === 1 ||
            details.day === 30 ||
            details.month === 'Nasi'
        ) {
            console.log(
                `coptic year day: ${details.day} date: ${details.date} month: ${details.month} year: ${details.year}`
                // gregorianCopticArray[gregorianCopticArray.length - 1]
            )
        }
        return format(el, 'dd/MM/yyyy')
    })

    console.log('copticYearDays', copticYearDays.length)
    // asdfjalskjdf sd

    // const sameGregorianAndCopticYear =
    //     date.getMonth() >= 8 && date.getDate() >= 11

    // console.log('year => ', year + 1, nextGregorianLeap)

    // const currentCopticMappedGregorianYear = sameGregorianAndCopticYear
    //     ? addYears(date, 1)
    //     : date

    // let is_leap_year = isLeapYear(currentCopticMappedGregorianYear)

    // const followingYear = copticYearStart.getFullYear() + 1
    // const isCopticLeap = isLeapYear(followingYear)

    // const copticYearEnd = addDays(
    //     copticYearStart,
    //     365 + (isLeapYear(year) ? 1 : 0)
    // )
    // let copticEndDate = set(date, {
    //     year: addYears(copticYearStart, 1).getFullYear(),
    //     month: 8,
    //     date: is_leap_year ? 10 : 10,
    // })

    // console.log('copticYearStart only', gregorianCopticArray[0])
    // console.log(
    //     'copticYearStart end only',
    //     gregorianCopticArray[gregorianCopticArray.length - 1]
    // )
    // console.log(Object.values(gregorianCopticMap))
    return {
        gregorianDays: gregorianCopticMap,
    }
}

export const getCopticYear = (date: Date) => {
    if (date.getMonth() >= 9 && date.getDate() >= 11) {
        return date.getFullYear() - 285
    } else {
        return date.getFullYear() - 284
    }
}

export const getCopticDate = (date: Date) => {
    let { gregorianDays } = getCopticDays(date)
    if (gregorianDays[format(date, 'ddMMMMuuuu')]) {
        return gregorianDays[format(date, 'ddMMMMuuuu')]
    }
    return null
}

export const getCopticContents = (date: Date) => {
    // lets assume to start with 11th sepetember which is the usual case.

    const monthMap = COPTIC_MONTHS.reduce((acc, el, index) => {
        let indexKey = index + 1
        if (indexKey <= 12) {
            acc[`${index + 1}`] = {
                month: el,
                days: 30,
                leapyearDays: 30,
            }
        } else {
            acc[`${index + 1}`] = {
                month: el,
                days: 5,
                leapyearDays: 6,
            }
        }
        return acc
    }, {} as Record<string, any>)

    console.log(monthMap)
}
