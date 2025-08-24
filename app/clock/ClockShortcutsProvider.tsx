'use client'

import { useClockAction } from '@/hooks/useClockActions'
import { useAppDispatch, useAppSelector } from '@/hooks/useTypedSelectors'
import { ReactNode, useEffect } from 'react'
import { Provider } from 'react-redux'
import { store } from '../../store/store'

const ClockShortcutProvider = ({ children }: { children: ReactNode }) => {
    const dispatch = useAppDispatch()

    const { commandMode } = useAppSelector((state) => state.clock)

    const { toggleCommandFlag } = useClockAction()

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            switch (event.key) {
                // case 'ArrowLeft':
                //     if (!commandMode) {
                //         previous()
                //     }
                //     break
                // case 'ArrowRight':
                //     if (!commandMode) {
                //         next()
                //     }
                //     break
                // case 'd':
                //     if (!commandMode) {
                //         setDayView()
                //     }
                //     break
                // case 'w':
                //     if (!commandMode) {
                //         setWeekView()
                //     }
                //     break
                // case 'm':
                //     if (!commandMode) {
                //         setMonthView()
                //     }
                //     break
                // case 'y':
                //     if (!commandMode) {
                //         setYearView()
                //     }
                //     break
                // case 'r':
                //     if (!commandMode) {
                //         reset()
                //     }
                //     break
                // case 'Escape':
                //     setCommandFlag(false)
                //     break
                default:
                    break
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [dispatch])

    return <Provider store={store}>{children}</Provider>
}

export default ClockShortcutProvider
