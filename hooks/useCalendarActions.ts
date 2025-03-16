import { useAppDispatch, useAppSelector } from '@/hooks/useTypedSelectors'
import { viewModes } from '@/lib/constants'
import { setSelectedDate } from '@/slices/calendarSlice'
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
import { useCallback, useState } from 'react'
export const useCalendarAction = () => {
    const dispatch = useAppDispatch()
    const [prev, setPrev] = useState<'P' | 'N' | null>(null)

    const { viewMode: calendarViewMode } = useAppSelector(
        (state) => state.calendar
    )

    const { selectedDate } = useAppSelector((state) => state.calendar)

    const reset = useCallback(
        (cb?: Function) => {
            dispatch(setSelectedDate(new Date().toISOString()))
            setPrev('P')
            if (cb) {
                cb()
            }
        },
        [selectedDate]
    )

    const goToPreviousDay = useCallback(
        (cb?: Function) => {
            dispatch(setSelectedDate(subDays(selectedDate, 1).toISOString()))
            setPrev('P')
            if (cb) {
                cb()
            }
        },
        [selectedDate]
    )

    const goToNextDay = useCallback(
        (cb?: Function) => {
            dispatch(setSelectedDate(addDays(selectedDate, 1).toISOString()))
            setPrev('N')
            if (cb) {
                cb()
            }
        },
        [selectedDate]
    )

    const goToPreviousWeek = useCallback(
        (cb?: Function) => {
            dispatch(setSelectedDate(subWeeks(selectedDate, 1).toISOString()))
            setPrev('P')

            if (cb) {
                cb()
            }
        },
        [selectedDate]
    )

    const goToNextWeek = useCallback(
        (cb?: Function) => {
            dispatch(setSelectedDate(addWeeks(selectedDate, 1).toISOString()))
            setPrev('N')

            if (cb) {
                cb()
            }
        },
        [selectedDate]
    )

    const goToPreviousMonth = useCallback(
        (cb?: Function) => {
            dispatch(setSelectedDate(subMonths(selectedDate, 1).toISOString()))
            setPrev('P')

            if (cb) {
                cb()
            }
        },
        [selectedDate]
    )

    const goToNextMonth = useCallback(
        (cb?: Function) => {
            dispatch(setSelectedDate(addMonths(selectedDate, 1).toISOString()))
            setPrev('N')

            if (cb) {
                cb()
            }
        },
        [selectedDate]
    )

    const goToPreviousYear = useCallback(
        (cb?: Function) => {
            dispatch(setSelectedDate(subYears(selectedDate, 1).toISOString()))
            setPrev('P')

            if (cb) {
                cb()
            }
        },
        [selectedDate]
    )

    const goToNextYear = useCallback(
        (cb?: Function) => {
            dispatch(setSelectedDate(addYears(selectedDate, 1).toISOString()))
            setPrev('N')

            if (cb) {
                cb()
            }
        },
        [selectedDate]
    )

    const previous = useCallback(
        (cb?: Function) => {
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
        },
        [selectedDate, calendarViewMode]
    )

    const next = useCallback(
        (cb?: Function) => {
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
        },
        [selectedDate, calendarViewMode]
    )

    const isCurrSelected = useCallback(
        (cb?: Function) => {
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
        },
        [selectedDate, calendarViewMode]
    )

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
        isCurrSelected,
    }
}
