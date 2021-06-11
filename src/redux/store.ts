import dataReducer from "./data/data.slice";
import {combineReducers, configureStore} from "@reduxjs/toolkit";
import thunk from "redux-thunk";

const reducer = combineReducers({data: dataReducer});
export const store = configureStore({
    reducer: reducer,
    middleware: [thunk]
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;