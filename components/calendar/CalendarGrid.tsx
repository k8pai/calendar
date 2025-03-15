'use client'

import { Button } from '@/components/ui/button'
import useScrollTracker from '@/hooks/useScrollTracker'
import {
    addDays,
    addMonths,
    eachDayOfInterval,
    endOfMonth,
    format,
    getDay,
    startOfMonth,
    subDays,
    subMonths,
} from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import React, { useState } from 'react'

interface CalendarGridProps {
    view: string
    currentDate: Date
}

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const CalendarGrid: React.FC<CalendarGridProps> = ({ view }) => {
    // TODO: Implement the logic to render the calendar grid based on the provided view and current date
    // const [currentDate, setCurrentDate] = useState(new Date())

    const [currentDate, setCurrentDate] = useState(new Date())
    const isScrolling = useScrollTracker(300)

    const firstDayOfMonth = startOfMonth(currentDate)
    const lastDayOfMonth = endOfMonth(currentDate)

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

    console.log(
        'last day week day for ',
        format(currentDate, 'dd-MM'),
        ' is ...',
        lastDayWeekday
    )
    console.log('remaining days', remainingDays)

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

    console.log(
        'days in next month',
        daysInNextMonth.map((day) => format(day, 'd'))
    )
    return (
        <div className="container mx-auto">
            {/* <p>
                Showing {view} view for {currentDate.getDate()}
            </p> */}
            <div className="mb-4 flex justify-between items-center space-x-2">
                {/* <button
                    className="px-3 transition-all py-1 bg-stone-800 rounded"
                    onClick={() => setCurrentDate(subMonths(currentDate, 1))}
                >
                    <ChevronLeft />
                </button>
                 */}
                <Button
                    className="group transition-all cursor-pointer"
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentDate(subMonths(currentDate, 1))}
                >
                    <ChevronLeft className="group-hover:scale-110" />
                </Button>
                <h2 className="text-center font-bold uppercase">
                    {format(currentDate, 'MMMM yyyy')}
                </h2>
                <Button
                    className="group transition-all cursor-pointer"
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentDate(addMonths(currentDate, 1))}
                >
                    <ChevronRight className="group-hover:scale-110" />
                </Button>
                {/* <button
                    className="px-3 group transition-all py-1 hover:bg-stone-800 cursor-pointer rounded"
                    onClick={() => setCurrentDate(addMonths(currentDate, 1))}
                >
                    <ChevronRight className="group-hover:scale-110" /> 
                </button> */}
            </div>

            <div className="grid grid-cols-7 gap-1">
                {WEEKDAYS.map((weekday) => {
                    return (
                        <div
                            className="border rounded-md p-2 text-center"
                            key={weekday}
                        >
                            {weekday}
                        </div>
                    )
                })}

                {allDays.map((day, index) => {
                    return (
                        <div
                            className={`border rounded-md p-2 text-center ${
                                format(day, 'dd-MM-yyyy') ===
                                format(new Date(), 'dd-MM-yyyy')
                                    ? 'bg-secondary font-bold'
                                    : ''
                            }`}
                            key={index}
                        >
                            {format(day, 'd')}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default CalendarGrid
