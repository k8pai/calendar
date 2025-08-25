'use client'

import AnimateNumber from '@/components/clock/AnimateNumber'
import { useClockAction } from '@/hooks/useClockActions'
import { useAppSelector } from '@/hooks/useTypedSelectors'
import { decrementTimeUnit, incrementTimeUnit } from '@/lib/helpers'
import { cn } from '@/lib/utils'
import { motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
const RADIUS = 250
const TICKS = Array.from({ length: 60 }, (_, i) => i) // 60 TICKS for minutes/seconds

const Timer = ({ className }: { className?: string }) => {
    // const [timerFocusOn, setTimerFocusUnit] = useState<'h' | 'm' | 's'>('h')

    const { timezone, timerFocusOn } = useAppSelector((state) => state.clock)
    const { setTimerFocusUnit } = useClockAction()
    const [timerConfig, setTimerConfig] = useState({
        isRunning: false,
        duration: 0,
    })
    const [timeUnits, setTimeUnits] = useState({
        hour: 0,
        minute: 0,
        second: 0,
    })

    const timeoutRef = useRef<NodeJS.Timeout | null>(null)
    const intervalRef = useRef<NodeJS.Timeout | null>(null)
    const longPressRef = useRef<boolean | null>(null)

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.repeat) return // avoid multiple triggers while key is held

            if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                // start timeout → if key is held for 750ms, start continuous change
                longPressRef.current = false

                timeoutRef.current = setTimeout(() => {
                    longPressRef.current = true
                    intervalRef.current = setInterval(() => {
                        if (e.key === 'ArrowUp') {
                            setTimeUnits((prev) => {
                                return incrementTimeUnit({
                                    time: prev,
                                    unit: timerFocusOn,
                                    incrementBy: 1,
                                })
                            })
                        } else {
                            setTimeUnits((prev) => {
                                return decrementTimeUnit({
                                    time: prev,
                                    unit: timerFocusOn,
                                    decrementBy: 1,
                                })
                            })
                        }
                    }, 50)
                }, 250)
            }
        }

        const handleKeyUp = (e: KeyboardEvent) => {
            if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                // clear timeout & interval
                // if timeout didn’t finish → do single increment/decrement
                if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current)
                    timeoutRef.current = null
                }

                if (intervalRef.current) {
                    clearInterval(intervalRef.current)
                    intervalRef.current = null
                }

                if (longPressRef.current === false) {
                    if (e.key === 'ArrowUp') {
                        setTimeUnits((prev) => {
                            return incrementTimeUnit({
                                time: prev,
                                unit: timerFocusOn,
                                incrementBy: 1,
                            })
                        })
                    } else {
                        setTimeUnits((prev) => {
                            return decrementTimeUnit({
                                time: prev,
                                unit: timerFocusOn,
                                decrementBy: 1,
                            })
                        })
                    }
                    longPressRef.current = null
                }
            }

            if (e.key === ' ') {
                e.preventDefault()
                setTimerConfig((prev) => ({
                    ...prev,
                    isRunning: !prev.isRunning,
                }))
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        window.addEventListener('keyup', handleKeyUp)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            window.removeEventListener('keyup', handleKeyUp)
        }
    }, [timerFocusOn])

    useEffect(() => {
        if (timerConfig.isRunning === true) {
            const interval = setInterval(() => {
                setTimeUnits((prev) => {
                    return decrementTimeUnit({
                        time: prev,
                        unit: 's',
                        decrementBy: 1,
                    })
                })
            }, 1000)

            return () => clearInterval(interval)
        }
    }, [timerConfig])

    useEffect(() => {
        if (
            timeUnits.hour === 0 &&
            timeUnits.minute === 0 &&
            timeUnits.second === 0
        ) {
            setTimerConfig((prev) => ({ ...prev, isRunning: false }))
        }
    }, [timeUnits])

    return (
        <motion.div
            className={cn(
                `flex-1 flex items-center justify-center text-5xl font-mono`,
                className
            )}
            exit={{ opacity: 0, translateY: '-300px' }}
        >
            <div className="flex flex-col items-center justify-center mr-4">
                <div className="relative border-2 shadow-md rounded-full aspect-square flex flex-col items-center justify-center px-4">
                    <div className="flex justify-center items-center gap-2">
                        <div
                            className="flex flex-col items-center justify-center cursor-pointer"
                            onClick={() => setTimerFocusUnit('h')}
                        >
                            <AnimateNumber
                                initialNumber={timeUnits.hour}
                                padStart={2}
                                size="md"
                                classNames={{
                                    digit: cn(
                                        'text-5xl',
                                        timerFocusOn !== 'h' && 'text-gray-500'
                                    ),
                                    digitContainer: 'w-8',
                                }}
                            />
                            <span
                                className={cn(
                                    'text-sm font-mono text-gray-500',
                                    timerFocusOn === 'h' &&
                                        'text-black font-bold'
                                )}
                            >
                                hours
                            </span>
                        </div>
                        <span>:</span>
                        <div
                            className="flex flex-col items-center justify-center cursor-pointer"
                            onClick={() => setTimerFocusUnit('m')}
                        >
                            <AnimateNumber
                                initialNumber={timeUnits.minute}
                                padStart={2}
                                size="md"
                                classNames={{
                                    digit: cn(
                                        'text-5xl',
                                        timerFocusOn !== 'm' && 'text-gray-500'
                                    ),
                                    digitContainer: 'w-8',
                                }}
                            />
                            <span
                                className={cn(
                                    'text-sm font-mono text-gray-500',
                                    timerFocusOn === 'm' &&
                                        'text-black font-bold'
                                )}
                            >
                                minutes
                            </span>
                        </div>
                        <span>:</span>
                        <div
                            className="flex flex-col items-center justify-center cursor-pointer"
                            onClick={() => setTimerFocusUnit('s')}
                        >
                            <AnimateNumber
                                initialNumber={timeUnits.second}
                                padStart={2}
                                size="md"
                                classNames={{
                                    digit: cn(
                                        'text-5xl',
                                        timerFocusOn !== 's' && 'text-gray-500'
                                    ),
                                    digitContainer: 'w-8',
                                }}
                            />
                            <span
                                className={cn(
                                    'text-sm font-mono text-gray-500',
                                    timerFocusOn === 's' &&
                                        'text-black font-bold'
                                )}
                            >
                                seconds
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default Timer
