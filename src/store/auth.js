import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthService from "../services/auth";
import { getTokens, setTokens, setUserData } from "../utils/storage";

const initState = {
    auth: getTokens() ? true : false,
    loading: false,
    error: "",
};

export const login = createAsyncThunk(
    "login",
    async (user, { rejectWithValue }) => {
        try {
            const response = await AuthService.login(user);
            setTokens(response.meta.token);
            setUserData(response.data);
            return response;
        } catch (error) {
            console.log("error", error);

            return rejectWithValue(error);
        }
    }
);

export const signup = createAsyncThunk(
    "signup",
    async (user, { rejectWithValue, dispatch }) => {
        try {
            const response = await AuthService.signup(user);
            setTokens(response.meta.token);
            setUserData(response.data);
            // dispatch(login(user));
            console.log("Res", response);
            return response;
        } catch (error) {
            console.log("error", error);

            return rejectWithValue(error);
        }
    }
);

const auth = createSlice({
    name: "auth",
    initialState: initState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.auth = true;
            state.loading = false;
            state.error = "";
        });
        builder.addCase(login.pending, (state, action) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(login.rejected, (state, action) => {
            //error from backend
            console.log("loi 1", action.payload.errors.message);
            console.log("loi 2", action.error.message);
            state.loading = false;
            state.error = action.payload.errors.message || action.error.message;
        });
        builder.addCase(signup.fulfilled, (state, action) => {
            state.auth = true;
            state.loading = false;
            state.error = "";
            console.log("action", action);
        });
        builder.addCase(signup.pending, (state, action) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(signup.rejected, (state, action) => {
            //error from backend
            state.loading = false;
            state.error = action.payload.errors.message || action.error.message;
            console.log("rejected", action);
        });
    },
});

export default auth;
