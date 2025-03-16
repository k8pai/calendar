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
            if (event.key === 'd') {
                console.log('setting view mode to  => ', viewModes.DAY)
                dispatch(setViewMode(viewModes.DAY))
            } else if (event.key === 'w') {
                console.log('setting view mode to  => ', viewModes.WEEK)
                dispatch(setViewMode(viewModes.WEEK))
            } else if (event.key === 'm') {
                console.log('setting view mode to  => ', viewModes.MONTH)
                dispatch(setViewMode(viewModes.MONTH))
            } else if (event.key === 'y') {
                console.log('setting view mode to  => ', viewModes.YEAR)
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
