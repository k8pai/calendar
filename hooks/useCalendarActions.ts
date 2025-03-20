import { useAppDispatch, useAppSelector } from '@/hooks/useTypedSelectors'
import { viewModes } from '@/lib/constants'
import {
    calendarTypes,
    setCalendarType,
    setSelectedDate,
    setViewMode,
} from '@/slices/calendarSlice'
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
                goToPreviousDay(cb)
                break
            case viewModes.WEEK:
                goToPreviousWeek(cb)
                break
            case viewModes.MONTH:
                goToPreviousMonth(cb)
                break
            case viewModes.YEAR:
                goToPreviousYear(cb)
                break
            default:
                break
        }
    }

    const next = (cb?: Function) => {
        switch (calendarViewMode) {
            case viewModes.DAY:
                goToNextDay(cb)
                break
            case viewModes.WEEK:
                goToNextWeek(cb)
                break
            case viewModes.MONTH:
                goToNextMonth(cb)
                break
            case viewModes.YEAR:
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

    const setCalType = (calendarType: calendarTypes) => {
        dispatch(setCalendarType(calendarType))
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
        setCalendarType: setCalType,
    }
}
