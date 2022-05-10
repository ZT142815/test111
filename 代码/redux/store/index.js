import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import loginReducer from "../components/login/reducer";
import homeReducer from "../components/home/reducer";

const reducer = combineReducers({
    loginReducer,
    homeReducer,
})

export const store = createStore(reducer,applyMiddleware(thunk));

export const getReducerState = (moduleReducer) => {
    return store.getState()[moduleReducer]
}

