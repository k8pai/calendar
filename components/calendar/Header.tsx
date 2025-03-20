'use client'

import { NextButton, PrevButton } from '@/components/calendar/Actions'
import Menu from '@/components/calendar/Menu'
import ShortcutInput from '@/components/calendar/ShortcutInput'
import { useCalendarAction } from '@/hooks/useCalendarActions'
import { useAppSelector } from '@/hooks/useTypedSelectors'
import { viewModes } from '@/lib/constants'
import { format } from 'date-fns'
import { motion } from 'motion/react'
import React from 'react'

interface HeaderProps {}

const Header: React.FC<HeaderProps> = ({}) => {
    const { selectedDate } = useAppSelector((state) => state.calendar)
    const { viewMode: calendarViewMode, calendarType } = useAppSelector(
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
                className="flex-1 flex justify-start relative"
            >
                <Menu />
                {/* <SwitchCalendar /> */}
            </motion.div>

            <div className="flex-1 flex justify-center relative">
                <ShortcutInput listening={listening} />
            </div>
            <motion.div
                initial={{
                    opacity: 1,
                }}
                animate={{
                    opacity: listening ? 0 : 1,
                }}
                transition={{ duration: 0.1 }}
                className="flex-1 flex justify-end items-center gap-5"
            >
                <PrevButton />
                <div
                    key={format(selectedDate, 'MMMM yyyy')}
                    className="flex items-center space-x-2"
                >
                    <span className="text-center text-lg tracking-wider font-bold uppercase">
                        {getHeader()}
                    </span>
                </div>
                <NextButton />
            </motion.div>
        </div>
    )
}

export default Header
