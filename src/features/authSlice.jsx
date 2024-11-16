// src/features/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from '../supabaseClient'; // Ganti dengan path ke file supabaseClient Anda

const initialState = {
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
};

export const loginUser = createAsyncThunk("user/loginUser", async(user, thunkAPI) => {
    try {
        const { user: supabaseUser, error } = await supabase.auth.signIn({
            email: user.email,
            password: user.password
        });

        if (error) throw error;

        return supabaseUser;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const getMe = createAsyncThunk("user/getMe", async(_, thunkAPI) => {
    try {
        const { data: { user }, error } = await supabase.auth.getUser();

        if (error) throw error;

        return user;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const logoutUser = createAsyncThunk("user/logoutUser", async() => {
    await supabase.auth.signOut();
});

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        // Login
        builder.addCase(loginUser.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
        });

        builder.addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });

        // Get User
        builder.addCase(getMe.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(getMe.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
        });

        builder.addCase(getMe.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });
    }
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
