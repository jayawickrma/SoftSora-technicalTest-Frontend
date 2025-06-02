import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import type {UserModel} from "../Model/UserModel.ts";


export const register =createAsyncThunk (
    "auth/signIn",
    async(user:UserModel)=>{
        try{

        }
}
)


const UserSlice =createSlice({

})
export default UserSlice.reducer;