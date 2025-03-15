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

    useEffect(() => {}, [calendarViewMode])

    if (calendarViewMode === viewModes.DAY) {
        return <Day />
    }

    if (calendarViewMode === viewModes.WEEK) {
        return <Week />
    }

    if (calendarViewMode === viewModes.MONTH) {
        return <Month />
    }

    if (calendarViewMode === viewModes.YEAR) {
        return <Year />
    }
}

export default Calendar
