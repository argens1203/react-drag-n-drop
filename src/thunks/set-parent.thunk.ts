import {addRelationship, removeRelationship} from "../middleware/relationships/slice";
import {IS_PARENT} from "../middleware/relationships/constants";
import {AppThunkDispatch, AppThunkGetState} from "./thunk.type";

type Data = {
    child: string;
    parent: string;
}

export function setParent(data: Data) {
    return async function (dispatch: AppThunkDispatch, getState: AppThunkGetState) {
        const {child, parent} = data;
        dispatch(removeRelationship({to: child, relationship: IS_PARENT}));
        dispatch(addRelationship({from: parent, to: child, relationship: IS_PARENT}));
    }
}
