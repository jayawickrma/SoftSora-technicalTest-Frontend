import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { UserModel } from "../Model/UserModel.ts";
import { api } from "../Service/api.ts";

const initialState: {
        user: UserModel | null;
        accessToken: string | null;
        refreshToken: string | null;
        username: string | null;
        isAuthenticated: boolean;
        loading: boolean;
        error: string;
} = {
        user: null,
        accessToken: null,
        refreshToken: null,
        username: null,
        isAuthenticated: false,
        loading: false,
        error: "",
};
export type UserRootState = {
    user: {
        user: UserModel | null;
        jwt_token: string | null;
        refresh_token: string | null;
        username: string | null;
        isAuthenticated: boolean;
        loading: boolean;
        error: string;
    };
};

export const login = createAsyncThunk(
    "auth/signIn",
    async (user: UserModel) => {
        // eslint-disable-next-line no-useless-catch
            try {
                    const response = await api.post("auth/signIn", user, { withCredentials: true });
                    return response.data;
            } catch (e) {
                    throw e;
            }
    }
);

export const register = createAsyncThunk(
    "auth/signUp",
    async (user: UserModel) => {
        // eslint-disable-next-line no-useless-catch
            try {
                    const response = await api.post("auth/signUp", user, { withCredentials: true });
                    return response.data;
            } catch (e) {
                    throw e;
            }
    }
);

const UserSlice = createSlice({
        name: "user",
        initialState,
        reducers: {
                logout: (state) => {
                        state.user = null;
                        state.isAuthenticated = false;
                        localStorage.removeItem("accessToken");
                        localStorage.removeItem("refreshToken");
                },
        },
        extraReducers: (builder) => {
                builder
                    .addCase(register.fulfilled, (state, action) => {
                            if (action.payload) {
                                    state.user = action.payload.user;
                                    state.accessToken = action.payload.accessToken;
                                    state.refreshToken = action.payload.refreshToken;
                                    state.username = action.payload.username;
                                    state.isAuthenticated = true;
                                    state.error = "";
                                    localStorage.setItem("accessToken", action.payload.accessToken);
                                    localStorage.setItem("refreshToken", action.payload.refreshToken);
                            }
                    })
                    .addCase(register.pending, (state) => {
                            state.loading = true;
                            state.error = "";
                    })
                    .addCase(register.rejected, (state, action) => {
                            state.loading = false;
                            state.error = "Registration failed. Please try again.";
                            console.error(action.error.message);
                    })
                    .addCase(login.fulfilled, (state, action) => {
                            if (action.payload) {
                                    state.user = action.payload.user;
                                    state.accessToken = action.payload.accessToken;
                                    state.refreshToken = action.payload.refreshToken;
                                    state.username = action.payload.username;
                                    state.isAuthenticated = true;
                                    state.error = "";
                                    localStorage.setItem("accessToken", action.payload.accessToken);
                                    localStorage.setItem("refreshToken", action.payload.refreshToken);
                            }
                    })
                    .addCase(login.pending, (state) => {
                            state.loading = true;
                            state.error = "";
                    })
                    .addCase(login.rejected, (state, action) => {
                            state.loading = false;
                            state.isAuthenticated = false;
                            state.error = "Login failed. Please check your credentials.";
                            console.error(action.error.message);
                    });
        },
});

export const { logout } = UserSlice.actions;
export default UserSlice.reducer;
