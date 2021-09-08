import {AppThunkDispatch, AppThunkGetState} from "./thunk.type";
import {removeRelationship as removeRelationshipThunk} from "../middleware/relationships/thunks";

type RemoveRelationshipInput = {
    from?: string;
    to?: string;
    relationship: string;
}

export function removeRelationship(input: RemoveRelationshipInput){
    return async function (dispatch: AppThunkDispatch, getState: AppThunkGetState) {
        const state = getState();
        const {from, to, relationship} = input;
        if (!from && !to) return;

        let froms = to ? Object.keys(state.relationship.reverseLookup[relationship]?.[to] || {}) : [from];
        let tos = from ? Object.keys(state.relationship.lookup[relationship]?.[from] || {}) : [to];

        froms.forEach(from => {
            tos.forEach(to =>{
                if (!from || !to) return;
                dispatch(removeRelationshipThunk({from, to, relationship}));
            })
        });
}}