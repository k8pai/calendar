'use client'

import ClockOptions from '@/app/clock/ClockOptions'
import ClockShortcutProvider from '@/app/clock/ClockShortcutsProvider'
import Header from '@/app/clock/Header'
import TimezoneList from '@/app/clock/TimezoneList'
import Clock from '@/components/clock/Clock'
import StopWatch from '@/components/clock/stopwatch/StopWatch'
import Timer from '@/components/clock/timer/Timer'
import { useAppSelector } from '@/hooks/useTypedSelectors'

const page = () => {
    const { isInTimezoneView, clockViewMode } = useAppSelector(
        (state) => state.clock
    )
    return (
        <ClockShortcutProvider>
            <div className="min-h-screen  p-6 h-full flex flex-col">
                <Header />
                <div className="flex-1 flex flex-col relative">
                    <ClockOptions />
                    {clockViewMode === 'clock' ? (
                        isInTimezoneView ? (
                            <TimezoneList />
                        ) : (
                            <Clock />
                        )
                    ) : clockViewMode === 'timer' ? (
                        <Timer />
                    ) : clockViewMode === 'stopwatch' ? (
                        <StopWatch />
                    ) : null}
                </div>
            </div>
        </ClockShortcutProvider>
    )
}

export default page
