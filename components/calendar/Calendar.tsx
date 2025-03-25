'use client'

import Day from '@/components/calendar/dayView/Day'
import Month from '@/components/calendar/monthView/Month'
import Weekends from '@/components/calendar/weekends/Weekends'
import Week from '@/components/calendar/weekView/Week'
import Year from '@/components/calendar/yearView/Year'
import { useAppSelector } from '@/hooks/useTypedSelectors'
import { viewModes } from '@/lib/constants'
import React from 'react'

interface CalendarProps {
    view?: string
    selectedDate?: Date
}

const Calendar: React.FC<CalendarProps> = ({ view }) => {
    const { viewMode: calendarViewMode } = useAppSelector(
        (state) => state.calendar
    )

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

    if (calendarViewMode === viewModes.WEEKENDS) {
        return <Weekends />
    }
}

export default Calendar
