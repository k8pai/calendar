'use client'

import Day from '@/components/calendar/dayView/Day'
import Month from '@/components/calendar/monthView/Month'
import Week from '@/components/calendar/weekView/Week'
import Year from '@/components/calendar/yearView/Year'
import { useCalendarView } from '@/hooks/useCalendarView'
import { viewModes } from '@/lib/constants'
import React, { useEffect } from 'react'

interface CalendarProps {
    view?: string
    selectedDate?: Date
}

const Calendar: React.FC<CalendarProps> = ({ view }) => {
    const calendarViewMode = useCalendarView()

    useEffect(() => {
        console.log('view mode = ', calendarViewMode)
    }, [calendarViewMode])

    if (calendarViewMode === viewModes.DAY) {
        console.log('rendering Day view mode ')
        return <Day />
    }

    if (calendarViewMode === viewModes.WEEK) {
        console.log('rendering Week view mode ')
        return <Week />
    }

    if (calendarViewMode === viewModes.MONTH) {
        console.log('rendering Month view mode ')
        return <Month />
    }

    if (calendarViewMode === viewModes.YEAR) {
        console.log('rendering Year view mode ')
        return <Year />
    }
}

export default Calendar
