'use client'

import MonthView from '@/components/calendar/yearView/MonthView'
import { useAppDispatch, useAppSelector } from '@/hooks/useTypedSelectors'
import { cn } from '@/lib/utils'
import { setSelectedDate } from '@/slices/calendarSlice'
import {
    addYears,
    eachMonthOfInterval,
    endOfYear,
    format,
    isSameMonth,
    startOfYear,
    subYears,
} from 'date-fns'
import { motion } from 'motion/react'
import React, { useMemo, useState } from 'react'

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

const Year: React.FC<CalendarProps> = ({ view }) => {
    const dispatch = useAppDispatch()

    const { selectedDate, events } = useAppSelector((state) => state.calendar)

    // TODO: Implement the logic to render the calendar grid based on the provided view and current date
    const [movedTo, setMovedTo] = useState<'P' | 'N' | null>(null)

    const firstDayOfYear = startOfYear(selectedDate)
    const lastDayOfYear = endOfYear(selectedDate)

    const monthsInYear = useMemo(
        () =>
            eachMonthOfInterval({
                start: firstDayOfYear,
                end: lastDayOfYear,
            }),
        [selectedDate]
    )

    // Example implementation:

    const resetDate = () => {
        if (isSameMonth(new Date(), selectedDate)) {
            return
        }
        setMovedTo(null)

        dispatch(setSelectedDate(new Date().toISOString()))
    }

    const goToPreviousYear = (fromScroll?: boolean) => {
        dispatch(setSelectedDate(subYears(selectedDate, 1).toISOString()))
        setMovedTo('P')
    }

    const goToNextYear = (fromScroll?: boolean) => {
        dispatch(setSelectedDate(addYears(selectedDate, 1).toISOString()))
        setMovedTo('N')
    }

    // useEffect(() => {
    //     const handleKeyDown = (event: KeyboardEvent) => {
    //         if (event.key === 'ArrowRight') {
    //             goToNextYear()
    //         } else if (event.key === 'ArrowLeft') {
    //             goToPreviousYear()
    //         }
    //     }

    //     window.addEventListener('keydown', handleKeyDown)
    //     return () => {
    //         window.removeEventListener('keydown', handleKeyDown)
    //     }
    // }, [goToNextYear, goToPreviousYear])

    return (
        <div className="flex-1 flex flex-col transition-all overflow-hidden text-xs">
            <motion.div
                className={cn(
                    `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 flex-1 
                        grid-rows-[repeat(12,minmax(0,1fr))]
                        md:grid-rows-[repeat(6,minmax(0,1fr))]
                        lg:grid-rows-[repeat(4,minmax(0,1fr))] 2xl:grid-rows-[repeat(3,minmax(0,1fr))]`
                )}
                key={format(selectedDate, 'ddMMMMuuuu') + ' - ' + 'body'}
                initial={{
                    opacity: 0,
                }}
                animate={{
                    opacity: 1,
                }}
                transition={{ duration: 0.3 }}
            >
                {monthsInYear.map((month, index) => {
                    return (
                        <motion.div
                            className={cn(
                                `rounded-tl-md rounded-tr-md pb-0 m-8 transition-all flex-0`
                            )}
                            key={format(month, 'uuuu-MM-MMMM') + index}
                            initial={{
                                opacity: 0,
                            }}
                            animate={{
                                opacity: 1,
                            }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="uppercase font-semibold ml-2 text-lg text-start">
                                {format(month, 'MMMM')}
                            </div>
                            <MonthView
                                monthDate={month}
                                selectedDate={selectedDate}
                            />
                        </motion.div>
                    )
                    // <span>format(day, 'dd-MM-yyyy')</span>
                })}
            </motion.div>
        </div>
    )
}

export default Year
