import { useClockAction } from '@/hooks/useClockActions'
import { useAppSelector } from '@/hooks/useTypedSelectors'
import { decrementTimeUnit } from '@/lib/helpers'
import { useEffect } from 'react'

const TimerTrackWrapper = () => {
    const {
        timer: {
            isRunning,
            time: { hour, minute, second },
            duration,
        },
    } = useAppSelector((state) => state.clock)
    const { updateTimerConfigs } = useClockAction()

    useEffect(() => {
        if (isRunning === true) {
            const interval = setInterval(() => {
                let time = decrementTimeUnit({
                    time: { hour, minute, second },
                    unit: 's',
                    decrementBy: 1,
                })
                let timerEnded =
                    time.hour === 0 && time.minute === 0 && time.second === 0
                updateTimerConfigs(
                    {
                        isRunning: !timerEnded,
                        time: time,
                    },
                    timerEnded,
                    'Timer for ' +
                        duration.hour +
                        ':' +
                        duration.minute +
                        ':' +
                        duration.second +
                        ' ended!'
                )
            }, 1000)

            return () => clearInterval(interval)
        }
    }, [isRunning, hour, minute, second])
    return null
}

export default TimerTrackWrapper
