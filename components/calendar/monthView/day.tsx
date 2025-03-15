'use client'

import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from '@/components/ui/context-menu'
import { cn } from '@/lib/utils'
import { format, isSameDay, startOfMonth } from 'date-fns'
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
    // let dailyEvents = events
    const getDisplayDay = (date: Date) => {
        if (isSameDay(date, startOfMonth(date))) {
            return format(date, 'MMM d')
        }

        return format(date, 'd')
    }

    const handleActions = (actionName: string) => {
        // TODO: Implement the logic to handle the selected action
        console.log(
            `Handling action: ${actionName} for day: ${format(
                day,
                'MMMM d, yyyy'
            )}`
        )
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
                <div
                    className={cn(
                        `border border-t-0  p-2 transition-all hover:shadow-md text-center flex flex-col flex-1`,
                        isSameDay(day, new Date()) && 'bg-secondary font-bold',
                        index < 7 ? 'rounded-br-md rounded-bl-md' : 'rounded-md'
                    )}
                >
                    <span>{getDisplayDay(day)}</span>
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
                </div>
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
