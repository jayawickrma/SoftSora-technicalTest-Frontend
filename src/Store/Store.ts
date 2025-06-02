import {configureStore} from "@reduxjs/toolkit";
import UserSlice from "../Slices/UserSlice.ts";

export const store =configureStore({
    reducer:{
        user :UserSlice
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: false,
    }),
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
