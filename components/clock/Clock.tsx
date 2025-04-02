import AnimateNumber from '@/components/clock/AnimateNumber'
import { useEffect, useState } from 'react'

const Clock = () => {
    const [time, setTime] = useState(new Date())

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date())
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
