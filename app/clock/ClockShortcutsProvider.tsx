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
                case 'F1':
                    if (!commandMode) {
                        switchClockMode('clock')
                    }
                    break
                case 'F2':
                    if (!commandMode) {
                        switchClockMode('stopwatch')
                    }
                    break
                case 'F3':
                    if (!commandMode) {
                        switchClockMode('timer')
                    }
                    break
                case 'ArrowRight':
                    if (!commandMode && clockViewMode === 'timer') {
                        console.log(
                            'timerFocusOn is next timer...',
                            timerFocusOn
                        )
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
    }, [dispatch, timerFocusOn, commandMode])

    return <Provider store={store}>{children}</Provider>
}

export default ClockShortcutProvider
