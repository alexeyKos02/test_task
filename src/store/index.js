import {configureStore} from "@reduxjs/toolkit";
import itemsReducer from "../store/slices/shopItems"
import errorReducer from "../store/slices/error"

export const store = configureStore(
    {
        reducer: {
            items: itemsReducer,
            error: errorReducer
        }
    }
)