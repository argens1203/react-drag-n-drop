import blockReducer from "../nodes/slice/block.slice";
import relationshipReducer from '../relationships/slice/relationship.slice';
import cursorReducer from "../cursors/slice/cursor.slice";
import {combineReducers, configureStore} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import logger from 'redux-logger';

// TODO: rename to Node
export const reducer = combineReducers({
    block: blockReducer,
    relationship: relationshipReducer,
    cursor: cursorReducer,
});
export const store = configureStore({
    reducer: reducer,
    middleware: [thunk, logger]
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;