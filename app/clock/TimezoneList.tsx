'use client'

import TimezoneClock from '@/app/clock/TimezoneClock'
import { useClockAction } from '@/hooks/useClockActions'
import { useAppSelector } from '@/hooks/useTypedSelectors'
import { Trash } from 'lucide-react'

const TimezoneList = () => {
    const { timezone, isInTimezoneView, timezoneList } = useAppSelector(
        (state) => state.clock
    )
    const { removeTimezoneList } = useClockAction()

    return (
        <div className="flex flex-col space-y-3">
            {timezoneList?.map((tz) => (
                <div
                    key={tz}
                    className={`flex items-start justify-between p-2 px-1 pr-3 rounded-md border cursor-pointer ${
                        timezone === tz ? '' : ''
                    }`}
                >
                    <div className="">
                        <TimezoneClock timezone={tz} />
                        <span className="pl-3 text-xs font-mono text-gray-700">
                            {tz}
                        </span>
                    </div>
                    <div className="flex items-center pt-2">
                        <Trash
                            className="scale-80 text-secondary-foreground"
                            onClick={() => removeTimezoneList(tz)}
                        />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default TimezoneList
