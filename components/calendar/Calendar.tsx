'use client'

import Day from '@/components/calendar/dayView/Day'
import Month from '@/components/calendar/monthView/Month'
import Weekends from '@/components/calendar/weekends/Weekends'
import Week from '@/components/calendar/weekView/Week'
import Year from '@/components/calendar/yearView/Year'
import { useAppSelector } from '@/hooks/useTypedSelectors'
import { calendarViewModes } from '@/lib/constants'
import React from 'react'

interface CalendarProps {
    view?: string
    selectedDate?: Date
}

const Calendar: React.FC<CalendarProps> = ({ view }) => {
    const { viewMode: calendarViewMode } = useAppSelector(
        (state) => state.calendar
    )

    if (calendarViewMode === calendarViewModes.DAY) {
        return <Day />
    }

    if (calendarViewMode === calendarViewModes.WEEK) {
        return <Week />
    }

    if (calendarViewMode === calendarViewModes.MONTH) {
        return <Month />
    }

    if (calendarViewMode === calendarViewModes.YEAR) {
        return <Year />
    }

    if (calendarViewMode === calendarViewModes.WEEKENDS) {
        return <Weekends />
    }
}

export default Calendar
