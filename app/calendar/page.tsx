'use client'

import Calendar from '@/components/calendar/Calendar'
import Header from '@/components/calendar/Header'

const CalendarPage = () => {
    return (
        <div className="min-h-screen p-6 h-full flex flex-col">
            <div>
                <Header />
            </div>
            <div className="flex-1 flex flex-col">
                <Calendar />
            </div>
        </div>
    )
}

export default CalendarPage
