import {removeBlock as removeBlockAction} from '../redux/block/block.slice';
import {AppThunkDispatch, AppThunkGetState} from "./thunk.type";
import {IS_PARENT} from "../constants/relationship.const";
import {removeRelationship} from "../redux/relationship/relationship.slice";
import {setParent} from "./set-parent.thunk";
import {getParent} from "../utils/get-parent.action";

export function deleteBlock(id: string) {
    return async function (dispatch: AppThunkDispatch, getState: AppThunkGetState) {
        const state = getState();
        const parent = getParent(id, state);
        const children = Object.entries(state.relationship.lookup[IS_PARENT][id] || {}).filter(([, v]) => !!v).map(([k,]) => k);
        dispatch(removeRelationship({to: id, relationship: IS_PARENT}))
        dispatch(removeBlockAction(id));
        children.forEach(child => dispatch(setParent({child, parent})));
        // TODO: APIs
    }
}