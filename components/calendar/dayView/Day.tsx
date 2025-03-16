'use client'

'use client'

import { useAppSelector } from '@/hooks/useTypedSelectors'
import { cn } from '@/lib/utils'
import { format, isSameDay } from 'date-fns'
import { motion } from 'motion/react'
import React from 'react'

interface CalendarProps {
    view?: string
    selectedDate?: Date
}

const Day: React.FC<CalendarProps> = ({ view }) => {
    const { selectedDate } = useAppSelector((state) => state.calendar)

    return (
        <div className="flex-1 flex flex-col transition-all overflow-hidden ">
            <motion.div
                className={cn(`grid grid-cols-1 gap-1 flex-1`)}
                key={format(selectedDate, 'ddMMMMuuuu') + ' - ' + 'body'}
                initial={{
                    opacity: 0,
                }}
                animate={{
                    opacity: 1,
                }}
                transition={{ duration: 0.3 }}
            >
                <div
                    className={cn(
                        `border-l p-2 transition-all hover:shadow-md text-start flex flex-col flex-1`,
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
            </motion.div>
        </div>
    )
}

export default Day
