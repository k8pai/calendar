import { createSlice } from '@reduxjs/toolkit'

interface keystrokeState {
    listening: boolean
}

const initialState: keystrokeState = {
    listening: false,
}

const keystrokeSlice = createSlice({
    name: 'keystroke',
    initialState,
    reducers: {
        setKeystrokeListener: (state, action) => {
            state.listening = action.payload
        },
        toggleKeystrokeListener: (state, action) => {
            state.listening = !state.listening
        },
        resetKeystrokeListener: () => initialState,
    },
})

export const {
    setKeystrokeListener,
    resetKeystrokeListener,
    toggleKeystrokeListener,
} = keystrokeSlice.actions

export default keystrokeSlice.reducer
