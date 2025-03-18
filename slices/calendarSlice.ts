import { viewModes } from '@/lib/constants'
import { calendarViewModeTypes } from '@/types/calendarTypes'
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
    viewMode: calendarViewModeTypes
    filters: Record<string, string | number>
}

const initialState: CalendarState = {
    selectedDate: new Date().toISOString(), // Stores the currently selected date
    events: [], // Array to store calendar events
    viewMode: viewModes.MONTH, // Options: 'day', 'week', 'month', 'year'
    filters: {}, // Stores any applied filters (e.g., event types)
}

const calendarSlice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {
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
    setSelectedDate,
    addEvent,
    updateEvent,
    deleteEvent,
    setViewMode,
    setFilters,
    resetCalendar,
} = calendarSlice.actions

export default calendarSlice.reducer
