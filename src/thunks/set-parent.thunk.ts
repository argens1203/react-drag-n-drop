import {addRelationship, removeRelationship} from "../middleware/relationships/thunks";
import {IS_PARENT} from "../middleware/relationships/constants";
import {AppThunkDispatch, AppThunkGetState} from "./thunk.type";
import {getParent, getParents} from "../middleware/relationships/utils";
import {getChildren} from "../middleware/relationships/utils";

type Data = {
    child: string;
    parent: string;
}

export function setParent(data: Data) {
    return async function (dispatch: AppThunkDispatch, getState: AppThunkGetState) {
        const {child, parent} = data;
        const state = getState();
        if (getParents(parent, state.relationship).includes(child)){
            const childParent = getParent(child, state.relationship);
            // Transfer direct descendents of higher node to direct parent
            getChildren(child, state.relationship).forEach(childChild => {
                dispatch(removeRelationship({to: childChild, from: child, relationship: IS_PARENT}));
                dispatch(addRelationship({to: childChild, from: childParent, relationship: IS_PARENT}));
            })
        }
        // FIXME: race condition
        dispatch(removeRelationship({to: child, relationship: IS_PARENT}));
        dispatch(addRelationship({from: parent, to: child, relationship: IS_PARENT}));
    }
}
