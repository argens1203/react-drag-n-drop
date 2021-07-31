import {createSlice} from "@reduxjs/toolkit";
import {initialRelationshipState} from "./initial-state.const";

const relationshipSlice = createSlice({
    name: 'relationship',
    initialState: initialRelationshipState,
    reducers: {
        registerRelationship: (state, action) => {
            const {relationship, type} = action.payload;
            state.type[relationship] = type;
            state.lookup[relationship] = {};
            state.reverseLookup[relationship] = {};
            state.order[relationship] = {};
        },
        // Does not check relationship type. Do it in thunk
        addRelationship: (state, action) => {
            const {from, to, relationship} = action.payload;

            // Forward Lookup
            if (!state.lookup[relationship][from]) {
                state.lookup[relationship][from] = {};
            }
            state.lookup[relationship][from][to] = true;

            // Reverse Lookup
            if (!state.reverseLookup[relationship][to]) {
                state.reverseLookup[relationship][to] = {};
            }
            state.reverseLookup[relationship][to][from] = true;
        },
        removeRelationship: (state, action) => {
            const {from, to, relationship} = action.payload;

            if (state.lookup?.[relationship]?.[from]?.[to]){
                state.lookup[relationship][from][to] = false;
            }
            if (state.reverseLookup?.[relationship]?.[to]?.[from]){
                state.reverseLookup[relationship][to][from] = false;
            }
        },
    }
});

export default relationshipSlice.reducer;
export const {addRelationship, removeRelationship, registerRelationship} = relationshipSlice.actions;