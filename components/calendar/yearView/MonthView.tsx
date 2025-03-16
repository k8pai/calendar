'use client'

import { useAppDispatch } from '@/hooks/useTypedSelectors'
import { cn } from '@/lib/utils'
import { setSelectedDate } from '@/slices/calendarSlice'
import {
    addDays,
    eachDayOfInterval,
    endOfMonth,
    format,
    getDay,
    isSameDay,
    isSameMonth,
    startOfMonth,
    subDays,
} from 'date-fns'
import { motion } from 'motion/react'
import React from 'react'

interface CalendarProps {
    view?: string
    monthDate: Date
    selectedDate: string
}

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

let events = {
    '2022-05-15': ['Meeting', 'Work'],
    '2022-05-16': ['Birthday'],
    '2022-05-17': ['Holiday'],
}

const MonthView: React.FC<CalendarProps> = ({ monthDate, selectedDate }) => {
    const dispatch = useAppDispatch()

    // const { selectedDate } = useAppSelector((state) => state.calendar)

    // TODO: Implement the logic to render the calendar grid based on the provided view and current date

    const firstDayOfMonth = startOfMonth(monthDate)
    const lastDayOfMonth = endOfMonth(monthDate)

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

    const allDays = [
        ...daysInPreviousMonth,
        ...daysInCurrentMonth,
        ...daysInNextMonth,
    ]
    // Example implementation:
    const setDate = (date: Date) => {
        dispatch(setSelectedDate(date.toISOString()))
    }

    return (
        <div className="flex-1 text-xs flex flex-col transition-all overflow-hidden ">
            <motion.div
                className={cn(`grid grid-cols-7 gap-1 border-b-0 `)}
                key={format(monthDate, 'ddMMMMuuuu') + ' - ' + 'header'}
                initial={{
                    opacity: 0,
                }}
                animate={{
                    opacity: 1,
                }}
                transition={{ duration: 0.3 }}
            >
                {WEEKDAYS.map((weekday, index) => {
                    return (
                        <div
                            className={cn(
                                `pb-0 transition-all text-center flex-0`
                            )}
                            key={`weekday-${weekday}-index`}
                        >
                            <div className="uppercase font-semibold text-sm">
                                {weekday}
                            </div>
                        </div>
                    )
                })}
            </motion.div>

            <motion.div
                className={cn(
                    `grid grid-cols-7 flex-1`,
                    Math.floor(allDays.length / 7) === 6 &&
                        'grid-rows-[repeat(6,minmax(0,1fr))]',
                    Math.floor(allDays.length / 7) === 5 &&
                        'grid-rows-[repeat(5,minmax(0,1fr))]'
                )}
                key={format(monthDate, 'ddMMMMuuuu') + ' - ' + 'body'}
                initial={{
                    opacity: 0,
                }}
                animate={{
                    opacity: 1,
                }}
                transition={{ duration: 0.3 }}
            >
                {allDays.map((day, index) => {
                    return (
                        <div
                            className={cn(
                                `cursor-pointer p-1 text-center flex flex-col flex-1 rounded-full w-auto`,
                                isSameDay(day, selectedDate) &&
                                    isSameMonth(selectedDate, monthDate) &&
                                    'bg-secondary font-bold'
                            )}
                            onClick={() => setDate(day)}
                            key={`${day.toString()}-day`}
                        >
                            {format(day, 'dd')}
                        </div>
                    )
                })}
            </motion.div>
        </div>
    )
}

export default MonthView
