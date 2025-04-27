import { createSlice } from '@reduxjs/toolkit'
import { TimezoneName } from 'countries-and-timezones'

interface ClockState {
    commandMode: boolean
    time: string
    timezone: TimezoneName
    clockView?: 'digital' | 'analog'
    isInTimezoneView: boolean
    timezoneList?: TimezoneName[]
}

const initialState: ClockState = {
    commandMode: false,
    time: new Date().toISOString(),
    timezone: 'Asia/Kolkata',
    isInTimezoneView: false,
    timezoneList: ['Asia/Kolkata'],
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
        toggleTimezoneView: (state) => {
            state.isInTimezoneView = !state.isInTimezoneView
        },
        addToTimezoneList: (state, action) => {
            state.timezoneList?.push(action.payload)
        },
        removeFromTimezoneList: (state, action) => {
            const { timezoneList } = state
            state.timezoneList = timezoneList?.filter(
                (tz) => tz !== action.payload
            )
        },
        modifyTimezoneList: (state, action) => {
            const { timezoneList } = state

            if (timezoneList?.includes(action.payload)) {
                state.timezoneList = timezoneList.filter(
                    (tz) => tz !== action.payload
                )
            } else {
                state.timezoneList?.push(action.payload)
            }
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
    toggleTimezoneView,
    addToTimezoneList,
    modifyTimezoneList,
    removeFromTimezoneList,
} = clockSlice.actions

export default clockSlice.reducer
