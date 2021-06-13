import {createSlice} from "@reduxjs/toolkit";
import {BlockSliceType, initialBlockState, ParentLookup} from "./initial-state.const";
import {Block} from "./block.entity";
import {ROOT_ID} from "./root-id.const";
import {RootState} from "./store";

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
        setParent: (state, action) => {
            const {child, parent} = action.payload;
            if (!state.isChildren[parent]){
                state.isChildren[parent] = {};
            }
            if (child === parent){
                return;
            }
            if (child === ROOT_ID){
                return;
            }
            if (isAncestor(child, parent, state.findParent)){
                const ancestor = child;
                const descendant = parent;
                const grandparent = state.findParent[ancestor];
                detachParent(state, descendant);
                addParent(state, descendant, grandparent);
                detachParent(state, ancestor);
                addParent(state, ancestor, descendant);
                return;
            }
            detachParent(state, child);
            addParent(state, child, parent);
        }
    }
});

export default dataSlice.reducer;
export const {putBlock, editBlock, removeBlock, setParent} = dataSlice.actions;

function isAncestor(ancestor: string, descendant: string, parentLookup: ParentLookup){
    let curr: string = descendant;
    while(curr !== ROOT_ID){
        if (curr === ancestor){
            return true;
        }
        curr = parentLookup[curr];
    }
    return false;
}

function detachParent(state: BlockSliceType, child: string){
    const prevParent = state.findParent[child];
    if (prevParent){
        state.isChildren[prevParent][child] = false;
    }
}

function addParent(state: BlockSliceType, child: string, parent: string){
    state.isChildren[parent][child] = true;
    state.findParent[child] = parent;
}