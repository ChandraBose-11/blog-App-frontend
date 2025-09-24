import { configureStore } from "@reduxjs/toolkit";
import userReducer from './Slice/userSlice.js'

export const store=configureStore({
    reducer:{
        user:userReducer,
    }
})