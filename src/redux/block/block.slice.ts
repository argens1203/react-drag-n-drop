import {createSlice} from "@reduxjs/toolkit";
import {initialBlockState} from "./initial-state.const";
import {NodeEntity} from "../../entities/node.entity";

const blockSlice = createSlice({
    name: 'block',
    initialState: initialBlockState,
    reducers: {
        putBlock: (state, action) => {
            const block: NodeEntity = action.payload;
            state.blocks[block.id] = block;
            // TODO: perf
            state.order.push(block.id);
            state.order = state.order.map(id => state.blocks[id]).sort(state.compareFn).filter(state.filterFn).map(node => node.id);
        },
        editBlock: (state, action) => {
            const block: NodeEntity = action.payload;
            state.blocks[block.id] = Object.assign({}, state.blocks[block.id], block);
            // TODO: perf
            state.order = state.order.map(id => state.blocks[id]).sort(state.compareFn).filter(state.filterFn).map(node => node.id);
        },
        removeBlock: (state, action) => {
            const id: string = action.payload;
            delete state.blocks[id];
            if (state.order.indexOf(id) !== -1){
                state.order.splice(state.order.indexOf(id), 1);
            }
        },
        setCompareFn: (state, action) => {
            state.compareFn = action.payload;
            // TODO: re-sort
        },
        setFilterFn: (state, action) => {
            state.filterFn = action.payload;
            // TODO: re-filter
        }
    }
});

export default blockSlice.reducer;
export const {putBlock, editBlock, removeBlock} = blockSlice.actions;