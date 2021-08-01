import {removeBlock as removeBlockAction} from '../redux/block/block.slice';
import {AppThunkDispatch, AppThunkGetState} from "./thunk.type";
import {IS_PARENT} from "../constants/relationship.const";
import {removeRelationship} from "../redux/relationship/relationship.slice";

export function deleteBlock(id: string) {
    return async function (dispatch: AppThunkDispatch, getState: AppThunkGetState) {
        const state = getState();
        const froms = Object.keys(state.relationship.reverseLookup[IS_PARENT][id] || {}).filter(k => !!k);
        // TODO: handle childs
        // const tos = Object.keys(state.relationship.lookup[IS_PARENT][id] || {}).filter(k => !!k);
        froms.forEach(from => dispatch(removeRelationship({from, to: id, relationship: IS_PARENT})));
        dispatch(removeBlockAction(id));
        // TODO: APIs
    }
}