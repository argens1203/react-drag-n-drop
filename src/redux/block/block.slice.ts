import {createSlice} from "@reduxjs/toolkit";
import {initialBlockState} from "./initial-state.const";
import {Block} from "./block.entity";

const blockSlice = createSlice({
    name: 'block',
    initialState: initialBlockState,
    reducers: {
        putBlock: (state, action) => {
            const block: Block = action.payload;
            state.blocks[block.id] = block;
        },
        editBlock: (state, action) => {
            const block: Block = action.payload;
            state.blocks[block.id] = Object.assign({}, state.blocks[block.id], block);
        },
        removeBlock: (state, action) => {
            const id: string = action.payload;
            delete state.blocks[id];
        }
    }
});

export default blockSlice.reducer;
export const {putBlock, editBlock, removeBlock} = blockSlice.actions;