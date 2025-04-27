import { useAppDispatch } from '@/hooks/useTypedSelectors'
import {
    addToTimezoneList,
    removeFromTimezoneList,
    setTime,
    setTimezone,
    toggleCommandMode,
    toggleTimezoneView,
} from '@/slices/clockSlice'
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

    const setToggleTimezoneView = () => {
        dispatch(toggleTimezoneView())
    }

    const toggleCommandFlag = () => {
        dispatch(toggleCommandMode())
    }

    const addTimezoneList = (tz: TimezoneName) => {
        dispatch(addToTimezoneList(tz))
    }

    const removeTimezoneList = (tz: TimezoneName) => {
        dispatch(removeFromTimezoneList(tz))
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
        setToggleTimezoneView,
        toggleCommandFlag,
        addTimezoneList,
        removeTimezoneList,
    }
}
