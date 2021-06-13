import {createSlice} from "@reduxjs/toolkit";
import {initialBlockState, ParentLookup} from "./initial-state.const";
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
        setParentAsRoot: (state, action) => {
            const id: string = action.payload;
            const parent = state.findParent[id];
            if (parent){
                state.isChildren[parent][id] = false;
            }
            state.root[id] = true;
            state.findParent[id] = null;
        },
        setParent: (state, action) => {
            const {child, parent} = action.payload;
            if (!state.isChildren[parent]){
                state.isChildren[parent] = {};
            }
            if (child === parent){
                return;
            }
            if (isCircularRef(child, parent, state.findParent)){
                return;
                // parent.parent = child.parent;
                // child.parent = parent;
            }
            const prevParent = state.findParent[child];
            if (prevParent){
                state.isChildren[prevParent][child] = false;
            }
            state.isChildren[parent][child] = true;
            state.findParent[child] = parent;
            state.root[child] = false;
        }
    }
});

export default dataSlice.reducer;
export const {putBlock, editBlock, removeBlock, setParentAsRoot, setParent} = dataSlice.actions;

function isCircularRef(child: string, parent: string, parentLookup: ParentLookup){
    let curr: string | null = parent;
    while(curr){
        if (curr === child){
            return true;
        }
        curr = parentLookup[curr];
    }
    return false;
}