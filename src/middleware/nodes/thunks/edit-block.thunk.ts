import {AppThunkDispatch} from "../../../thunks/thunk.type";
import {editNode} from "../api";
import {editBlock as editBlockAction} from "../slice";
import {NodeEntity} from "../entities";

export function editBlock(node: Partial<NodeEntity>) {
    return async function (dispatch: AppThunkDispatch) {
        const {id, ...updates} = node;
        if (!id) return; // TODO: warn
        await editNode(id, updates)
            .then(() => {
                dispatch(editBlockAction(node))
                // TODO: Loading UI
            })
            .catch(() => {
                // TODO: Error UI
            })
            .finally(() => {
                // TODO: Finish Loading UI
            });
    }
}