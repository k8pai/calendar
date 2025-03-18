'use client'

import { useCalendarAction } from '@/hooks/useCalendarActions'
import { useAppDispatch, useAppSelector } from '@/hooks/useTypedSelectors'
import { viewModes } from '@/lib/constants'
import { ReactNode, useEffect } from 'react'
import { Provider } from 'react-redux'
import { store } from './store'

const ShortcutProvider = ({ children }: { children: ReactNode }) => {
    const keystrokeSlice = useAppSelector((store) => store.keystroke)
    const dispatch = useAppDispatch()

    const { viewMode: calendarViewMode } = useAppSelector(
        (state) => state.calendar
    )

    const { listening } = useAppSelector((state) => state.keystroke)

    const { selectedDate } = useAppSelector((state) => state.calendar)
    const {
        previous,
        next,
        setDayView,
        setWeekView,
        setMonthView,
        setYearView,
        reset,
        toggleKeystroke,
        setKeystroke,
    } = useCalendarAction()

    useEffect(() => {
        console.log('listening changed...', listening)
    }, [listening])

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            console.log('event.key', event.key)
            switch (event.key) {
                case 'ArrowLeft':
                    if (!listening) {
                        console.log('getting previous ', calendarViewMode)
                        previous()
                    }
                    break
                case 'ArrowRight':
                    if (!listening) {
                        console.log('getting next ', calendarViewMode)
                        next()
                    }
                    break
                case 'd':
                    if (!listening) {
                        console.log('setting view mode to  => ', viewModes.DAY)
                        setDayView()
                    }
                    break
                case 'w':
                    if (!listening) {
                        console.log('setting view mode to  => ', viewModes.WEEK)
                        setWeekView()
                    }
                    break
                case 'm':
                    if (!listening) {
                        console.log(
                            'setting view mode to  => ',
                            viewModes.MONTH
                        )
                        setMonthView()
                    }
                    break
                case 'y':
                    if (!listening) {
                        console.log('setting view mode to  => ', viewModes.YEAR)
                        setYearView()
                    }
                    break
                case 'r':
                    if (!listening) {
                        console.log('setting view mode to  => ', viewModes.YEAR)
                        reset()
                    }
                    break
                case 'k':
                    event.preventDefault()
                    console.log('setting keystroke listening to => ', listening)
                    setKeystroke(true)
                    break

                case 'Escape':
                    console.log('resetting keystroke listening')
                    setKeystroke(false)
                    break
                default:
                    break
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [previous, next, dispatch])

    return <Provider store={store}>{children}</Provider>
}

export default ShortcutProvider
