import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
  },
  reducers: {
    init: (state) => {
      return state.counter;
    },
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, actions) => {
      return {
        ...state,
        value: actions.payload,
      };
    },
  },
});

export const actions = slice.actions;

export const reducer = slice.reducer;

export const selectCount = (state) => state.counter;
