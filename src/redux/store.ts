import blockReducer from "./block/block.slice";
import relationshipReducer from './relationship/relationship.slice';
import {combineReducers, configureStore} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import logger from 'redux-logger';

export const reducer = combineReducers({block: blockReducer, relationship: relationshipReducer});
export const store = configureStore({
    reducer: reducer,
    middleware: [thunk, logger]
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;