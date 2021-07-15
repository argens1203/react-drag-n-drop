import {createSlice} from "@reduxjs/toolkit";
import {BlockSliceType, initialBlockState, ParentLookup} from "./initial-state.const";
import {Block} from "./block.entity";
import {ROOT_ID} from "./root-id.const";

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
            const parent = state.findParent[id];
            if (parent) {
                detachFromOrder(state, {child: id, parent});
            }
            detachParent(state, id);
        },
        setParent: (state, action) => {
            const {child, parent} = action.payload;
            if (child === parent) {
                return;
            }
            if (child === ROOT_ID) {
                return;
            }
            setParentWithoutValidation(state, {child, parent});
            detachFromOrder(state, {child, parent});
            setOrder(state, {parent, child});
        },
        putBeforeAndSetSibling: (state, action) => {
            const {target, before} = action.payload;
            if (before === ROOT_ID) {
                return;
            }
            if (target === before) {
                return;
            }
            const parent = state.findParent[before];
            setParentWithoutValidation(state, {child: target, parent});
            detachFromOrder(state, {child: target, parent});
            const newIndex = state.childrenOrder[parent].indexOf(before);
            setOrder(state, {parent, child: target, newIndex});
        },
        resetAll: () => {
            return initialBlockState;
        }
    }
});

export default dataSlice.reducer;
export const {putBlock, editBlock, removeBlock, setParent, putBeforeAndSetSibling, resetAll} = dataSlice.actions;

function detachFromOrder(state: BlockSliceType, input: { child: string, parent: string }) {
    const {child, parent} = input;
    const currIdx = state.childrenOrder[parent].indexOf(child);
    if (currIdx !== -1) {
        state.childrenOrder[parent].splice(currIdx, 1);
    }
}

function setOrder(state: BlockSliceType, input: { parent: string, child: string, newIndex?: number }) {
    const {newIndex = -1, parent, child} = input;
    if (newIndex === -1) {
        state.childrenOrder[parent].push(child);
    } else {
        state.childrenOrder[parent].splice(newIndex, 0, child);
    }
}

function setParentWithoutValidation(state: BlockSliceType, input: { child: string, parent: string }) {
    const {child, parent} = input;
    if (isAncestor({ancestor: child, descendant: parent}, state.findParent)) {
        // If intended child was a parent of intended parent
        const ancestor = child;
        const descendant = parent;
        const grandparent = state.findParent[ancestor];
        detachParent(state, descendant);
        addParent(state, descendant, grandparent);
        detachParent(state, ancestor);
        addParent(state, ancestor, descendant);
    } else {
        detachParent(state, child);
        addParent(state, child, parent);
    }
}

export function isAncestor(input: { ancestor: string, descendant: string }, parentLookup: ParentLookup) {
    const {ancestor, descendant} = input;
    let curr: string = descendant;
    while (curr && curr !== ROOT_ID) {
        if (curr === ancestor) {
            return true;
        }
        curr = parentLookup[curr];
    }
    return false;
}

// children order is retained
function detachParent(state: BlockSliceType, child: string) {
    const prevParent = state.findParent[child];
    if (prevParent) {
        state.isChildren[prevParent][child] = false;
    }
    delete state.findParent[child];
}

function addParent(state: BlockSliceType, child: string, parent: string) {
    if (!state.isChildren[parent]) {
        state.isChildren[parent] = {};
    }
    if (!state.childrenOrder[parent]) {
        state.childrenOrder[parent] = [];
    }
    state.isChildren[parent][child] = true;
    state.findParent[child] = parent;
    state.blocks[child].level = (state.blocks?.[parent]?.level ?? -1) + 1; //TODO
    if (!state.childrenOrder[parent].includes(child)) {
        state.childrenOrder[parent].push(child);
    }
}