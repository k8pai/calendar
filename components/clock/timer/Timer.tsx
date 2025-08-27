'use client'

import AnimateNumber from '@/components/clock/AnimateNumber'
import { useClockAction } from '@/hooks/useClockActions'
import { useAppSelector } from '@/hooks/useTypedSelectors'
import { decrementTimeUnit, incrementTimeUnit } from '@/lib/helpers'
import { cn } from '@/lib/utils'
import { motion } from 'motion/react'
import { useEffect, useRef } from 'react'

const Timer = ({ className }: { className?: string }) => {
    const {
        timezone,
        timerFocusOn,
        timer: { isRunning, time: timeUnits, duration },
    } = useAppSelector((state) => state.clock)
    const { setTimerFocusUnit, updateTimerConfigs } = useClockAction()
    const stateRef = useRef({ timeUnits, timerFocusOn }) // Store latest state

    const timeoutRef = useRef<NodeJS.Timeout | null>(null)
    const intervalRef = useRef<NodeJS.Timeout | null>(null)
    const longPressRef = useRef<boolean | null>(null)

    useEffect(() => {
        stateRef.current = { timeUnits, timerFocusOn }
    }, [timeUnits, timerFocusOn])

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.repeat) return // avoid multiple triggers while key is held

            if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                // start timeout → if key is held for 750ms, start continuous change
                longPressRef.current = false

                timeoutRef.current = setTimeout(() => {
                    longPressRef.current = true
                    intervalRef.current = setInterval(() => {
                        const { timeUnits, timerFocusOn } = stateRef.current
                        if (e.key === 'ArrowUp') {
                            updateTimerConfigs({
                                time: incrementTimeUnit({
                                    time: timeUnits,
                                    unit: timerFocusOn,
                                    incrementBy: 1,
                                }),
                            })
                        } else {
                            updateTimerConfigs({
                                time: decrementTimeUnit({
                                    time: timeUnits,
                                    unit: timerFocusOn,
                                    decrementBy: 1,
                                }),
                            })
                        }
                    }, 50)
                }, 250)
            }
        }

        const handleKeyUp = (e: KeyboardEvent) => {
            const { timeUnits, timerFocusOn } = stateRef.current
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
                        updateTimerConfigs({
                            time: incrementTimeUnit({
                                time: timeUnits,
                                unit: timerFocusOn,
                                incrementBy: 1,
                            }),
                        })
                    } else {
                        updateTimerConfigs({
                            time: decrementTimeUnit({
                                time: timeUnits,
                                unit: timerFocusOn,
                                decrementBy: 1,
                            }),
                        })
                    }
                    longPressRef.current = null
                }
            }

            if (e.key === ' ') {
                e.preventDefault()
                if (
                    timeUnits.hour !== 0 ||
                    timeUnits.minute !== 0 ||
                    timeUnits.second !== 0
                ) {
                    updateTimerConfigs({
                        isRunning: !isRunning,
                    })
                }
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        window.addEventListener('keyup', handleKeyUp)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            window.removeEventListener('keyup', handleKeyUp)
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
            }
        }
    }, [isRunning, stateRef])

    useEffect(() => {
        if (isRunning === true) {
            const interval = setInterval(() => {
                let time = decrementTimeUnit({
                    time: timeUnits,
                    unit: 's',
                    decrementBy: 1,
                })
                updateTimerConfigs({
                    isRunning:
                        time.hour === 0 &&
                        time.minute === 0 &&
                        time.second === 0
                            ? false
                            : true,
                    duration: null,
                    time: time,
                })
            }, 1000)

            return () => clearInterval(interval)
        }
    }, [isRunning, timeUnits])

    return (
        <motion.div
            className={cn(
                `flex-1 flex items-center justify-center text-5xl font-mono`,
                className
            )}
            exit={{ opacity: 0, translateY: '-300px' }}
        >
            <div className="flex flex-col items-center justify-center mr-4">
                <div
                    className={cn(
                        'relative rounded-full aspect-square flex flex-col items-center justify-center px-4 transition-all',
                        isRunning && 'border-2 shadow-md'
                    )}
                >
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
