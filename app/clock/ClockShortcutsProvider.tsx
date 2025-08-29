'use client'

import { useClockAction } from '@/hooks/useClockActions'
import { useAppDispatch, useAppSelector } from '@/hooks/useTypedSelectors'
import { ReactNode, useEffect } from 'react'
import { Provider } from 'react-redux'
import { store } from '../../store/store'

const ClockShortcutProvider = ({ children }: { children: ReactNode }) => {
    const dispatch = useAppDispatch()

    const { commandMode, clockViewMode, timerFocusOn } = useAppSelector(
        (state) => state.clock
    )

    const { switchClockMode, NextTimerFocusUnit, PreviousTimerFocusUnit } =
        useClockAction()

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            switch (event.key) {
                case 'C':
                    if (!commandMode) {
                        switchClockMode('clock')
                    }
                    break
                case 'S':
                    if (!commandMode) {
                        switchClockMode('stopwatch')
                    }
                    break
                case 'T':
                    if (!commandMode) {
                        switchClockMode('timer')
                    }
                    break
                case 'ArrowRight':
                    if (!commandMode && clockViewMode === 'timer') {
                        NextTimerFocusUnit(timerFocusOn)
                    }
                    break
                case 'ArrowLeft':
                    if (!commandMode && clockViewMode === 'timer') {
                        PreviousTimerFocusUnit(timerFocusOn)
                    }
                    break
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
    }, [dispatch, timerFocusOn, commandMode, clockViewMode])

    return <Provider store={store}>{children}</Provider>
}

export default ClockShortcutProvider
