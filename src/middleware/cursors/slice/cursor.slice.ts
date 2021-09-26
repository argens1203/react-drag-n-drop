import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { CursorType } from "../enums";
import {initialCursorState} from "./initial-state";
import {logger} from "../../../logger";

type SetCursorPayloadType = {
    type?: CursorType,
    parent?: string;
    cursor?: string;
}

const cursorSlice = createSlice({
    name: 'cursor',
    initialState: initialCursorState,
    reducers: {
        setCursor: (state, action: PayloadAction<SetCursorPayloadType>) => {
            const {type, parent, cursor} = action.payload || {};
            if (!type || !parent || !cursor){
                return;
            }
            if (!Object.values(CursorType).includes(type)){
                logger.warn('Cursor type not recognized.');
                return;
            }
            state[type][parent] = cursor;
        }
    }
});

export default cursorSlice.reducer;
export const {setCursor} = cursorSlice.actions;