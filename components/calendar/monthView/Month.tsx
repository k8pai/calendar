'use client'

import Day from '@/components/calendar/monthView/day'
import { Button } from '@/components/ui/button'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'
import { useAppDispatch, useAppSelector } from '@/hooks/useTypedSelectors'
import { cn } from '@/lib/utils'
import { setSelectedDate } from '@/slices/calendarSlice'
import {
    addDays,
    addMonths,
    eachDayOfInterval,
    endOfMonth,
    format,
    getDay,
    isSameMonth,
    startOfMonth,
    subDays,
    subMonths,
} from 'date-fns'
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react'
import { motion } from 'motion/react'
import React, { useEffect, useRef, useState } from 'react'

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
    const ref = useRef<HTMLDivElement>(null)

    const dispatch = useAppDispatch()

    const { selectedDate, events } = useAppSelector((state) => state.calendar)

    // TODO: Implement the logic to render the calendar grid based on the provided view and current date
    const [movedTo, setMovedTo] = useState<'P' | 'N' | null>(null)

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

    const allDays = [
        ...daysInPreviousMonth,
        ...daysInCurrentMonth,
        ...daysInNextMonth,
    ]
    // Example implementation:

    const resetDate = () => {
        if (isSameMonth(new Date(), selectedDate)) {
            return
        }
        setMovedTo(null)

        dispatch(setSelectedDate(new Date().toISOString()))
    }

    const goToPreviousMonth = (fromScroll?: boolean) => {
        console.log("i'm called once...")
        dispatch(setSelectedDate(subMonths(selectedDate, 1).toISOString()))
        setMovedTo('P')
    }

    const goToNextMonth = (fromScroll?: boolean) => {
        dispatch(setSelectedDate(addMonths(selectedDate, 1).toISOString()))
        setMovedTo('N')
    }

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            console.log('this work...')
            if (event.key === 'ArrowRight') {
                goToNextMonth()
            } else if (event.key === 'ArrowLeft') {
                goToPreviousMonth()
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [goToNextMonth, goToPreviousMonth])

    return (
        <div
            className="flex-1 flex flex-col transition-all overflow-hidden "
            ref={ref}
        >
            <div className="mb-4 flex justify-between items-center space-x-2">
                <Button
                    className="group transition-all cursor-pointer"
                    variant="outline"
                    size="icon"
                    onClick={() => goToPreviousMonth()}
                >
                    <ChevronLeft className="group-hover:scale-110" />
                </Button>
                <motion.div
                    initial={{
                        opacity: 0,
                    }}
                    animate={{
                        opacity: 1,
                    }}
                    transition={{ duration: 0.3 }}
                    key={format(selectedDate, 'MMMM yyyy')}
                    className="flex items-center space-x-2"
                >
                    <span className="text-center font-bold uppercase">
                        {format(selectedDate, 'MMMM yyyy')}
                    </span>

                    {!isSameMonth(selectedDate, new Date()) && (
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        className="group transition-all cursor-pointer"
                                        variant="outline"
                                        size="icon"
                                        onClick={() => resetDate()}
                                    >
                                        <RotateCcw />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent
                                    side="top"
                                    avoidCollisions={true}
                                >
                                    <p>Go To {format(new Date(), 'MMMM')}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    )}
                </motion.div>
                <Button
                    className="group transition-all cursor-pointer"
                    variant="outline"
                    size="icon"
                    onClick={() => goToNextMonth()}
                >
                    <ChevronRight className="group-hover:scale-110" />
                </Button>
            </div>

            <motion.div
                className={cn(`grid grid-cols-7 gap-1 border-b-0 `)}
                key={format(selectedDate, 'ddMMMMuuuu') + ' - ' + 'header'}
                initial={{
                    opacity: 0,
                    transform: `translateX(${
                        movedTo === 'P'
                            ? '-20%'
                            : movedTo === 'N'
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
                        movedTo === 'P'
                            ? '-20%'
                            : movedTo === 'N'
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

export default Month
