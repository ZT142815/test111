import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducer";
import { createLogger } from 'redux-logger'
const loggerMiddleware = createLogger()

const store = createStore(reducer,applyMiddleware(thunk,loggerMiddleware))

export default store;