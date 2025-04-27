'use client'

import TimezoneDropdown from '@/app/clock/TimezoneDropdown'
import { Button } from '@/components/ui/button'

import { useClockAction } from '@/hooks/useClockActions'
import { useAppSelector } from '@/hooks/useTypedSelectors'
import { getAllCountriesWithTimezones } from '@/lib/timezoneUtils'
import { ChevronDown } from 'lucide-react'
import { motion } from 'motion/react'
import React, { useMemo } from 'react'

interface ClockOptionsProps {}

const ClockOptions: React.FC<ClockOptionsProps> = ({}) => {
    const { timezone, isInTimezoneView } = useAppSelector(
        (state) => state.clock
    )
    const { setToggleTimezoneView, toggleCommandFlag, addTimezoneList } =
        useClockAction()

    const countries = useMemo(() => {
        let response = getAllCountriesWithTimezones()
        return response
    }, [])

    console.log('isInTimezoneView', isInTimezoneView)
    return (
        <div className="mb-4 flex justify-between items-center space-x-2 px-4 font-semibold">
            <div>
                <motion.span
                    key={timezone}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                        duration: 0.5,
                        type: 'spring',
                        stiffness: 50,
                        delay: 0.5,
                    }}
                    className="text-sm font-mono text-gray-700"
                >
                    {isInTimezoneView ? 'Timezones' : timezone}
                </motion.span>
            </div>
            <motion.div
                key={'chevron'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                    duration: 0.5,
                    type: 'spring',
                    stiffness: 50,
                    delay: 0.5,
                }}
                className="flex items-center gap-4"
            >
                {/* <div>
                    {isInTimezoneView && (
                        <Button variant={'outline'} onClick={toggleCommandFlag}>
                            <PlusIcon />
                        </Button>
                    )}
                </div> */}
                {isInTimezoneView && (
                    <div>
                        <TimezoneDropdown countries={countries} />
                    </div>
                )}

                <div>
                    <Button variant={'outline'} onClick={setToggleTimezoneView}>
                        <ChevronDown />
                    </Button>
                </div>
            </motion.div>
        </div>
    )
}

export default ClockOptions
