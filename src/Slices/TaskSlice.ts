import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { TaskModel } from "../Model/TaskModel.ts";
import { api } from "../Service/api.ts";

interface TaskState {
    tasks: TaskModel[];
    loading: boolean;
    error: string | null;
}

const initialState: TaskState = {
    tasks: [],
    loading: false,
    error: null
};

export const addTask = createAsyncThunk(
    "task/addTask",
    async (task: TaskModel, { dispatch, rejectWithValue }) => {
        try {
            const response = await api.post("task/addTask", task, { withCredentials: true });
            const mail = localStorage.getItem('user-email')
            if (mail){
                dispatch(getAllTasksFromSignedInUser(mail));
            }
            return response.data;
        } catch (e: unknown) {
            if (typeof e === "object" && e !== null && "response" in e) {
                const err = e as { response?: { data: string } };
                return rejectWithValue(err.response?.data || "Failed to add task");
            }
            return rejectWithValue("Failed to add task");
        }
    }
);

export const getAllTasksFromSignedInUser = createAsyncThunk(
    "task/getAllOfSignedInUser",
    async (email:string, { rejectWithValue }) => {
        try {
            const response = await api.post("task/getAllOfSignedInUser",{email});
            console.log(response)
            return response.data;
        }  catch (e: unknown) {
            if (typeof e === "object" && e !== null && "response" in e) {
                const err = e as { response?: { data: string } };
                return rejectWithValue(err.response?.data || "Failed to add task");
            }
            return rejectWithValue("Failed to add task");
        }
    }
);

export const deleteTask = createAsyncThunk(
    "task/deleteTask",
    async (taskId: string, { dispatch, rejectWithValue }) => {
        try {
            const response = await api.delete(`task/deleteTask?taskId=${taskId}`, { withCredentials: true });
            const mail = localStorage.getItem('user-email')
            if (mail){
                dispatch(getAllTasksFromSignedInUser(mail));
            }
            return response.data;
        }  catch (e: unknown) {
            if (typeof e === "object" && e !== null && "response" in e) {
                const err = e as { response?: { data: string } };
                return rejectWithValue(err.response?.data || "Failed to add task");
            }
            return rejectWithValue("Failed to add task");
        }
    }
);
export const updateTask = createAsyncThunk(
    "task/updateTask",
    async (
        { taskId, task }: { taskId: string; task: TaskModel },
        { dispatch, rejectWithValue }
    ) => {
        try {
            const response = await api.put(`task/updateTask?taskId=${taskId}`, task, {
                withCredentials: true,
            });

            const mail = localStorage.getItem("user-email");
            if (mail) {
                dispatch(getAllTasksFromSignedInUser(mail));
            }

            return response.data.updatedTask; // ✅ this matches backend response
        } catch (e: unknown) {
            if (typeof e === "object" && e !== null && "response" in e) {
                const err = e as { response?: { data: string } };
                return rejectWithValue(err.response?.data || "Failed to update task");
            }
            return rejectWithValue("Failed to update task");
        }
    }
);


const TaskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllTasksFromSignedInUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllTasksFromSignedInUser.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = action.payload;
            })
            .addCase(getAllTasksFromSignedInUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(addTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addTask.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(addTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(deleteTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteTask.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(deleteTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(updateTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateTask.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(updateTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

export default TaskSlice.reducer;
