import { useAppDispatch, useAppSelector } from '@/hooks/useTypedSelectors'
import { calendarViewModes } from '@/lib/constants'
import {
    setCalendarType,
    setCommandMode,
    setSelectedDate,
    setViewMode,
    toggleCommandMode,
} from '@/slices/calendarSlice'
import { CalendarModeType } from '@/types/calendarTypes'
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

    const {
        viewMode: calendarViewMode,
        commandMode,
        selectedDate,
    } = useAppSelector((state) => state.calendar)

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

    // views goes here...
    const setDayView = () => {
        dispatch(setViewMode(calendarViewModes.DAY))
    }

    const setWeekView = () => {
        dispatch(setViewMode(calendarViewModes.WEEK))
    }

    const setMonthView = () => {
        dispatch(setViewMode(calendarViewModes.MONTH))
    }

    const setYearView = () => {
        dispatch(setViewMode(calendarViewModes.YEAR))
    }

    const setWeekendsView = () => {
        dispatch(setViewMode(calendarViewModes.WEEKENDS))
    }

    const setCommandFlag = (flag: boolean) => {
        if (commandMode === flag) return
        dispatch(setCommandMode(flag))
    }

    const toggleCommandFlag = () => {
        dispatch(toggleCommandMode())
    }

    const previous = (cb?: Function) => {
        switch (calendarViewMode) {
            case calendarViewModes.DAY:
                goToPreviousDay(cb)
                break
            case calendarViewModes.WEEK:
                goToPreviousWeek(cb)
                break
            case calendarViewModes.MONTH:
                goToPreviousMonth(cb)
                break
            case calendarViewModes.YEAR:
                goToPreviousYear(cb)
                break
            case calendarViewModes.WEEKENDS:
                goToPreviousYear(cb)
                break
            default:
                break
        }
    }

    const next = (cb?: Function) => {
        switch (calendarViewMode) {
            case calendarViewModes.DAY:
                goToNextDay(cb)
                break
            case calendarViewModes.WEEK:
                goToNextWeek(cb)
                break
            case calendarViewModes.MONTH:
                goToNextMonth(cb)
                break
            case calendarViewModes.YEAR:
                goToNextYear(cb)
                break
            case calendarViewModes.WEEKENDS:
                goToNextYear(cb)
                break
            default:
                break
        }
    }

    const isCurrSelected = (cb?: Function) => {
        switch (calendarViewMode) {
            case calendarViewModes.DAY:
                return isSameDay(selectedDate, new Date())
            case calendarViewModes.WEEK:
                return isSameWeek(selectedDate, new Date())
            case calendarViewModes.MONTH:
                return isSameMonth(selectedDate, new Date())
            case calendarViewModes.YEAR:
                return isSameYear(selectedDate, new Date())
            default:
                break
        }
    }

    const setCalType = (calendarType: CalendarModeType) => {
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
        setWeekendsView,
        setCalendarType: setCalType,
        setCommandFlag,
        toggleCommandFlag,
    }
}
