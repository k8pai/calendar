import { calendarViewModes } from '@/lib/constants'
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
    commandMode: boolean
}

const initialState: CalendarState = {
    selectedDate: new Date().toISOString(), // Stores the currently selected date
    events: [], // Array to store calendar events
    viewMode: calendarViewModes.MONTH, // Options: 'day', 'week', 'month', 'year'
    filters: {}, // Stores any applied filters (e.g., event types)
    calendarType: 'gregorian', // Options: 'gregorian', 'julian'
    commandMode: false,
}

const calendarSlice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {
        setCommandMode: (state, action) => {
            state.commandMode = action.payload
        },
        toggleCommandMode: (state) => {
            state.commandMode = !state.commandMode
        },
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
    setCommandMode,
    toggleCommandMode,
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
