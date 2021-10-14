import {removeRelationship as removeApi} from "../api";
import {removeRelationship as removeAction} from "../slice";
import {AppThunkDispatch, AppThunkGetState} from "../../../thunks/thunk.type";

type RemoveRelationshipInput = {
    from?: string;
    to?: string;
    relationship: string;
}

export function removeRelationship(input: RemoveRelationshipInput) {
    return async function (dispatch: AppThunkDispatch, getState: AppThunkGetState) {
        const {relationship, from, to} = input;
        const state = getState();
        if (!from && !to) return;

        let froms = !to ? [from] : Object.keys(state.relationship.reverseLookup[relationship]?.[to] || {});
        let tos = !from ? [to] : Object.keys(state.relationship.lookup[relationship]?.[from] || {});
        
        const promises = [];
        for (const from of froms){
            for (const to of tos){
                if (from && to){
                    promises.push (removeApi({from: to, to: from})
                    .then(() => {
                        dispatch(removeAction(input));
                        // TODO: Loading UI
                    })
                    .catch(() => {
                        // TODO: Error UI
                    })
                    .finally(() => {
                        // TODO: Finish Loading UI
                    }))
                }
            }
        }

        return await Promise.all(promises);
    }
}