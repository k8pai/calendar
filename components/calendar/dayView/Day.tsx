'use client'

'use client'

import { Button } from '@/components/ui/button'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'
import { useAppDispatch, useAppSelector } from '@/hooks/useTypedSelectors'
import { cn } from '@/lib/utils'
import { setSelectedDate } from '@/slices/calendarSlice'
import { addDays, format, isSameDay, subDays } from 'date-fns'
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react'
import { motion } from 'motion/react'
import React, { useEffect, useRef, useState } from 'react'

interface CalendarProps {
    view?: string
    selectedDate?: Date
}

const Day: React.FC<CalendarProps> = ({ view }) => {
    const ref = useRef<HTMLDivElement>(null)

    const dispatch = useAppDispatch()

    const { selectedDate } = useAppSelector((state) => state.calendar)

    // TODO: Implement the logic to render the calendar grid based on the provided view and current date
    const [movedTo, setMovedTo] = useState<'P' | 'N' | null>(null)
    // Example implementation:

    const resetDate = () => {
        if (isSameDay(new Date(), selectedDate)) {
            return
        }
        setMovedTo(null)

        dispatch(setSelectedDate(new Date().toISOString()))
    }

    const goToPreviousDay = (fromScroll?: boolean) => {
        dispatch(setSelectedDate(subDays(selectedDate, 1).toISOString()))
        setMovedTo('P')
    }

    const goToNextDay = (fromScroll?: boolean) => {
        dispatch(setSelectedDate(addDays(selectedDate, 1).toISOString()))
        setMovedTo('N')
    }
    // let dailyEvents = events
    const getDisplayDay = (date: string) => {
        return format(date, 'd')
    }

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'ArrowRight') {
                goToNextDay()
            } else if (event.key === 'ArrowLeft') {
                goToPreviousDay()
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [goToNextDay, goToPreviousDay])

    return (
        <div
            className="flex-1 flex flex-col transition-all overflow-hidden "
            ref={ref}
        >
            <div className="mb-4 flex justify-between items-center space-x-2">
                <Button
                    className="group transition-all cursor-pointer"
                    variant="outline"
                    size="icon"
                    onClick={() => goToPreviousDay()}
                >
                    <ChevronLeft className="group-hover:scale-110" />
                </Button>
                <motion.div
                    initial={{
                        opacity: 0,
                    }}
                    animate={{
                        opacity: 1,
                    }}
                    transition={{ duration: 0.3 }}
                    key={format(selectedDate, 'MMMM yyyy')}
                    className="flex items-center space-x-2"
                >
                    <span className="text-center font-bold uppercase">
                        {format(selectedDate, 'MMMM yyyy')}
                    </span>

                    {!isSameDay(selectedDate, new Date()) && (
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        className="group transition-all cursor-pointer"
                                        variant="outline"
                                        size="icon"
                                        onClick={() => resetDate()}
                                    >
                                        <RotateCcw />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent
                                    side="top"
                                    avoidCollisions={true}
                                >
                                    <p>Go To {format(new Date(), 'MMMM')}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    )}
                </motion.div>
                <Button
                    className="group transition-all cursor-pointer"
                    variant="outline"
                    size="icon"
                    onClick={() => goToNextDay()}
                >
                    <ChevronRight className="group-hover:scale-110" />
                </Button>
            </div>

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
