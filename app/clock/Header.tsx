'use client'

import { ClockCommands } from '@/components/clock/ClockCommands'
import Menu from '@/components/clock/Menu'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { useAppSelector } from '@/hooks/useTypedSelectors'
import { getAllCountriesWithTimezones } from '@/lib/timezoneUtils'
import { TZDate } from '@date-fns/tz'
import { format } from 'date-fns'
import { motion } from 'motion/react'
import React, { useMemo } from 'react'

interface HeaderProps {}

const Header: React.FC<HeaderProps> = ({}) => {
    const {
        time,
        timezone,
        isInTimezoneView,
        timer: { isRunning, time: timerTime },
    } = useAppSelector((state) => state.clock)
    const countries = useMemo(() => {
        let response = getAllCountriesWithTimezones()
        return response
    }, [])

    return (
        <div className="mb-4 flex justify-between items-center space-x-2">
            <motion.div className="flex-1 flex justify-start w-full items-center gap-1 px-2 lg:gap-2 lg:px-6">
                <SidebarTrigger className="-ml-1" />
                <Separator
                    orientation="vertical"
                    className="mx-2 data-[orientation=vertical]:h-4"
                />
                <Menu />
                {!isInTimezoneView && <ClockCommands countries={countries} />}
            </motion.div>

            <motion.div className="flex-1 flex justify-end items-center gap-5">
                {isRunning && (
                    <div className="mr-10 flex items-center justify-center gap-0.5 font-semibold">
                        <div>{String(timerTime.hour).padStart(2, '0')}</div>
                        <div>:</div>
                        <div>{String(timerTime.minute).padStart(2, '0')}</div>
                        <div>:</div>
                        <div>{String(timerTime.second).padStart(2, '0')}</div>
                    </div>
                )}
                <div className="flex items-center space-x-2">
                    <span className="text-center text-xs md:text-base lg:text-lg tracking-wider font-bold uppercase">
                        {format(new TZDate(time, timezone), 'dd MMMM yyyy')}
                    </span>
                </div>
            </motion.div>
        </div>
    )
}

export default Header
