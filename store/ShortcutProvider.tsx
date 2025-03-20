'use client'

import { useCalendarAction } from '@/hooks/useCalendarActions'
import { useAppDispatch, useAppSelector } from '@/hooks/useTypedSelectors'
import { ReactNode, useEffect } from 'react'
import { Provider } from 'react-redux'
import { store } from './store'

const ShortcutProvider = ({ children }: { children: ReactNode }) => {
    const dispatch = useAppDispatch()

    const { listening } = useAppSelector((state) => state.keystroke)

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
        const handleKeyDown = (event: KeyboardEvent) => {
            switch (event.key) {
                case 'ArrowLeft':
                    if (!listening) {
                        previous()
                    }
                    break
                case 'ArrowRight':
                    if (!listening) {
                        next()
                    }
                    break
                case 'd':
                    if (!listening) {
                        setDayView()
                    }
                    break
                case 'w':
                    if (!listening) {
                        setWeekView()
                    }
                    break
                case 'm':
                    if (!listening) {
                        setMonthView()
                    }
                    break
                case 'y':
                    if (!listening) {
                        setYearView()
                    }
                    break
                case 'r':
                    if (!listening) {
                        reset()
                    }
                    break
                case 'k':
                    event.preventDefault()
                    toggleKeystroke()
                    break

                case 'Escape':
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
