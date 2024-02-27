import {createSlice} from "@reduxjs/toolkit";

const defaultState = {
    error: null
}

const errorSlice = createSlice(
    {
        name: "error",
        initialState: defaultState,
        reducers: {
            changeError: (state, action) => {
                state.error = action.payload
            }
        }
    }
)
export const {changeError} = errorSlice.actions;
export const selectError = (state) => state.error
export default errorSlice.reducer