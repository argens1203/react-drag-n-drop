import {AppThunkDispatch, AppThunkGetState} from "../../../thunks/thunk.type";
import {createRelationship as addApi} from "../api";
import {addRelationship as addAction} from "../slice";

type AddRelationshipInput = {
    from: string;
    to: string;
    relationship: string;
}

export function addRelationship(input: AddRelationshipInput){
    return async function (dispatch: AppThunkDispatch, getState: AppThunkGetState){
        const {relationship, from, to} = input;
        return await addApi(from, to)
            .then(() => {
                dispatch(addAction(input));
                // TODO: Loading UI
            })
            .catch(() => {
                // TODO: Error UI
            }).catch(() => {
                // TODO: Finish Loading UI
            });
    }
}