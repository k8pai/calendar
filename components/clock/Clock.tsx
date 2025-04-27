import AnimateNumber from '@/components/clock/AnimateNumber'
import { useAppSelector } from '@/hooks/useTypedSelectors'
import { cn } from '@/lib/utils'
import { TZDate } from '@date-fns/tz'
import { useEffect, useState } from 'react'

const Clock = ({ className }: { className?: string }) => {
    const { timezone } = useAppSelector((state) => state.clock)
    const [localTime, setLocalTime] = useState(new TZDate(new Date(), timezone))

    useEffect(() => {
        const interval = setInterval(() => {
            const currentTime = new TZDate(new Date(), timezone)
            setLocalTime(currentTime)
        }, 1000)
        return () => clearInterval(interval)
    }, [localTime])

    useEffect(() => {
        const currentTime = new TZDate(new Date(), timezone)
        setLocalTime(currentTime)
    }, [timezone])

    return (
        <div
            className={cn(
                `flex-1 flex items-center justify-center text-5xl font-mono`,
                className
            )}
        >
            <div className="relative flex justify-center items-start gap-2">
                <div className="flex flex-col items-center justify-center gap-5">
                    <AnimateNumber
                        initialNumber={localTime.getHours()}
                        padStart={2}
                        size="md"
                        classNames={{
                            digit: 'text-5xl',
                            digitContainer: 'w-8',
                        }}
                    />
                    <span className="text-sm font-mono text-gray-500">
                        hours
                    </span>
                </div>
                <span>:</span>
                <div className="flex flex-col items-center justify-center gap-5">
                    <AnimateNumber
                        initialNumber={localTime.getMinutes()}
                        padStart={2}
                        size="md"
                        classNames={{
                            digit: 'text-5xl',
                            digitContainer: 'w-8',
                        }}
                    />
                    <span className="text-sm font-mono text-gray-500">
                        minutes
                    </span>
                </div>
                <span>:</span>
                <div className="flex flex-col items-center justify-center gap-5">
                    <AnimateNumber
                        initialNumber={localTime.getSeconds()}
                        padStart={2}
                        size="md"
                        classNames={{
                            digit: 'text-5xl w-8',
                            digitContainer: 'w-8',
                        }}
                    />
                    <span className="text-sm font-mono text-gray-500">
                        seconds
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Clock
