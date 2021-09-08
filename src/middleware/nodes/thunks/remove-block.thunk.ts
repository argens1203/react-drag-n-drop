import {AppThunkDispatch} from "../../../thunks/thunk.type";
import {removeBlock as removeBlockAction} from "../slice";
import {removeNode} from "../api";

export function removeBlock(id: string) {
    return async function (dispatch: AppThunkDispatch) {
        return removeNode(id)
            .then(() => {
                dispatch(removeBlockAction(id));
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