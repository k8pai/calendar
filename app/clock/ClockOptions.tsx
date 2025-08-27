'use client'

import TimezoneDropdown from '@/app/clock/TimezoneDropdown'
import { Button } from '@/components/ui/button'

import { useClockAction } from '@/hooks/useClockActions'
import { useAppSelector } from '@/hooks/useTypedSelectors'
import { getAllCountriesWithTimezones } from '@/lib/timezoneUtils'
import { CircleOff, Clock, Minus, Plus } from 'lucide-react'
import { motion } from 'motion/react'
import React, { useMemo } from 'react'

interface ClockOptionsProps {}

const ClockOptions: React.FC<ClockOptionsProps> = ({}) => {
    const {
        timezone,
        isInTimezoneView,
        commandMode,
        clockType,
        clockViewMode,
    } = useAppSelector((state) => state.clock)
    const { setToggleTimezoneView, toggleClockTypeView } = useClockAction()

    const countries = useMemo(() => {
        let response = getAllCountriesWithTimezones()
        return response
    }, [])

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
                    className="text-sm font-mono text-gray-700 flex justify-center items-center gap-2"
                >
                    {isInTimezoneView ? 'Timezones' : timezone}
                    <Button
                        variant="outline"
                        size="icon"
                        className="gap-2 flex size-8 cursor-pointer"
                        onClick={setToggleTimezoneView}
                        title="Add Timezone"
                    >
                        {isInTimezoneView ? <Minus /> : <Plus />}
                    </Button>
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
                {isInTimezoneView ? (
                    <div>
                        <TimezoneDropdown countries={countries} />
                    </div>
                ) : (
                    clockViewMode === 'clock' && (
                        <Button
                            variant={'outline'}
                            className="cursor-pointer"
                            onClick={toggleClockTypeView}
                            title="Toggle Clock View"
                        >
                            {clockType === 'digital' ? (
                                <Clock />
                            ) : (
                                <CircleOff />
                            )}
                        </Button>
                    )
                )}
            </motion.div>
        </div>
    )
}

export default ClockOptions
