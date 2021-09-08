import {AppThunkDispatch, AppThunkGetState} from "./thunk.type";
import {IS_PARENT} from "../middleware/relationships/constants";
import {setParent} from "./set-parent.thunk";
import {getParent} from "../middleware/relationships/utils";
import {removeBlock} from "../middleware/nodes/thunks";
import {removeRelationship} from "./remove-relationship.thunk";

export function deleteBlock(id: string) {
    return async function (dispatch: AppThunkDispatch, getState: AppThunkGetState) {
        const state = getState();
        const parent = getParent(id, state.relationship);
        const children = Object.entries(state.relationship.lookup[IS_PARENT][id] || {}).filter(([, v]) => !!v).map(([k,]) => k);
        dispatch(removeRelationship({to: id, relationship: IS_PARENT}))
        dispatch(removeBlock(id));
        children.forEach(child => dispatch(setParent({child, parent})));
        // TODO: APIs
    }
}