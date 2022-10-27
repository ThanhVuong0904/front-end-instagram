import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CommentService from "../../services/comment";

const initialState = {
    comments: [],
    comment: {},
};

function isPendingAction(action) {
    return action.type.endsWith("/pending");
}

function isRejectedAction(action) {
    return action.type.endsWith("/rejected");
}

export const createConmentPost = createAsyncThunk(
    "createConmentPost",
    async ({ postId, comment }, { rejectWithValue, getState }) => {
        try {
            const res = await CommentService.commentPost(postId, {
                comment,
            });
            console.log({ res });
            console.log(getState());
            return res;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
const home = createSlice({
    name: "home",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Following
        builder
            .addCase(createConmentPost.fulfilled, (state, action) => {
                const { data, meta } = action.payload;
                state.comment = data;
            })
            .addMatcher(isPendingAction, (state, action) => {
                state._loading = true;
            })
            .addMatcher(isRejectedAction, (state, action) => {
                state._loading = false;
                state._error =
                    action.payload.errors.message || action.error.message;
            });
    },
});

export default home;
