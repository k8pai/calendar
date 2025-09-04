import { useAppDispatch } from '@/hooks/useTypedSelectors'
import {
    addToTimezoneList,
    ClockState,
    removeFromTimezoneList,
    resetTimerConfigTime,
    setClockViewMode,
    setTime,
    setTimerConfigs,
    setTimerFocusOn,
    setTimezone,
    toggleClockView,
    toggleCommandMode,
    toggleTimezoneView,
} from '@/slices/clockSlice'
import { tz } from '@date-fns/tz'
import { TimezoneName } from 'countries-and-timezones'
import { parseISO } from 'date-fns'
import { useCallback, useState } from 'react'
import { toast } from 'sonner'

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

    const toggleClockTypeView = () => {
        dispatch(toggleClockView())
    }

    const switchClockMode = (viewMode: 'clock' | 'stopwatch' | 'timer') => {
        dispatch(setClockViewMode(viewMode))
    }

    const PreviousTimerFocusUnit = (timerFocusOn: 'h' | 'm' | 's') => {
        switch (timerFocusOn) {
            case 'h':
                dispatch(setTimerFocusOn('s'))
                break
            case 'm':
                dispatch(setTimerFocusOn('h'))
                break
            case 's':
                dispatch(setTimerFocusOn('m'))
                break
        }
    }

    const NextTimerFocusUnit = (timerFocusOn: 'h' | 'm' | 's') => {
        switch (timerFocusOn) {
            case 'h':
                dispatch(setTimerFocusOn('m'))
                break
            case 'm':
                dispatch(setTimerFocusOn('s'))
                break
            case 's':
                dispatch(setTimerFocusOn('h'))
                break
        }
    }

    const setTimerFocusUnit = (isRunning: boolean, unit: 'h' | 'm' | 's') => {
        if (isRunning === true) return
        dispatch(setTimerFocusOn(unit))
    }

    const updateTimerConfigs = (
        configs: Partial<ClockState['timer']>,
        showToast?: boolean,
        toastMessage?: string
    ) => {
        if (showToast === true) {
            // Show toast notification
            toast.success(toastMessage || 'Time up!')
        }
        dispatch(setTimerConfigs(configs))
    }

    const resetTimerTime = () => {
        dispatch(resetTimerConfigTime())
    }

    return {
        lastAction: prev,
        setLocalTime,
        setLocalTimeZone,
        updateTimezoneWithTime,
        setToggleTimezoneView,
        toggleCommandFlag,
        addTimezoneList,
        removeTimezoneList,
        toggleClockTypeView,
        switchClockMode,
        PreviousTimerFocusUnit,
        NextTimerFocusUnit,
        setTimerFocusUnit,
        updateTimerConfigs,
        resetTimerTime,
    }
}
