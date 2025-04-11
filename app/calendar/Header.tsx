'use client'

import { NextButton, PrevButton } from '@/components/calendar/Actions'
import { CommandMenu } from '@/components/calendar/Commands'
import Menu from '@/components/calendar/Menu'
import { SwitchCalendar } from '@/components/calendar/SwitchCalendar'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { useAppSelector } from '@/hooks/useTypedSelectors'
import { calendarViewModes } from '@/lib/constants'
import { getCopticDate, getJulianDateMap } from '@/lib/helpers'
import { format } from 'date-fns'
import { motion } from 'motion/react'
import React from 'react'

interface HeaderProps {}

const Header: React.FC<HeaderProps> = ({}) => {
    const {
        selectedDate,
        viewMode: calendarViewMode,
        calendarType,
    } = useAppSelector((state) => state.calendar)

    const getHeader = () => {
        console.log('calendarType', calendarType)

        switch (calendarType) {
            case 'gregorian':
                if (calendarViewMode === calendarViewModes.YEAR) {
                    return format(selectedDate, 'yyyy')
                }
                return format(selectedDate, 'MMMM yyyy')
            case 'hebrew':
                return format(selectedDate, 'MMMM yyyy')
            case 'julian':
                const julianMap = getJulianDateMap(new Date(selectedDate))
                const julianDate = julianMap[format(selectedDate, 'ddMMMMuuuu')]
                return format(julianDate.date, 'MMMM yyyy')
            case 'Coptic':
                // getCopticContents(new Date(selectedDate))
                let copticData = getCopticDate(new Date(selectedDate))
                if (copticData) {
                    return `${copticData.month ?? ''} ${
                        copticData.year ?? ''
                    } ${format(selectedDate, 'MMMM yyyy')}`
                }
                return format(selectedDate, 'dd MMMM yyyy')
            default:
                if (calendarViewMode === calendarViewModes.YEAR) {
                    return format(selectedDate, 'yyyy')
                }
                return format(selectedDate, 'MMMM yyyy')
        }
    }

    return (
        <div className="mb-4 flex justify-between items-center space-x-2">
            <motion.div
                key={format(selectedDate, 'MMMM yyyy')}
                className="flex-1 flex justify-start w-full items-center gap-1 px-2 lg:gap-2 lg:px-6"
            >
                <SidebarTrigger className="-ml-1" />
                <Separator
                    orientation="vertical"
                    className="mx-2 data-[orientation=vertical]:h-4"
                />
                <Menu />
                <SwitchCalendar />
            </motion.div>

            <motion.div className="flex-1 flex justify-end items-center gap-5">
                <CommandMenu />
                <div className="hidden md:block">
                    <PrevButton />
                </div>
                <div
                    key={format(selectedDate, 'MMMM yyyy')}
                    className="flex items-center space-x-2"
                >
                    <span className="text-center text-xs md:text-base lg:text-lg tracking-wider font-bold uppercase">
                        {getHeader()}
                    </span>
                </div>
                <div className="hidden md:block">
                    <NextButton />
                </div>
            </motion.div>
        </div>
    )
}

export default Header
