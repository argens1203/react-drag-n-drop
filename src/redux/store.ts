import blockReducer from "./data.slice";
import {combineReducers, configureStore} from "@reduxjs/toolkit";
import thunk from "redux-thunk";

const reducer = combineReducers({block: blockReducer});
export const store = configureStore({
    reducer: reducer,
    middleware: [thunk]
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;