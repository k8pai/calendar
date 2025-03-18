'use client'

import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from '@/components/ui/context-menu'
import { useCalendarAction } from '@/hooks/useCalendarActions'
import { useAppSelector } from '@/hooks/useTypedSelectors'
import { cn } from '@/lib/utils'
import { format, isEqual, isSameDay, startOfMonth } from 'date-fns'
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
    events: Array<calendarEventType>
    type?: string
}

const Day: React.FC<CalendarProps> = ({ day, index, events }) => {
    const [dailyEvents, setDailyEvents] = useState(events)

    const { selectedDate } = useAppSelector((state) => state.calendar)
    const { setDate } = useCalendarAction()
    // let dailyEvents = events
    const getDisplayDay = (date: Date) => {
        if (isSameDay(date, startOfMonth(date))) {
            return format(date, 'MMM d')
        }

        return format(date, 'd')
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

    console.log('some props changed...')

    return (
        <ContextMenu>
            <ContextMenuTrigger asChild>
                <motion.div
                    className={cn(
                        `border border-t-0  p-2 transition-all hover:shadow-md flex flex-col items-center flex-1`,
                        isSameDay(day, new Date()) && 'bg-secondary font-bold',
                        index < 7 ? 'rounded-br-md rounded-bl-md' : 'rounded-md'
                    )}
                    key={`${format(day, 'MMuuuu')}-${
                        isSameDay(day, selectedDate) ? 'flag-' : ''
                    }day`}
                    onClick={() => setDate(day)}
                    initial={{
                        opacity: 0,
                    }}
                    animate={{
                        opacity: 1,
                    }}
                    transition={{ duration: 0.3 }}
                >
                    {isEqual(
                        format(day, 'dd-MMMM-uuuu'),
                        format(selectedDate, 'dd-MMMM-uuuu')
                    )}
                    <span
                        className={cn(
                            'w-fit p-2 text-center',
                            isEqual(
                                format(day, 'dd-MMMM-uuuu'),
                                format(selectedDate, 'dd-MMMM-uuuu')
                            ) && 'rounded-full font-bold text-3xl text-blue-600'
                        )}
                    >
                        {getDisplayDay(day)}
                    </span>
                    {dailyEvents.map((event) => {
                        return (
                            <div
                                className="rounded bg-accent mb-1 p-0.5"
                                key={event.id}
                            >
                                {event.title}
                            </div>
                        )
                    })}
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
