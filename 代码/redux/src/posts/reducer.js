import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { id: "1", title: "First Post!", content: "Hello!" },
  { id: "2", title: "Second Post", content: "More text" },
];

const postsSlice = createSlice({
  name: "posts",
  initialState: initialState,
  reducers: {
    addPost: (state,actions) => {
      state.push(actions.payload)
    }
  },
});

export const postReducer = postsSlice.reducer;
export const actions = postsSlice.actions;
