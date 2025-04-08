import AnimateNumber from '@/components/clock/AnimateNumber'
import { useClockAction } from '@/hooks/useClockActions'
import { useAppSelector } from '@/hooks/useTypedSelectors'
import { getTimeInTimeZone } from '@/lib/helpers'
import { useEffect, useState } from 'react'

const Clock = () => {
    const { timezone } = useAppSelector((state) => state.clock)
    const { time: timeInISO, setLocalTime } = useClockAction()
    const [time, setTime] = useState(
        timeInISO ? new Date(timeInISO) : new Date()
    )

    useEffect(() => {
        const interval = setInterval(() => {
            let time = getTimeInTimeZone(timezone)
            console.log('time => ', timeInISO)
            setTime(time ?? new Date())
        }, 1000)
        return () => clearInterval(interval)
    }, [time])

    return (
        <div className="flex-1 flex items-center justify-center text-5xl font-mono">
            <div className="relative flex">
                <AnimateNumber initialNumber={time.getHours()} padStart={2} />
                <span>:</span>
                <AnimateNumber initialNumber={time.getMinutes()} padStart={2} />
                <span>:</span>
                <AnimateNumber initialNumber={time.getSeconds()} padStart={2} />
            </div>
        </div>
    )
}

export default Clock
