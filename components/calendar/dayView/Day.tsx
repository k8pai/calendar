'use client'

'use client'

import { useAppSelector } from '@/hooks/useTypedSelectors'
import { cn } from '@/lib/utils'
import {
    eachHourOfInterval,
    endOfDay,
    format,
    isSameDay,
    startOfDay,
} from 'date-fns'
import { motion } from 'motion/react'
import React, { useEffect, useState } from 'react'

interface CalendarProps {
    view?: string
    selectedDate?: Date
}

const Day: React.FC<CalendarProps> = ({ view }) => {
    const { selectedDate } = useAppSelector((state) => state.calendar)
    const [currTime, setCurrTime] = useState(new Date())

    const hours = eachHourOfInterval({
        start: startOfDay(selectedDate),
        end: endOfDay(selectedDate),
    })

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrTime(new Date())
        }, 1000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="flex-1 flex h-full flex-col transition-all overflow-hidden ">
            <motion.div className={cn(`h-full overflow-auto`)}>
                <div
                    className={cn(
                        `border-b p-2 transition-all hover:shadow-md text-start flex flex-col flex-1 sticky top-0 z-50 bg-background`,
                        isSameDay(selectedDate, new Date()) && 'font-bold'
                    )}
                >
                    <span className="text-2xl font-semibold">
                        {format(selectedDate, 'EEEE')}
                    </span>
                    <span className="text-xl font-semibold">
                        {format(selectedDate, 'dd')}
                    </span>
                </div>
                <div className="flex w-full h-full">
                    <div className="w-full h-full">
                        {hours.map((hour, i) => {
                            let hourFormat = format(hour, 'HH')
                            let currHourFormat = format(currTime, 'HH')
                            let minute = Number(format(currTime, 'm'))
                            return (
                                <div
                                    className="flex w-full h-[60px]"
                                    key={`${hour.toString()}-${i}`}
                                >
                                    <div
                                        className={cn(
                                            `border-r p-2 pr-3 pt-0 transition-all relative text-xs text-center`
                                        )}
                                        key={hour.toString() + '-' + i}
                                    >
                                        <div
                                            className={cn(
                                                'asbolute h-fit -translate-y-1/2',
                                                hourFormat === '00' &&
                                                    'opacity-0'
                                            )}
                                        >
                                            {format(hour, 'HH aa')}
                                        </div>
                                    </div>
                                    <div
                                        className={cn(
                                            `border-b w-full transition-all text-start flex flex-col flex-1 relative`
                                        )}
                                    >
                                        <motion.div
                                            className={cn(
                                                'absolute h-3 w-3 rounded-full -translate-1/2 bg-red-500',
                                                hourFormat !== currHourFormat &&
                                                    'hidden'
                                            )}
                                            initial={{
                                                y: minute,
                                            }}
                                            animate={{
                                                y: minute,
                                            }}
                                        ></motion.div>
                                        <motion.div
                                            className={cn(
                                                'absolute h-0.5 w-full -translate-y-1/2 bg-red-500',
                                                hourFormat !== currHourFormat &&
                                                    'hidden'
                                            )}
                                            key={format(currTime, 'HHmms')}
                                            initial={{
                                                y: minute,
                                            }}
                                            animate={{
                                                y: minute,
                                            }}
                                            transition={{ duration: 0.1 }}
                                        ></motion.div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default Day
