import AnimateNumber from '@/components/clock/AnimateNumber'
import { cn } from '@/lib/utils'
import { TZDate } from '@date-fns/tz'
import { TimezoneName } from 'countries-and-timezones'
import { useEffect, useState } from 'react'

const TimezoneClock = ({ timezone }: { timezone: TimezoneName }) => {
    const [localTime, setLocalTime] = useState(new TZDate(new Date(), timezone))

    useEffect(() => {
        const interval = setInterval(() => {
            const currentTime = new TZDate(new Date(), timezone)
            setLocalTime(currentTime)
        }, 1000)
        return () => clearInterval(interval)
    }, [localTime])

    return (
        <div className={cn(`flex-1 flex items-center justify-start font-mono`)}>
            <div className="relative flex justify-center items-center">
                <AnimateNumber
                    initialNumber={localTime.getHours()}
                    padStart={2}
                    size="sm"
                    classNames={{
                        digit: 'text-base w-4',
                        digitContainer: 'w-4',
                    }}
                />
                <span>:</span>
                <AnimateNumber
                    initialNumber={localTime.getMinutes()}
                    padStart={2}
                    size="sm"
                    classNames={{
                        digit: 'text-base w-4',
                        digitContainer: 'w-4',
                    }}
                />
                <span>:</span>
                <AnimateNumber
                    initialNumber={localTime.getSeconds()}
                    padStart={2}
                    size="sm"
                    classNames={{
                        digit: 'text-base w-4',
                        digitContainer: 'w-4',
                    }}
                />
            </div>
        </div>
    )
}

export default TimezoneClock
