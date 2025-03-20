import { viewModes } from '@/lib/constants'
import { CalendarModeType, ViewModeType } from '@/types/calendarTypes'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
interface CalendarEvent {
    id: string
    title: string
    date: string
    description?: string
}

interface CalendarState {
    selectedDate: string
    events: CalendarEvent[]
    viewMode: ViewModeType
    filters: Record<string, string | number>
    calendarType: CalendarModeType
}

const initialState: CalendarState = {
    selectedDate: new Date().toISOString(), // Stores the currently selected date
    events: [], // Array to store calendar events
    viewMode: viewModes.MONTH, // Options: 'day', 'week', 'month', 'year'
    filters: {}, // Stores any applied filters (e.g., event types)
    calendarType: 'gregorian', // Options: 'gregorian', 'julian'
}

const calendarSlice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {
        setCalendarType: (state, action) => {
            state.calendarType = action.payload
        },
        setSelectedDate: (state, action) => {
            state.selectedDate = action.payload
        },
        addEvent: (state, action: PayloadAction<CalendarEvent>) => {
            state.events.push(action.payload)
        },
        updateEvent: (state, action: PayloadAction<CalendarEvent>) => {
            const index = state.events.findIndex(
                (event) => event.id === action.payload.id
            )
            if (index !== -1) {
                state.events[index] = action.payload
            }
        },
        deleteEvent: (state, action: PayloadAction<CalendarEvent>) => {
            state.events = state.events.filter(
                (event) => event.id !== action.payload.id
            )
        },
        setViewMode: (state, action) => {
            state.viewMode = action.payload
        },
        setFilters: (state, action) => {
            state.filters = action.payload
        },
        resetCalendar: () => initialState,
    },
})

export const {
    setCalendarType,
    setSelectedDate,
    addEvent,
    updateEvent,
    deleteEvent,
    setViewMode,
    setFilters,
    resetCalendar,
} = calendarSlice.actions

export default calendarSlice.reducer
