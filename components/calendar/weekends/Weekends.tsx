'use client'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

import { useAppSelector } from '@/hooks/useTypedSelectors'
import { eachWeekendOfYear, format, isSaturday, isSunday } from 'date-fns'
import { useState } from 'react'

const Weekends = () => {
    const { selectedDate } = useAppSelector((state) => state.calendar)
    const [filter, setFilter] = useState('')

    let weekendsList = eachWeekendOfYear(selectedDate)
    const groupedWeekends = weekendsList.reduce((acc, date) => {
        const month = format(date, 'MMMM')
        if (!acc[month]) acc[month] = []
        acc[month].push(date)
        return acc
    }, {} as Record<string, Array<Date>>)

    console.log('filter => ', filter)

    return (
        <div className=" p-6 shadow-lg rounded-lg">
            <h2 className="text-xl font-bold mb-4 text-center">
                Weekends of {format(selectedDate, 'uuuu')}
            </h2>
            <div className="flex justify-between">
                <div className="space-y-6">
                    {Object.entries(groupedWeekends).map(([month, dates]) => (
                        <div key={month} className="">
                            <h3 className="text-lg font-semibold pb-2 mb-3 sticky top-0 bg-background px-4 py-2 z-10">
                                {month} ({dates.length})
                            </h3>
                            <div className="space-y-2 pl-4 border-l border-muted">
                                {dates.map((date, index) => {
                                    let condition = true

                                    switch (filter) {
                                        case 'all':
                                            condition = true
                                            break
                                        case 'weekend':
                                            condition = isSaturday(date)
                                            break
                                        case 'saturday':
                                            condition = isSaturday(date)
                                            break
                                        case 'sunday':
                                            condition = isSunday(date)
                                            break
                                        default:
                                            condition = true
                                    }

                                    return condition ? (
                                        <div
                                            key={index}
                                            className="relative pl-6 flex items-center"
                                        >
                                            <span className="w-2 h-2 bg-primary rounded-full absolute -left-1.5 top-1/2 transform -translate-y-1/2"></span>
                                            <div>
                                                <p className="font-medium">
                                                    {format(date, 'PPP')}
                                                </p>
                                                <p className="text-sm opacity-70">
                                                    {format(date, 'EEEE')}
                                                </p>
                                            </div>
                                        </div>
                                    ) : null
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                <div>
                    <h3 className="text-lg font-semibold pb-2 mb-3 sticky top-0 bg-background px-4 py-2 z-10">
                        Filters
                    </h3>
                    <Select value={filter} onValueChange={setFilter}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filter" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Weekdays</SelectItem>
                            <SelectItem value="saturday">Saturdays</SelectItem>
                            <SelectItem value="sunday">Sundays</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    )
}

export default Weekends
