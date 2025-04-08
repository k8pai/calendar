import { useAppDispatch, useAppSelector } from '@/hooks/useTypedSelectors'
import { getTimeInTimeZone } from '@/lib/helpers'
import { setTime, setTimezone } from '@/slices/clockSlice'
import { TimezoneName } from 'countries-and-timezones'
import { useState } from 'react'

export const useClockAction = () => {
    const dispatch = useAppDispatch()
    const [prev, setPrev] = useState<'P' | 'N' | null>(null)

    const { time } = useAppSelector((state) => state.clock)

    const setLocalTimezone = (timezone: TimezoneName) => {
        try {
            let time_of_timezone = getTimeInTimeZone(timezone)
            dispatch(setTimezone(timezone))

            setLocalTime(
                time_of_timezone
                    ? time_of_timezone?.toISOString()
                    : new Date().toISOString()
            )
        } catch (error) {
            console.error('Error setting timezone:', error)
        }
    }

    const setLocalTime = (date: string) => {
        dispatch(setTime(date))
    }

    return {
        lastAction: prev,
        time,
        setLocalTime,
        setLocalTimezone,
    }
}
