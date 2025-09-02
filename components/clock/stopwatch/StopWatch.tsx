import { Button } from '@/components/ui/button'
import { useEffect, useRef, useState } from 'react'

const StopWatch = () => {
    const [isRunning, setIsRunning] = useState<boolean>(false)
    const [elapsedTime, setElapsedTime] = useState<number>(0)
    const elapsedTimeRef = useRef<number>(0)
    const lapsRef = useRef<number[]>([])
    const startTimeRef = useRef<number>(0)
    const intervalRef = useRef<NodeJS.Timeout | null>(null)

    const startStopwatch = () => {
        if (!isRunning) {
            startTimeRef.current = Date.now() - elapsedTime
            intervalRef.current = setInterval(() => {
                elapsedTimeRef.current = Date.now() - startTimeRef.current
                setElapsedTime(elapsedTimeRef.current)
            }, 10)
            setIsRunning(true)
        }
    }

    const stopStopwatch = () => {
        if (isRunning && intervalRef.current) {
            clearInterval(intervalRef.current)
            setIsRunning(false)
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
            <div className="text-5xl font-mono font-semibold mb-4">
                {formatTime(elapsedTime)}
            </div>
            <div className="space-x-4">
                <Button
                    variant={'outline'}
                    className={`rounded ${
                        isRunning
                            ? 'bg-gray-400'
                            : 'bg-green-500 hover:bg-green-600'
                    }`}
                    onClick={startStopwatch}
                    disabled={isRunning}
                >
                    Start
                </Button>
                <Button
                    variant={'outline'}
                    className={`rounded ${
                        !isRunning
                            ? 'bg-gray-400'
                            : 'bg-red-500 hover:bg-red-600'
                    }`}
                    onClick={stopStopwatch}
                    disabled={!isRunning}
                >
                    Stop
                </Button>
                <Button
                    variant={'outline'}
                    className={`rounded ${
                        !isRunning
                            ? 'bg-gray-400'
                            : 'bg-violet-500 hover:bg-violet-600'
                    }`}
                    onClick={recordLap}
                    disabled={!isRunning}
                >
                    lap
                </Button>
                <Button
                    variant={'outline'}
                    className="bg-blue-500 hover:bg-blue-600 rounded"
                    onClick={resetStopwatch}
                >
                    Reset
                </Button>
            </div>
            {lapsRef.current.length > 0 && (
                <div className="w-full max-w-xs">
                    <h3 className="text-lg font-semibold mb-2">Laps</h3>
                    <div className="list-decimal list-inside">
                        {lapsRef.current.map((lap, index) => (
                            <div key={index} className="text-sm">
                                Lap {String(index + 1).padStart(2, '0')}:{' '}
                                {formatTime(lap)}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default StopWatch
