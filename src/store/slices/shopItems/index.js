import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {enableMapSet} from 'immer';

enableMapSet();
const defaultState = {
    loading: false,
    items: [],
    error: null
}
export const fetchItemsByPages = createAsyncThunk(
    'items/fetchItemsByPages',
    async ({itemsIDArray}) => {
        const response = await axios.post(
            'https://api.valantis.store:41000/',
            {
                "action": "get_items",
                "params": {"ids": itemsIDArray}
            },
            {
                headers: {
                    'X-Auth': '30fec2904fe148b7fe7cc5eeb3df9d6e'
                }
            }
        )
        return response.data
    })

export const itemsSlice = createSlice({
    name: "items",
    initialState: defaultState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchItemsByPages.pending, (state) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(fetchItemsByPages.fulfilled, (state, action) => {
            state.items = action.payload.result
            state.loading = false
        })
        builder.addCase(fetchItemsByPages.rejected, (state, {error}) => {
            state.error = error || null
            state.loading = false
        })
    }
})
export const selectItemsArray = (state) => state.items.items
export const selectItemsLoading = (state) => state.items.loading
export const selectItemsError = (state) => state.error

export default itemsSlice.reducer