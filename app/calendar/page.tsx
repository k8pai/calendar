'use client'

import Header from '@/app/calendar/Header'
import Calendar from '@/components/calendar/Calendar'
import { useAppSelector } from '@/hooks/useTypedSelectors'
import { cn } from '@/lib/utils'

const CalendarPage = () => {
    const { viewMode } = useAppSelector((state) => state.calendar)

    return (
        <div
            className={cn(
                'min-h-screen p-6 flex flex-col',
                viewMode === calendarViewModes.DAY ? ' h-screen' : ' h-full'
            )}
        >
            <Header />
            <div className="flex-1 flex flex-col h-full overflow-hidden">
                <Calendar />
            </div>
        </div>
    )
}

export default CalendarPage
