import { useAppDispatch, useAppSelector } from '@/hooks/useTypedSelectors'
import { viewModes } from '@/lib/constants'
import { setSelectedDate, setViewMode } from '@/slices/calendarSlice'
import {
    setKeystrokeListener,
    toggleKeystrokeListener,
} from '@/slices/keyboardSlice'
import {
    addDays,
    addMonths,
    addWeeks,
    addYears,
    isSameDay,
    isSameMonth,
    isSameWeek,
    isSameYear,
    subDays,
    subMonths,
    subWeeks,
    subYears,
} from 'date-fns'
import { useState } from 'react'
export const useCalendarAction = () => {
    const dispatch = useAppDispatch()
    const [prev, setPrev] = useState<'P' | 'N' | null>(null)

    const { viewMode: calendarViewMode } = useAppSelector(
        (state) => state.calendar
    )

    const { listening } = useAppSelector((state) => state.keystroke)

    const { selectedDate } = useAppSelector((state) => state.calendar)

    const reset = (cb?: Function) => {
        dispatch(setSelectedDate(new Date().toISOString()))
        setPrev('P')
        if (cb) {
            cb()
        }
    }

    const setDate = (date: Date) => {
        dispatch(setSelectedDate(date.toISOString()))
    }

    const goToPreviousDay = (cb?: Function) => {
        dispatch(setSelectedDate(subDays(selectedDate, 1).toISOString()))
        setPrev('P')
        if (cb) {
            cb()
        }
    }

    const goToNextDay = (cb?: Function) => {
        dispatch(setSelectedDate(addDays(selectedDate, 1).toISOString()))
        setPrev('N')
        if (cb) {
            cb()
        }
    }

    const goToPreviousWeek = (cb?: Function) => {
        dispatch(setSelectedDate(subWeeks(selectedDate, 1).toISOString()))
        setPrev('P')

        if (cb) {
            cb()
        }
    }

    const goToNextWeek = (cb?: Function) => {
        dispatch(setSelectedDate(addWeeks(selectedDate, 1).toISOString()))
        setPrev('N')

        if (cb) {
            cb()
        }
    }

    const goToPreviousMonth = (cb?: Function) => {
        console.log('prevMonth is ', selectedDate)
        dispatch(
            setSelectedDate(subMonths(new Date(selectedDate), 1).toISOString())
        )
        setPrev('P')
        if (cb) cb()
    }

    const goToNextMonth = (cb?: Function) => {
        dispatch(
            setSelectedDate(addMonths(new Date(selectedDate), 1).toISOString())
        )
        setPrev('N')
        if (cb) cb()
    }

    const goToPreviousYear = (cb?: Function) => {
        dispatch(setSelectedDate(subYears(selectedDate, 1).toISOString()))
        setPrev('P')

        if (cb) {
            cb()
        }
    }

    const goToNextYear = (cb?: Function) => {
        dispatch(setSelectedDate(addYears(selectedDate, 1).toISOString()))
        setPrev('N')

        if (cb) {
            cb()
        }
    }

    const setDayView = () => {
        dispatch(setViewMode(viewModes.DAY))
    }

    const setWeekView = () => {
        dispatch(setViewMode(viewModes.WEEK))
    }

    const setMonthView = () => {
        dispatch(setViewMode(viewModes.MONTH))
    }

    const setYearView = () => {
        dispatch(setViewMode(viewModes.YEAR))
    }

    const toggleKeystroke = () => {
        dispatch(toggleKeystrokeListener(listening))
    }

    const setKeystroke = (ks: boolean) => {
        if (listening === ks) return
        dispatch(setKeystrokeListener(ks))
    }

    const previous = (cb?: Function) => {
        switch (calendarViewMode) {
            case viewModes.DAY:
                console.log('goToPreviousDay')

                goToPreviousDay(cb)
                break
            case viewModes.WEEK:
                console.log('goToPreviousWeek')

                goToPreviousWeek(cb)
                break
            case viewModes.MONTH:
                console.log('goToPreviousMonth')

                goToPreviousMonth(cb)
                break
            case viewModes.YEAR:
                console.log('goToPreviousYear')

                goToPreviousYear(cb)
                break
            default:
                console.log('default issue...')
                break
        }
    }

    const next = (cb?: Function) => {
        switch (calendarViewMode) {
            case viewModes.DAY:
                console.log('gotoNextDay')
                goToNextDay(cb)
                break
            case viewModes.WEEK:
                console.log('goToNextWeek')
                goToNextWeek(cb)
                break
            case viewModes.MONTH:
                console.log('goToNextMonth')
                goToNextMonth(cb)
                break
            case viewModes.YEAR:
                console.log('goToNextYear')
                goToNextYear(cb)
                break
            default:
                break
        }
    }

    const isCurrSelected = (cb?: Function) => {
        switch (calendarViewMode) {
            case viewModes.DAY:
                return isSameDay(selectedDate, new Date())
            case viewModes.WEEK:
                return isSameWeek(selectedDate, new Date())
            case viewModes.MONTH:
                return isSameMonth(selectedDate, new Date())
            case viewModes.YEAR:
                return isSameYear(selectedDate, new Date())
            default:
                break
        }
    }

    return {
        lastAction: prev,
        goToPreviousDay,
        goToNextDay,
        goToPreviousWeek,
        goToNextWeek,
        goToPreviousMonth,
        goToNextMonth,
        goToPreviousYear,
        goToNextYear,
        previous,
        next,
        reset,
        setDate,
        isCurrSelected,
        setDayView,
        setWeekView,
        setMonthView,
        setYearView,
        toggleKeystroke,
        setKeystroke,
    }
}
