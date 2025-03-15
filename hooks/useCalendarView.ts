import { useAppDispatch, useAppSelector } from '@/hooks/useTypedSelectors'
import { viewModes } from '@/lib/constants'
import { setViewMode } from '@/slices/calendarSlice'
import { useEffect } from 'react'
export const useCalendarView = () => {
    const dispatch = useAppDispatch()

    const { viewMode: calendarViewMode } = useAppSelector(
        (state) => state.calendar
    )

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            console.log('this work... event.key => ', event.key)
            if (event.key === 'd') {
                console.log('viewMode changed to => ', viewModes.DAY)
                dispatch(setViewMode(viewModes.DAY))
            } else if (event.key === 'w') {
                dispatch(setViewMode(viewModes.WEEK))
            } else if (event.key === 'm') {
                dispatch(setViewMode(viewModes.MONTH))
            } else if (event.key === 'y') {
                dispatch(setViewMode(viewModes.YEAR))
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [])

    return calendarViewMode
}
