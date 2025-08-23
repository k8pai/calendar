import { useAppSelector } from '@/hooks/useTypedSelectors'
import { cn } from '@/lib/utils'
import { TZDate } from '@date-fns/tz'
import { motion } from 'motion/react'
import { useEffect, useState } from 'react'

const RADIUS = 250
const TICKS = Array.from({ length: 60 }, (_, i) => i) // 60 TICKS for minutes/seconds

const HOUR_LEN = 20 // hour tick length
const MIN_LEN = 12 // minute tick length
const HOUR_W = 2.5 // hour tick thickness
const MIN_W = 1 // minute tick thickness

const MIN_HAND_LEN = RADIUS * 0.7
const HOUR_HAND_LEN = RADIUS * 0.5
const SEC_HAND_LEN = RADIUS * 0.8
const MIN_HAND_W = 4
const HOUR_HAND_W = 6
const SEC_HAND_W = 2

const AnalogueClock = ({ className }: { className?: string }) => {
    const { timezone } = useAppSelector((state) => state.clock)
    const [localTime, setLocalTime] = useState(new TZDate(new Date(), timezone))

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>

        const tick = () => {
            const currentTime = new TZDate(new Date(), timezone)
            setLocalTime(currentTime)

            // align to next full second
            const ms = currentTime.getMilliseconds()
            timer = setTimeout(tick, 1000 - ms)
        }

        tick() // start loop

        return () => clearTimeout(timer)
    }, [timezone])

    return (
        <motion.div
            className={cn(
                `flex-1 flex items-center justify-center text-5xl font-mono`,
                className
            )}
            exit={{ opacity: 0, translateY: '-300px' }}
        >
            <div
                className="border-3 border-gray-300 rounded-full relative"
                style={{ width: RADIUS * 2, height: RADIUS * 2 }}
            >
                {TICKS.map((_, i) => {
                    const isHour = i % 5 === 0
                    const tickLen = isHour ? HOUR_LEN : MIN_LEN
                    const tickW = isHour ? HOUR_W : MIN_W

                    // We place each tick at the exact center (50%, 50%),
                    // then: translate(-50%, -50%) to center the element itself,
                    // rotate by angle, and translateY(-innerRadius) to move the tick's base outward.
                    // With origin-bottom, the tick extends from its base toward the rim.
                    const angleDeg = i * 6 // 360 / 60

                    return (
                        <div
                            key={i}
                            className={`absolute top-1/2 left-1/2 origin-center bg-gray-800/50 -translate-x-1/2 -translate-y-1/2 text-xs`}
                            style={{
                                width: `${tickW}px`,
                                height: `${tickLen}px`,
                                borderRadius: `${tickW}px`, // subtle rounding
                                transform: `rotate(${angleDeg}deg) translateY(-${
                                    RADIUS - tickLen / 1.25
                                }px)`,
                            }}
                        ></div>
                    )
                })}
                <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-gray-800/50 rounded-full -translate-x-1/2 -translate-y-1/2 z-10" />

                {/* this is the logic for seconds hand. */}
                <div
                    className="absolute origin-top top-1/2 left-1/2 bg-gray-800/90 -translate-x-1/2 z-10"
                    style={{
                        width: `${SEC_HAND_W}px`,
                        height: `${SEC_HAND_LEN}px`,
                        borderRadius: `${SEC_HAND_W}px`, // subtle rounding
                        transform: `rotate(${
                            localTime.getSeconds() * 6 - 180
                        }deg)`,
                    }}
                />
                {/* this is the logic for seconds's tail part. */}
                <div
                    className="absolute origin-bottom top-1/2 left-1/2 bg-gray-800/90 -translate-x-1/2 -translate-y-full z-10"
                    style={{
                        width: `${SEC_HAND_W}px`,
                        height: `${RADIUS * 0.3}px`,
                        borderRadius: `${SEC_HAND_W}px`, // subtle rounding
                        transform: `rotate(${
                            localTime.getSeconds() * 6 - 180
                        }deg)`,
                    }}
                />
                {/* this is the logic for minute hand. */}
                <div
                    className="absolute origin-top top-1/2 left-1/2 bg-gray-800/90 -translate-x-1/2 z-10"
                    style={{
                        width: `${MIN_HAND_W}px`,
                        height: `${MIN_HAND_LEN}px`,
                        borderRadius: `${MIN_HAND_W}px`, // subtle rounding
                        transform: `rotate(${
                            localTime.getMinutes() * 6 +
                            localTime.getSeconds() * 0.1 -
                            180
                        }deg)`,
                    }}
                />
                {/* this is the logic for minute hand's tail part. */}
                <div
                    className="absolute origin-bottom top-1/2 left-1/2 bg-gray-800/90 -translate-x-1/2 -translate-y-full z-10"
                    style={{
                        width: `${MIN_HAND_W}px`,
                        height: `${RADIUS * 0.2}px`,
                        borderRadius: `${MIN_HAND_W}px`, // subtle rounding
                        transform: `rotate(${
                            localTime.getMinutes() * 6 +
                            localTime.getSeconds() * 0.1 -
                            180
                        }deg)`,
                    }}
                />

                {/* Hour Hand */}
                {/* this is the logic for minute hand. */}
                <div
                    className="absolute origin-top top-1/2 left-1/2 bg-gray-800/90 -translate-x-1/2 z-10"
                    style={{
                        width: `${HOUR_HAND_W}px`,
                        height: `${HOUR_HAND_LEN}px`,
                        borderRadius: `${HOUR_HAND_W}px`, // subtle rounding
                        transform: `rotate(${
                            (localTime.getHours() % 12) * 30 +
                            localTime.getMinutes() * 0.5 -
                            180
                        }deg)`,
                    }}
                />
                {/* this is the logic for minute hand's tail part. */}
                <div
                    className="absolute origin-bottom top-1/2 left-1/2 bg-gray-800/90 -translate-x-1/2 -translate-y-full z-10"
                    style={{
                        width: `${HOUR_HAND_W}px`,
                        height: `${RADIUS * 0.1}px`,
                        borderRadius: `${HOUR_HAND_W}px`, // subtle rounding
                        transform: `rotate(${
                            (localTime.getHours() % 12) * 30 +
                            localTime.getMinutes() * 0.5 -
                            180
                        }deg)`,
                    }}
                />
            </div>
        </motion.div>
    )
}

export default AnalogueClock
