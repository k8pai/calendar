import { createSlice } from '@reduxjs/toolkit'
import { TimezoneName } from 'countries-and-timezones'

interface ClockState {
    commandMode: boolean
    time: string
    timezone: TimezoneName
}

const initialState: ClockState = {
    commandMode: false,
    time: new Date().toISOString(),
    timezone: 'Asia/Kolkata',
}

const clockSlice = createSlice({
    name: 'clock',
    initialState,
    reducers: {
        setTimezone: (state, action) => {
            state.timezone = action.payload
        },
        setTime: (state, action) => {
            state.time = action.payload
        },
        setCommandMode: (state, action) => {
            state.commandMode = action.payload
        },
        toggleCommandMode: (state) => {
            state.commandMode = !state.commandMode
        },
        resetClock: () => initialState,
    },
})

export const {
    setCommandMode,
    toggleCommandMode,
    resetClock,
    setTime,
    setTimezone,
} = clockSlice.actions

export default clockSlice.reducer
