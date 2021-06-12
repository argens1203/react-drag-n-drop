import {createSlice} from "@reduxjs/toolkit";
import {initialBlockState} from "./initial-state.const";
import {Block} from "./block.entity";

const dataSlice = createSlice({
    name: 'data',
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
        },
        addRoot: (state, action) => {
            const id: string = action.payload;
            state.root[id] = true;
        },
        removeRoot: (state, action) => {
            const id: string = action.payload;
            delete state.root[id];
        },
        setParent: (state, action) => {
            const {child, parent} = action.payload;
            if (!parent) {
                delete state.findParent[child];
            } else {
                state.findParent[child] = parent;
            }
        }
    }
});

export default dataSlice.reducer;
export const {putBlock, editBlock, removeBlock, addRoot, removeRoot, setParent} = dataSlice.actions;