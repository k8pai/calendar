'use client'

import { ClockCommands } from '@/components/clock/ClockCommands'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { getAllCountriesWithTimezones } from '@/lib/timezoneUtils'
import { format } from 'date-fns'
import { motion } from 'motion/react'
import React, { useMemo } from 'react'

interface HeaderProps {}

const Header: React.FC<HeaderProps> = ({}) => {
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
                <ClockCommands countries={countries} />
            </motion.div>

            <motion.div className="flex-1 flex justify-end items-center gap-5">
                <div className="flex items-center space-x-2">
                    <span className="text-center text-xs md:text-base lg:text-lg tracking-wider font-bold uppercase">
                        {format(new Date(), 'dd MMMM yyyy')}
                    </span>
                </div>
            </motion.div>
        </div>
    )
}

export default Header
