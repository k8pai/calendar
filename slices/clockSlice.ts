import { createSlice } from '@reduxjs/toolkit'
import { TimezoneName } from 'countries-and-timezones'

interface ClockState {
    commandMode: boolean
    time: string
    timezone: TimezoneName
    isInTimezoneView: boolean
    timezoneList?: TimezoneName[]
    clockType?: 'digital' | 'analog'
    clockViewMode: 'clock' | 'stopwatch' | 'timer'
    timerFocusOn: 'h' | 'm' | 's'
}

const initialState: ClockState = {
    commandMode: false,
    time: new Date().toISOString(),
    timezone: 'Asia/Kolkata',
    isInTimezoneView: false,
    timezoneList: ['Asia/Kolkata'],
    clockType: 'digital',
    clockViewMode: 'timer',
    timerFocusOn: 'h',
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
        toggleClockView: (state) => {
            state.clockType =
                state.clockType === 'digital' ? 'analog' : 'digital'
        },
        setClockViewMode: (state, action) => {
            state.clockViewMode = action.payload
        },
        setTimerFocusOn: (state, action) => {
            state.timerFocusOn = action.payload
        },
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
    toggleClockView,
    setClockViewMode,
    setTimerFocusOn,
} = clockSlice.actions

export default clockSlice.reducer
