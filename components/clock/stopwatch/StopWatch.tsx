import LapsList from '@/components/clock/stopwatch/LapsList'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Flag, Pause, Play, RotateCcw } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const StopWatch = () => {
    const [isRunning, setIsRunning] = useState<boolean>(false)
    const [elapsedTime, setElapsedTime] = useState<number>(0)
    const elapsedTimeRef = useRef<number>(0)
    const lapsRef = useRef<number[]>([])
    const startTimeRef = useRef<number>(0)
    const intervalRef = useRef<NodeJS.Timeout | null>(null)

    const toggleStopWatch = () => {
        if (isRunning && intervalRef.current) {
            clearInterval(intervalRef.current)
            setIsRunning(false)
        } else if (!isRunning) {
            startTimeRef.current = Date.now() - elapsedTime
            intervalRef.current = setInterval(() => {
                elapsedTimeRef.current = Date.now() - startTimeRef.current
                setElapsedTime(elapsedTimeRef.current)
            }, 10)
            setIsRunning(true)
        }
    }

    const resetStopwatch = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current)
        }
        elapsedTimeRef.current = 0
        lapsRef.current = []
        setIsRunning(false)
        setElapsedTime(0)
    }

    const formatTime = (time: number): string => {
        const minutes = Math.floor(time / 60000)
        const seconds = Math.floor((time % 60000) / 1000)
        const milliseconds = Math.floor((time % 1000) / 10)
        return `${minutes.toString().padStart(2, '0')}:${seconds
            .toString()
            .padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`
    }

    const recordLap = () => {
        if (isRunning) {
            lapsRef.current = [...lapsRef.current, elapsedTimeRef.current]
            // setDisplayLaps([...lapsRef.current])
        }
    }

    useEffect(() => {
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
            }
        }
    }, [])

    return (
        <div className="flex flex-col items-center p-4 rounded-lg">
            <div className="text-5xl font-mono font-semibold my-10">
                {formatTime(elapsedTime)}
            </div>
            <div className="space-x-4 mb-10">
                <Button
                    size={'icon'}
                    variant="outline"
                    className="size-12 rounded-full cursor-pointer"
                    onClick={toggleStopWatch}
                    disabled={isRunning}
                >
                    <Play className={cn('size-6')} />
                </Button>
                <Button
                    size={'icon'}
                    variant="outline"
                    className="size-12 rounded-full cursor-pointer"
                    onClick={toggleStopWatch}
                    disabled={!isRunning}
                >
                    <Pause className={cn('size-6')} />
                </Button>
                <Button
                    size={'icon'}
                    variant="outline"
                    className="size-12 rounded-full cursor-pointer"
                    disabled={!isRunning}
                    onClick={recordLap}
                >
                    <Flag className="size-6" />
                </Button>
                <Button
                    size={'icon'}
                    variant="outline"
                    className="size-12 rounded-full cursor-pointer"
                    onClick={resetStopwatch}
                >
                    <RotateCcw className="size-6" />
                </Button>
            </div>
            <LapsList list={lapsRef.current} />
        </div>
    )
}

export default StopWatch
