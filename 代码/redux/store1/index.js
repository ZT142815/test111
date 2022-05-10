import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "../src/counter/reducer";
import { counterReducer } from "../src/counterTest/reducer";
import { postReducer } from "../src/posts/reducer";

const store = configureStore({
    reducer: {
        counter: reducer,
        counterTest: counterReducer,
        posts: postReducer
    }
})

export default store;