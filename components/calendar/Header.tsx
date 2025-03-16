'use client'

import {
    NextButton,
    PrevButton,
    ResetButton,
} from '@/components/calendar/Actions'
import { useCalendarAction } from '@/hooks/useCalendarActions'
import { useAppSelector } from '@/hooks/useTypedSelectors'
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
    const { isCurrSelected } = useCalendarAction()

    return (
        <div className="mb-4 flex justify-between items-center space-x-2">
            <PrevButton />
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

                {!isCurrSelected() && (
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <ResetButton />
                            </TooltipTrigger>
                            <TooltipContent side="top" avoidCollisions={true}>
                                <p>Go To {format(new Date(), 'MMMM')}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                )}
            </motion.div>
            <NextButton />
        </div>
    )
}

export default Header
