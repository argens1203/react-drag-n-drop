import {AppThunkDispatch, AppThunkGetState} from "./thunk.type";
import {setOrderBefore} from "./set-order-before.thunk";
import {setParent} from "./set-parent.thunk";
import {getParent} from "../middleware/relationships/utils";

type Data = {
    target: string;
    before: string;
}

export function putBeforeAndSetSibling(data: Data) {
    return async function (dispatch: AppThunkDispatch, getState: AppThunkGetState) {
        const {target, before} = data;
        if (!target || !before) return;
        const state = getState();
        const parent = getParent(before, state.relationship);
        dispatch(setOrderBefore({target, before}));
        dispatch(setParent({parent, child: target}));
    }
}