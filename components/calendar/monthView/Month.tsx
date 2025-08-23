'use client'

import Day from '@/components/calendar/monthView/day'
import { useCalendarAction } from '@/hooks/useCalendarActions'
import { useAppSelector } from '@/hooks/useTypedSelectors'
import { getSelectedMonthDays } from '@/lib/helpers'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { motion } from 'motion/react'
import React, { useMemo } from 'react'

interface CalendarProps {
    view?: string
    selectedDate?: Date
}

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

let events = {
    '2022-05-15': ['Meeting', 'Work'],
    '2022-05-16': ['Birthday'],
    '2022-05-17': ['Holiday'],
}

const Month: React.FC<CalendarProps> = ({ view }) => {
    const { selectedDate } = useAppSelector((state) => state.calendar)
    const { lastAction } = useCalendarAction()

    const allDays = useMemo(
        () => getSelectedMonthDays(selectedDate),
        [selectedDate]
    )

    return (
        <div className="flex-1 flex flex-col transition-all overflow-hidden">
            <motion.div
                className={cn(`grid grid-cols-7 gap-1 border-b-0 `)}
                key={format(selectedDate, 'MMMM') + ' - ' + 'header'}
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
                transition={{ duration: 0.1 }}
            >
                {WEEKDAYS.map((weekday, index) => {
                    return (
                        <div
                            className={cn(
                                `border border-b-0 rounded-tl-md rounded-tr-md p-2 pb-0 transition-all text-center flex-0`,
                                weekday === 'Sat' && 'bg-secondary',
                                weekday === 'Sun' && 'bg-green-100/50'
                            )}
                            key={index}
                        >
                            <div className="uppercase font-bold text-sm">
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
                key={`${format(selectedDate, 'MMMMuuuu')}-header`}
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
                transition={{ duration: 0.1 }}
            >
                {allDays.map((day, index) => {
                    return (
                        <Day
                            day={day}
                            index={index}
                            key={`${format(day, 'ddMMuuuu')}}`}
                        />
                    )
                })}
            </motion.div>
        </div>
    )
}

export default Month
