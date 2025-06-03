import {configureStore} from "@reduxjs/toolkit";
import UserSlice from "../Slices/UserSlice.ts";
import TaskSlice from "../Slices/TaskSlice.ts";

export const store =configureStore({
    reducer:{
        user :UserSlice,
        task:TaskSlice
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: false,
    }),
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
