import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    date: '',
    dropDown1: '',
}

export const OptionSlice = createSlice({
    name: "option",
    initialState,
    reducers: {
        setOption: (state, action) => {
            state[action.payload.key] = action.payload.value
        },

        clearOption: (state, action) => {
            state[action.payload] = null
        },
    },
})

export const {
    setOption,
    clearOption,
} = OptionSlice.actions

export default OptionSlice.reducer