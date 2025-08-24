'use client'

import ClockOptions from '@/app/clock/ClockOptions'
import ClockShortcutProvider from '@/app/clock/ClockShortcutsProvider'
import Header from '@/app/clock/Header'
import TimezoneList from '@/app/clock/TimezoneList'
import Clock from '@/components/clock/Clock'
import { useAppSelector } from '@/hooks/useTypedSelectors'

const page = () => {
    const { isInTimezoneView } = useAppSelector((state) => state.clock)
    return (
        <ClockShortcutProvider>
            <div className="min-h-screen  p-6 h-full flex flex-col">
                <Header />
                <div className="flex-1 flex flex-col relative">
                    <ClockOptions />

                    {isInTimezoneView ? <TimezoneList /> : <Clock />}
                </div>
            </div>
        </ClockShortcutProvider>
    )
}

export default page
