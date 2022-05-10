import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
    name: 'counterTest',
    initialState: {
        value: 0
    },
    reducers: {
        increment: state => {
            state.value += 1
        },
        decrement: state => {
            state.value -= 1
        }
    }
})

export const actions = counterSlice.actions;

export const counterReducer = counterSlice.reducer;

export const selectCount = state => state.counterTest;