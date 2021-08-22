import {removeRelationship as removeApi} from "../api";
import {removeRelationship as removeAction} from "../slice";
import {AppThunkDispatch, AppThunkGetState} from "../../../thunks/thunk.type";

type RemoveRelationshipInput = {
    from: string;
    to: string;
    relationship: string;
}

export function removeRelationship(input: RemoveRelationshipInput) {
    return async function (dispatch: AppThunkDispatch, getState: AppThunkGetState) {
        const {relationship, from, to} = input;
        return await removeApi(from, to)
            .then(() => {
                dispatch(removeAction(input));
                // TODO: Loading UI
            })
            .catch(() => {
                // TODO: Error UI
            }).catch(() => {
                // TODO: Finish Loading UI
            });
    }
}