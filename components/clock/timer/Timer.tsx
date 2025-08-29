'use client'

import AnimateNumber from '@/components/clock/AnimateNumber'
import { Button } from '@/components/ui/button'
import { useClockAction } from '@/hooks/useClockActions'
import { useAppSelector } from '@/hooks/useTypedSelectors'
import { decrementTimeUnit, incrementTimeUnit } from '@/lib/helpers'
import { cn } from '@/lib/utils'
import { Pause, Play, RotateCcw } from 'lucide-react'
import { motion } from 'motion/react'
import { useEffect, useRef } from 'react'
import QuickSuggestions from './QuickSuggestions'

const Timer = ({ className }: { className?: string }) => {
    const {
        timerFocusOn,
        timer: { isRunning, time: timeUnits, duration },
    } = useAppSelector((state) => state.clock)
    const { setTimerFocusUnit, updateTimerConfigs } = useClockAction()
    const stateRef = useRef({ timeUnits, timerFocusOn }) // Store latest state

    const timeoutRef = useRef<NodeJS.Timeout | null>(null)
    const intervalRef = useRef<NodeJS.Timeout | null>(null)
    const longPressRef = useRef<boolean | null>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    const timerUnitMap: Record<typeof timerFocusOn, keyof typeof timeUnits> = {
        h: 'hour',
        m: 'minute',
        s: 'second',
    }

    const handleInputChange = (value: string) => {
        if (!/^\d*$/.test(value)) return // Only allow numeric input

        if (timerFocusOn === 's' || timerFocusOn === 'm') {
            value = Number(value) < 60 ? value : (Number(value) % 10).toString()

            updateTimerConfigs({
                time: {
                    ...timeUnits,
                    [timerUnitMap[timerFocusOn]]: Number(value),
                },
            })
        } else if (timerFocusOn === 'h') {
            updateTimerConfigs({
                time: {
                    ...timeUnits,
                    [timerUnitMap[timerFocusOn]]: Number(value),
                },
            })
        }
    }

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
                        duration: timeUnits,
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
        if (inputRef.current !== null) {
            inputRef.current.focus()
        }
    }, [timerFocusOn])

    return (
        <motion.div
            className={cn(
                `flex-1 flex-col flex items-center justify-center font-mono`,
                className
            )}
        >
            <QuickSuggestions />
            <input
                type="text"
                className="absolute opacity-0 pointer-events-none"
                value={timeUnits[timerUnitMap[timerFocusOn]]}
                onChange={(e) => handleInputChange(e.target.value)}
                ref={inputRef}
            />
            <div className="flex-1 flex flex-col items-center justify-center mr-4 gap-6">
                <div
                    className={cn(
                        'relative rounded-full aspect-square flex flex-col items-center justify-center px-4 transition-all',
                        isRunning && 'border-2 shadow-md'
                    )}
                >
                    <motion.div
                        className="flex justify-center items-center gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: 0.35 }}
                    >
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
                    </motion.div>
                </div>
                <motion.div
                    className="flex items-center justify-center gap-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.75 }}
                >
                    <Button
                        size={'icon'}
                        variant="outline"
                        className="size-12 rounded-full cursor-pointer"
                        onClick={() =>
                            updateTimerConfigs({ isRunning: !isRunning })
                        }
                        disabled={
                            timeUnits.hour === 0 &&
                            timeUnits.minute === 0 &&
                            timeUnits.second === 0 &&
                            isRunning === false
                        }
                    >
                        {isRunning ? (
                            <Pause className="size-6" />
                        ) : (
                            <Play className="size-6" />
                        )}
                    </Button>
                    <Button
                        size={'icon'}
                        variant="outline"
                        className="size-12 rounded-full cursor-pointer"
                        onClick={() => updateTimerConfigs({ time: duration })}
                    >
                        <RotateCcw className="size-6" />
                    </Button>
                </motion.div>
            </div>
        </motion.div>
    )
}

export default Timer
