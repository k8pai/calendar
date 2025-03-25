'use client'

import { useAppSelector } from '@/hooks/useTypedSelectors'
import { eachWeekendOfYear, format } from 'date-fns'

const Weekends = () => {
    const { selectedDate } = useAppSelector((state) => state.calendar)

    let weekendsList = eachWeekendOfYear(selectedDate)
    const groupedWeekends = weekendsList.reduce((acc, date) => {
        const month = format(date, 'MMMM')
        if (!acc[month]) acc[month] = []
        acc[month].push(date)
        return acc
    }, {} as Record<string, Array<Date>>)

    console.log(`Weekends: `, weekendsList)

    return (
        <div className=" p-6 shadow-lg rounded-lg">
            <h2 className="text-xl font-bold mb-4 text-center">
                Weekends of {new Date().getFullYear()}
            </h2>
            <div className="flex justify-between">
                <div className="space-y-6">
                    {Object.entries(groupedWeekends).map(([month, dates]) => (
                        <div key={month} className="">
                            <h3 className="text-lg font-semibold pb-2 mb-3 sticky top-0 bg-background px-4 py-2 z-10">
                                {month}
                            </h3>
                            <div className="space-y-2 pl-4 border-l border-muted">
                                {dates.map((date, index) => (
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
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <div>select box</div>
            </div>
        </div>
    )
}

export default Weekends
