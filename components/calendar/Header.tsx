'use client'

import {
    NextButton,
    PrevButton,
    ResetButton,
} from '@/components/calendar/Actions'
import ShortcutInput from '@/components/calendar/ShortcutInput'
import { useCalendarAction } from '@/hooks/useCalendarActions'
import { useAppSelector } from '@/hooks/useTypedSelectors'
import { viewModes } from '@/lib/constants'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@radix-ui/react-tooltip'
import { format } from 'date-fns'
import { motion } from 'motion/react'
import React from 'react'

interface HeaderProps {}

const Header: React.FC<HeaderProps> = ({}) => {
    const { selectedDate } = useAppSelector((state) => state.calendar)
    const { viewMode: calendarViewMode } = useAppSelector(
        (state) => state.calendar
    )
    const { listening } = useAppSelector((state) => state.keystroke)

    const { isCurrSelected } = useCalendarAction()

    const getHeader = () => {
        if (calendarViewMode === viewModes.YEAR) {
            return format(selectedDate, 'yyyy')
        }
        return format(selectedDate, 'MMMM yyyy')
    }

    return (
        <div className="mb-4 flex justify-between items-center space-x-2">
            <PrevButton />

            <div className="flex justify-center relative">
                <motion.div
                    initial={{
                        opacity: 1,
                    }}
                    animate={{
                        opacity: listening ? 0 : 1,
                        // scale: listening ? 0 : 1,
                    }}
                    transition={{ duration: 0.1 }}
                    key={format(selectedDate, 'MMMM yyyy')}
                    className="flex items-center space-x-2"
                >
                    <span className="text-center font-bold uppercase">
                        {getHeader()}
                    </span>

                    {!isCurrSelected() && (
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <ResetButton />
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
                <ShortcutInput listening={listening} />
            </div>
            <NextButton />
        </div>
    )
}

export default Header
