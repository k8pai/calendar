import { useAppDispatch } from '@/hooks/useTypedSelectors'
import { setTime, setTimezone } from '@/slices/clockSlice'
import { tz } from '@date-fns/tz'
import { TimezoneName } from 'countries-and-timezones'
import { parseISO } from 'date-fns'
import { useCallback, useState } from 'react'

export const useClockAction = () => {
    const dispatch = useAppDispatch()
    const [prev, setPrev] = useState<'P' | 'N' | null>(null)

    const setLocalTime = (date: string) => {
        dispatch(setTime(date))
    }

    const setLocalTimeZone = (tzone: TimezoneName) => {
        dispatch(setTimezone(tzone))
    }

    const updateTimezoneWithTime = useCallback((tzone: TimezoneName) => {
        try {
            let parsedTime = parseISO(new Date().toISOString(), {
                in: tz(tzone),
            })

            setLocalTimeZone(tzone)
            setLocalTime(parsedTime.toString())
        } catch (error) {
            console.error('Error setting tzone:', error)
        }
    }, [])

    return {
        lastAction: prev,
        setLocalTime,
        setLocalTimeZone,
        updateTimezoneWithTime,
    }
}
