'use client'

import Day from '@/components/calendar/monthView/day'
import { useCalendarAction } from '@/hooks/useCalendarActions'
import { useAppSelector } from '@/hooks/useTypedSelectors'
import { cn } from '@/lib/utils'
import {
    addDays,
    eachDayOfInterval,
    endOfWeek,
    format,
    getDay,
    startOfWeek,
    subDays,
} from 'date-fns'
import { motion } from 'motion/react'
import React from 'react'

interface CalendarProps {
    view?: string
    selectedDate?: Date
}

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const Week: React.FC<CalendarProps> = ({ view }) => {
    const { selectedDate } = useAppSelector((state) => state.calendar)
    const { lastAction } = useCalendarAction()

    // TODO: Implement the logic to render the calendar grid based on the provided view and current date
    const firstDayOfWeek = startOfWeek(selectedDate)
    const lastDayOfWeek = endOfWeek(selectedDate)

    const firstDayWeekday = getDay(firstDayOfWeek) // 0 for Sunday, 1 for Monday, etc.
    const lastDayWeekday = getDay(lastDayOfWeek) // 0 for Sunday, 1 for Monday, etc.

    const daysInPreviousMonth =
        firstDayWeekday > 0
            ? eachDayOfInterval({
                  start: subDays(firstDayOfWeek, firstDayWeekday),
                  end: subDays(firstDayOfWeek, 7),
              })
            : []

    const daysInCurrentWeek = eachDayOfInterval({
        start: firstDayOfWeek,
        end: lastDayOfWeek,
    })

    // Calculate the remaining days to fill the last row (so that the grid is 6 rows of 7 columns)
    const remainingDays = 6 - lastDayWeekday
    const daysInNextMonth =
        remainingDays > 0
            ? eachDayOfInterval({
                  start: addDays(lastDayOfWeek, 7),
                  end: addDays(lastDayOfWeek, remainingDays),
              })
            : []

    const allDays = [
        ...daysInPreviousMonth,
        ...daysInCurrentWeek,
        ...daysInNextMonth,
    ]
    // Example implementation:

    return (
        <div className="flex-1 flex flex-col transition-all overflow-hidden">
            <motion.div
                className={cn(`grid grid-cols-7 gap-1 border-b-0 `)}
                key={format(selectedDate, 'ddMMMMuuuu') + ' - ' + 'header'}
                initial={{
                    opacity: 0,
                    transform: `translateX(${
                        lastAction === 'P'
                            ? '-20%'
                            : lastAction === 'N'
                            ? '20%'
                            : '0%'
                    })`,
                }}
                animate={{
                    opacity: 1,
                    transform: 'translateX(0%)',
                }}
                transition={{ duration: 0.3 }}
            >
                {WEEKDAYS.map((weekday, index) => {
                    return (
                        <div
                            className={cn(
                                `border border-b-0 rounded-tl-md rounded-tr-md p-2 pb-0 transition-all text-center flex-0`
                            )}
                            key={index}
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
                    `grid grid-cols-7 gap-1 flex-1`,
                    Math.floor(allDays.length / 7) === 6 &&
                        'grid-rows-[repeat(6,minmax(0,1fr))]',

                    Math.floor(allDays.length / 7) === 5 &&
                        'grid-rows-[repeat(5,minmax(0,1fr))]'
                )}
                key={format(selectedDate, 'ddMMMMuuuu') + ' - ' + 'body'}
                initial={{
                    opacity: 0,
                    transform: `translateX(${
                        lastAction === 'P'
                            ? '-20%'
                            : lastAction === 'N'
                            ? '20%'
                            : '0%'
                    })`,
                }}
                animate={{
                    opacity: 1,
                    transform: 'translateX(0%)',
                }}
                transition={{ duration: 0.3 }}
            >
                {allDays.map((day, index) => {
                    return (
                        <Day
                            day={day}
                            index={index}
                            events={[]}
                            key={`${format(day, 'ddMMuuuu')}${index}}`}
                        />
                    )
                })}
            </motion.div>
        </div>
    )
}

export default Week
