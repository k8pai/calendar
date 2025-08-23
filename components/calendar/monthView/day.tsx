'use client'

import { TooltipWrapper } from '@/components/common/TooltipWrapper'
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from '@/components/ui/context-menu'
import { useCalendarAction } from '@/hooks/useCalendarActions'
import { useAppSelector } from '@/hooks/useTypedSelectors'
import { getJulianDateMap } from '@/lib/helpers'
import { cn } from '@/lib/utils'
import {
    format,
    isEqual,
    isSameDay,
    isSaturday,
    isSunday,
    startOfMonth,
} from 'date-fns'
import { motion } from 'motion/react'
import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import dayActions from './dayActions'

interface calendarEventType {
    id: string
    title: string
    date: Date
    type: string
}

interface CalendarProps {
    day: Date
    index: number
    events?: Array<calendarEventType>
    type?: string
}

const Day: React.FC<CalendarProps> = ({ day, index, events }) => {
    const [dailyEvents, setDailyEvents] = useState<Array<calendarEventType>>([])

    const { selectedDate, calendarType } = useAppSelector(
        (state) => state.calendar
    )
    const { setDate } = useCalendarAction()
    // let dailyEvents = events
    const getDisplayDay = (date: Date) => {
        if (isSameDay(date, startOfMonth(date))) {
            return format(date, 'MMM d')
        }

        return format(date, 'd')
    }

    const getCalendarTypeDay = (date: Date) => {
        switch (calendarType) {
            case 'gregorian':
                if (isSameDay(date, startOfMonth(date))) {
                    return format(date, 'MMM d')
                }

                return format(date, 'd')
            case 'hebrew':
                return format(selectedDate, 'MMMM yyyy')
            case 'julian':
                const julianMap = getJulianDateMap(new Date(selectedDate))

                const julianDate = julianMap[format(date, 'ddMMMMuuuu')]

                if (isSameDay(julianDate.date, startOfMonth(julianDate.date))) {
                    return format(julianDate.date, 'MMM d')
                }

                return format(julianDate.date, 'd')
            case 'Coptic':
                return null
            // getCopticContents(new Date(selectedDate))
            // let copticData = getCopticDate(new Date(selectedDate))
            // if (copticData) {
            //     return `${copticData.month ?? ''} ${
            //         copticData.year ?? ''
            //     } ${format(selectedDate, 'MMMM yyyy')}`
            // }
            // return format(selectedDate, 'dd MMMM yyyy')
            default:
                if (isSameDay(date, startOfMonth(date))) {
                    return format(date, 'MMM d')
                }

                return format(date, 'd')
        }
    }

    const handleActions = (actionName: string) => {
        // TODO: Implement the logic to handle the selected action

        let genEvent = {
            id: uuidv4(),
            title: `Event ${dailyEvents.length} of ${format(
                day,
                'MMMM d, yyyy'
            )}`,
            date: day,
            type: 'EVENT',
        }
        setDailyEvents((copy) => {
            return [...copy, genEvent]
        })
    }

    return (
        <ContextMenu>
            <ContextMenuTrigger asChild>
                <motion.div
                    className={cn(
                        `border border-t-0 p-2 transition-all hover:shadow-md flex flex-col items-center flex-1 cursor-pointer`,
                        isSameDay(day, new Date()) &&
                            'bg-red-50/50 font-bold shadow-md',
                        index < 7
                            ? 'rounded-br-md rounded-bl-md'
                            : 'rounded-md',
                        isEqual(
                            format(day, 'dd-MMMM-uuuu'),
                            format(selectedDate, 'dd-MMMM-uuuu')
                        ) && '',
                        calendarType !== 'gregorian' && 'justify-between',
                        isSaturday(day) && 'bg-secondary',
                        isSunday(day) && 'bg-green-100/50'
                    )}
                    key={`${format(day, 'MMuuuu')}-${
                        isSameDay(day, selectedDate) ? 'flag-' : ''
                    }day`}
                    onClick={() => setDate(day)}
                >
                    <div className="flex-1">
                        <span
                            className={cn(
                                'w-fit p-2 text-center font-semibold',
                                isEqual(
                                    format(day, 'dd-MMMM-uuuu'),
                                    format(selectedDate, 'dd-MMMM-uuuu')
                                ) &&
                                    'rounded-full font-bold text-3xl text-blue-600'
                            )}
                        >
                            {getDisplayDay(day)}
                        </span>
                    </div>
                    {calendarType !== 'gregorian' && (
                        <div className="flex justify-end w-full">
                            <span
                                className={cn(
                                    'w-fit p-2 text-right text-sm cursor-pointer',
                                    isEqual(
                                        format(day, 'dd-MMMM-uuuu'),
                                        format(selectedDate, 'dd-MMMM-uuuu')
                                    ) &&
                                        'rounded-full font-bold text-sm text-blue-600'
                                )}
                            >
                                <TooltipWrapper
                                    buttonType="ghost"
                                    value={getCalendarTypeDay(day) ?? ''}
                                    description={`${calendarType} Date`}
                                    buttonClassName="cusor-pointer bg-blue-50/50 hover:bg-blue-100/50"
                                />
                            </span>
                        </div>
                    )}
                    {/* {dailyEvents.map((event) => {
                        return (
                            <div
                                className="rounded bg-accent mb-1 p-0.5"
                                key={event.id}
                            >
                                {event.title}
                            </div>
                        )
                    })} */}
                </motion.div>
            </ContextMenuTrigger>
            <ContextMenuContent>
                {dayActions.map((action) => {
                    return (
                        <ContextMenuItem
                            key={action.name}
                            onClick={() => handleActions(action.name)}
                        >
                            {action.description}
                        </ContextMenuItem>
                    )
                })}
            </ContextMenuContent>
        </ContextMenu>
    )
}

export default Day
