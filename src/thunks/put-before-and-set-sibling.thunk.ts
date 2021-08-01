import {addRelationship} from "../redux/relationship/relationship.slice";
import {IS_PARENT} from "../constants/relationship.const";
import {AppThunkDispatch, AppThunkGetState} from "./thunk.type";

type Data = {
    target: string;
    before: string;
}

export function putBeforeAndSetSibling(data: Data) {
    return async function (dispatch: AppThunkDispatch, getState: AppThunkGetState) {
        const {target, before} = data;
        if (!target || !before) return;
        const state = getState();
        const parent = state.relationship.reverseLookup[IS_PARENT]?.[before];
        dispatch(addRelationship({from: parent, to: target, relationship: IS_PARENT}));
    }
}