import { configureStore } from "@reduxjs/toolkit"
import OptionReducer from "./optionSlice"

export const store = configureStore({
    reducer: {
        options: OptionReducer,
    },
})